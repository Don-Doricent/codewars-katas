# codewars-katas

Automatically logs every Codewars kata I complete each day.

## How it works

- **Script**: `update-today.js`  
  Hits the Codewars API, filters for today’s completions, and writes them to `today.md`.

- **GitHub Action**  
  - Scheduled daily at **9 PM EDT**  
  - Can be triggered manually via **Actions → Daily Codewars Update → Run workflow**  
  - Commits `today.md` only if it’s changed

## Quickstart

1. Clone the repo:
   ```bash
   git clone git@github.com:Don-Doricent/codewars-katas.git
   cd codewars-katas
