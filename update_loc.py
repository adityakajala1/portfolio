import os
import re

projects = [
    r"C:\Users\adity\Documents\sys\examscope",
    r"C:\Users\adity\Desktop\portfolio",
    r"C:\Users\adity\Desktop\Sarthak",
    r"C:\Users\adity\Desktop\hostel-wallet",
    r"C:\Users\adity\Desktop\lamp",
    r"C:\Users\adity\Documents\sys\-",
]

code_extensions = {
    '.py', '.ts', '.tsx', '.js', '.jsx', '.html', '.css', '.scss', 
    '.cpp', '.c', '.h', '.hpp', '.java', '.sql', '.sh', '.bat', '.ini', '.mako'
}

def count_all_loc():
    total_lines = 0
    for root_dir in projects:
        if not os.path.exists(root_dir):
            continue
        for root, dirs, files in os.walk(root_dir):
            if any(ignored in root.lower() for ignored in [
                'node_modules', '.next', '.git', 'venv', '.pytest_cache', 
                '__pycache__', '.claude', 'dist', 'build', '.impeccable', 'coverage'
            ]):
                continue
            for file in files:
                ext = os.path.splitext(file)[1].lower()
                if ext in code_extensions:
                    filepath = os.path.join(root, file)
                    try:
                        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                            total_lines += len(f.readlines())
                    except:
                        pass
    return total_lines

loc = count_all_loc()
print(f"Computed total LOC: {loc:,}")

# Update index.html
index_path = r"C:\Users\adity\Desktop\portfolio\index.html"
with open(index_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace any existing LOC counter inside the stats section
# Pattern matches either +110k, 110k+, 50k+, or any previous exact number before "Lines of Code"
loc_str = f"{loc:,}+" # e.g. 115,893+

html = re.sub(
    r'(<div style="font-size: 2\.5rem; font-weight: 700; margin-bottom: 0\.25rem;">)[^<]+(</div>\s*<div style="opacity: 0\.9; font-size: 0\.95rem;">Lines of Code</div>)',
    rf'\g<1>{loc_str}\g<2>',
    html
)

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated index.html successfully with:", loc_str)
