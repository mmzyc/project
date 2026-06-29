import os
import re
import glob

REPO_NAME = 'project'  # 改成你的仓库名

def fix_paths(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # ---- HTML ----
    if file_path.endswith('.html'):
        # href="css/xxx" → href="/project/css/xxx"
        # src="js/xxx" → src="/project/js/xxx"
        content = re.sub(
            r'(href|src)=["\'](?!https?://|/|\.\./|#)(css|js|img|assets|static|fonts|media|uploads|files|data|json|lib|vendor|plugins|js/modules)/([^"\']*)["\']',
            lambda m: f'{m.group(1)}="/{REPO_NAME}/{m.group(2)}/{m.group(3)}"',
            content
        )
        # href="../css/xxx" → href="/project/css/xxx"
        content = re.sub(
            r'(href|src)=["\']\.\./(css|js|img|assets|static|fonts|media|uploads|files|data|json|lib|vendor|plugins|js/modules)/([^"\']*)["\']',
            lambda m: f'{m.group(1)}="/{REPO_NAME}/{m.group(2)}/{m.group(3)}"',
            content
        )
        # ./css/xxx → /project/css/xxx
        content = re.sub(
            r'(href|src)=["\']\./(css|js|img|assets|static|fonts|media|uploads|files|data|json|lib|vendor|plugins|js/modules)/([^"\']*)["\']',
            lambda m: f'{m.group(1)}="/{REPO_NAME}/{m.group(2)}/{m.group(3)}"',
            content
        )
    
    # ---- CSS ----
    elif file_path.endswith('.css'):
        # url(img/xxx) → url(/project/img/xxx)
        content = re.sub(
            r'url\(["\']?(?!https?://|/)(img|assets|static|fonts|media|uploads|files|data|json|lib|vendor|plugins)(/[^"\'\)]*)["\']?\)',
            lambda m: f'url("/{REPO_NAME}/{m.group(1)}{m.group(2)}")',
            content
        )
        # url(../img/xxx) → url(/project/img/xxx)
        content = re.sub(
            r'url\(["\']?\.\./(img|assets|static|fonts|media|uploads|files|data|json|lib|vendor|plugins)(/[^"\'\)]*)["\']?\)',
            lambda m: f'url("/{REPO_NAME}/{m.group(1)}{m.group(2)}")',
            content
        )
        # url("./img/xxx") → url("/project/img/xxx")
        content = re.sub(
            r'url\(["\']?\./(img|assets|static|fonts|media|uploads|files|data|json|lib|vendor|plugins)(/[^"\'\)]*)["\']?\)',
            lambda m: f'url("/{REPO_NAME}/{m.group(1)}{m.group(2)}")',
            content
        )
    
    # ---- JS ----
    elif file_path.endswith('.js'):
        # 'img/xxx' → '/project/img/xxx'
        content = re.sub(
            r'([\'"])(img|assets|static|fonts|media|uploads|files|data|json|lib|vendor|plugins)/([^\'"]+)([\'"])',
            lambda m: f'{m.group(1)}/{REPO_NAME}/{m.group(2)}/{m.group(3)}{m.group(4)}',
            content
        )
        # '../img/xxx' → '/project/img/xxx'
        content = re.sub(
            r'([\'"])\.\./(img|assets|static|fonts|media|uploads|files|data|json|lib|vendor|plugins)/([^\'"]+)([\'"])',
            lambda m: f'{m.group(1)}/{REPO_NAME}/{m.group(2)}/{m.group(3)}{m.group(4)}',
            content
        )
        # './img/xxx' → '/project/img/xxx'
        content = re.sub(
            r'([\'"])\./(img|assets|static|fonts|media|uploads|files|data|json|lib|vendor|plugins)/([^\'"]+)([\'"])',
            lambda m: f'{m.group(1)}/{REPO_NAME}/{m.group(2)}/{m.group(3)}{m.group(4)}',
            content
        )
    
    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'✅ 已修复: {file_path}')
        return True
    else:
        print(f'⏭️ 跳过: {file_path} (无需修改)')
        return False

# 只扫描 .html .css .js
all_files = glob.glob('**/*.*', recursive=True)

total = 0
fixed = 0
for file_path in all_files:
    if '.github' in file_path or 'node_modules' in file_path:
        continue
    if file_path.endswith(('.html', '.css', '.js')):
        total += 1
        if fix_paths(file_path):
            fixed += 1

print(f'\n📊 总共处理 {total} 个文件，其中 {fixed} 个被修改')