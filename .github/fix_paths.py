import os
import re
import glob

REPO_NAME = 'project'  # ← 改成你的实际仓库名（必须对！）

def fix_paths(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # 替换根目录页面路径：href="css/xxx" → href="/project/css/xxx"
    content = re.sub(r'(href|src)="(?!\.\./)(css|js|img)/', 
                     f'\\1="/{REPO_NAME}/\\2/', content)
    
    # 替换子目录页面路径：href="../css/xxx" → href="/project/css/xxx"
    content = re.sub(r'(href|src)="\.\./(css|js|img)/', 
                     f'\\1="/{REPO_NAME}/\\2/', content)
    
    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'✅ 已修复: {file_path}')

# 扫描所有 HTML 文件
html_files = glob.glob('**/*.html', recursive=True)
for file_path in html_files:
    if '.github' in file_path:
        continue
    fix_paths(file_path)