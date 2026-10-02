import os
import sys
import re
import time
import subprocess
import traceback

if sys.stdout is None:
    sys.stdout = open(os.devnull, 'w')
if sys.stderr is None:
    sys.stderr = open(os.devnull, 'w')

PROJECTS = [
    r"C:\Users\adity\Documents\sys\examscope",
    r"C:\Users\adity\Desktop\portfolio",
    r"C:\Users\adity\Desktop\Sarthak",
    r"C:\Users\adity\Desktop\hostel-wallet",
    r"C:\Users\adity\Desktop\lamp",
    r"C:\Users\adity\Documents\sys\-",
]

CODE_EXTENSIONS = {
    '.py', '.ts', '.tsx', '.js', '.jsx', '.html', '.css', '.scss', 
    '.cpp', '.c', '.h', '.hpp', '.java', '.sql', '.sh', '.bat', '.ini', '.mako'
}

INDEX_PATH = r"C:\Users\adity\Desktop\portfolio\index.html"
PORTFOLIO_DIR = r"C:\Users\adity\Desktop\portfolio"
LOG_PATH = r"C:\Users\adity\Desktop\portfolio\loc_watcher.log"

def log(msg):
    try:
        with open(LOG_PATH, 'a', encoding='utf-8') as f:
            f.write(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {msg}\n")
    except:
        pass

def count_all_loc():
    total_lines = 0
    for root_dir in PROJECTS:
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
                if ext in CODE_EXTENSIONS:
                    filepath = os.path.join(root, file)
                    try:
                        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                            total_lines += len(f.readlines())
                    except:
                        pass
    return total_lines

def update_and_push(loc):
    try:
        with open(INDEX_PATH, 'r', encoding='utf-8') as f:
            html = f.read()

        loc_str = f"{loc:,}+"
        match = re.search(r'(<div style="font-size: 2\.5rem; font-weight: 700; margin-bottom: 0\.25rem;">)([^<]+)(</div>\s*<div style="opacity: 0\.9; font-size: 0\.95rem;">Lines of Code</div>)', html)
        if match and match.group(2) == loc_str:
            return

        new_html = re.sub(
            r'(<div style="font-size: 2\.5rem; font-weight: 700; margin-bottom: 0\.25rem;">)[^<]+(</div>\s*<div style="opacity: 0\.9; font-size: 0\.95rem;">Lines of Code</div>)',
            rf'\g<1>{loc_str}\g<2>',
            html
        )

        with open(INDEX_PATH, 'w', encoding='utf-8') as f:
            f.write(new_html)

        log(f"Detected LOC change -> New total: {loc_str}. Committing and pushing...")
        subprocess.run(["git", "add", "index.html"], cwd=PORTFOLIO_DIR, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        subprocess.run(["git", "commit", "-m", f"Auto-sync lines of code counter: {loc_str}"], cwd=PORTFOLIO_DIR, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        subprocess.run(["git", "push"], cwd=PORTFOLIO_DIR, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        log("Successfully pushed to GitHub!")
    except Exception:
        log(f"Error in update_and_push: {traceback.format_exc()}")

def main():
    log("LOC background watcher daemon running.")
    last_count = 0
    while True:
        try:
            current_loc = count_all_loc()
            if current_loc != last_count:
                last_count = current_loc
                update_and_push(current_loc)
        except Exception:
            log(f"Error in main loop: {traceback.format_exc()}")
        time.sleep(30)

if __name__ == '__main__':
    main()
