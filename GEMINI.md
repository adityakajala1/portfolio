# Workspace Rules - Portfolio

## Automatic Lines of Code Tracking
The user requires the exact count of lines of code to be displayed on their live portfolio website (`index.html` under "Quick Facts").

Whenever any prompt involves:
- Writing, modifying, adding, or deleting code in this portfolio or any related project (`MarkMint`, `Sarthak`, `Hostel Wallet`, `Lamp`, `ExamDNA`)
- Adding or removing features

Always execute:
```bash
python update_loc.py
```
This script dynamically computes the exact total lines of code across all active project repositories and updates `index.html` with the formatted number (`+XX,XXX`).
Then, ensure the updated `index.html` is committed and pushed so the user's live portfolio always reflects their true work.
