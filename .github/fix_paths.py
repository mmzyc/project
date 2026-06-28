import os
import re
import glob

REPO_NAME = 'project'  # 改成你的仓库名

def fix_paths(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # ---- 1. HTML 文件：href/src ----
    if file_path.endswith('.html'):
        content = re.sub(r'(href|src)="(?!\.\./)(css|js|img)/', 
                         f'\\1="/{REPO_NAME}/\\2/', content)
        content = re.sub(r'(href|src)="\.\./(css|js|img)/', 
                         f'\\1="/{REPO_NAME}/\\2/', content)
    
    # ---- 2. CSS 文件：url() ----
    elif file_path.endswith('.css'):
        content = re.sub(r'url\(["\']?\.\./img/', 
                         f'url("/{REPO_NAME}/img/', content)
        content = re.sub(r'url\(["\']?(?!\.\./|/)(img/)([^"\'\)]+)\)', 
                         f'url("/{REPO_NAME}/\\1\\2")', content)
    
    # ---- 3. JS 文件：字符串里的路径 ----
    elif file_path.endswith('.js'):
        content = re.sub(r'([\'"])(img/)([^\'"]+)([\'"])', 
                         f'\\1/{REPO_NAME}/\\2\\3\\4', content)
        content = re.sub(r'([\'"])(\.\./img/)([^\'"]+)([\'"])', 
                         f'\\1/{REPO_NAME}/img/\\3\\4', content)
        content = re.sub(r'([\'"])(css/)([^\'"]+)([\'"])', 
                         f'\\1/{REPO_NAME}/\\2\\3\\4', content)
        content = re.sub(r'([\'"])(\.\./css/)([^\'"]+)([\'"])', 
                         f'\\1/{REPO_NAME}/css/\\3\\4', content)
    
    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'✅ 已修复: {file_path}')


# ==================== 扫描所有文件 ====================

all_files = glob.glob('**/*.*', recursive=True)

# 🔍 调试：打印扫描到的所有文件
print(f"🔍 总共扫描到 {len(all_files)} 个文件")
for f in all_files:
    print(f"  - {f}")

# 筛选并修复
for file_path in all_files:
    if '.github' in file_path:
        continue
    if file_path.endswith(('.html', '.css', '.js')):
        fix_paths(file_path)