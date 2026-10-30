import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// 共享层注入插件：相当于旧 common.js 的角色。
// 每个页面（主页、psycheck、以后新增的）都会自动带上共享行为，
// 页面里不用写任何引入代码。想看全站共享了什么 → 看 src/boot.js
function injectSharedLayer() {
  let base = '/'
  return {
    name: 'inject-shared-layer',
    configResolved(config) {
      base = config.base // 记下 base（'/project/'），注入时手动拼前缀
    },
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        // 开发模式：拼上 base 前缀（dev server 按 base 提供源码文件）
        if (!ctx.bundle) {
          return [{ tag: 'script', attrs: { type: 'module', src: base + 'src/boot.js' }, injectTo: 'head' }]
        }
        // 构建模式：从打包结果里找出 boot 的真实文件名（带 hash）
        // base 自带末尾斜杠（如 '/project/'），fileName 不带前导斜杠，直接拼接即可
        const bootChunk = Object.values(ctx.bundle).find(
          c => c.name === 'boot' && c.fileName?.endsWith('.js')
        )
        if (!bootChunk) return []
        const src = base + bootChunk.fileName
        const tags = [{ tag: 'script', attrs: { type: 'module', src }, injectTo: 'head' }]
        // ★ boot 是插件手动注入的入口，Vite 不会自动链接它的 CSS。
        //   必须把它的样式表一并注入，否则 CustomMouse/AuthorBadge 的样式
        //   在生产环境缺失（画布失去 position:fixed 会内联撑开页面，主页错位）
        const cssFiles = bootChunk.viteMetadata?.importedCss || []
        for (const file of cssFiles) {
          tags.push({ tag: 'link', attrs: { rel: 'stylesheet', href: base + file }, injectTo: 'head' })
        }
        return tags
      },
    },
  }
}

export default defineConfig({
  base: '/project/', // GitHub Pages 子路径：用户名.github.io/project/（替代旧 sed 工作流的那一行）
  plugins: [vue(), injectSharedLayer()],
  build: {
    rollupOptions: {
      // 多页面入口：以后加新页面，在这里加一行 + 对应 html 即可
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        psycheck: resolve(import.meta.dirname, 'project/psycheck/index.html'),
        boot: resolve(import.meta.dirname, 'src/boot.js'),
      },
    },
  },
})
