# Delivery workflow: GitHub Pages site

Contents: repo layout, build loop, approval gates, push steps, pitfalls, fallback.

## Repo layout
```
index.html                 home: one course card, nothing else
assets/style.css, app.js, visuals.js, favicon.svg, days.js
100-days-of-<topic>/
  index.html               track page: day list + progress bar
  day-001-slug/index.html  one folder per day (zero-padded)
  review/index.html        longer card sessions
  recap-month-1/index.html month recap (link added to the track page at month end)
README.md, .nojekyll
```
Copy `assets/site/` from this skill to bootstrap. Day pages reference `../../assets/style.css` and `../../assets/app.js`.

## Build loop for one day
1. Copy `assets/template-day.html` to the day folder; fill every section.
2. Run `python scripts/check_day.py <page> --days-js <days.js>`; fix everything it reports.
3. Add diagram specs for the day id to `SP` in `visuals.js`.
4. Optional but valuable: smoke-test in jsdom with a stubbed `fetch` and the days.js preloaded; click through quiz, cards, review.
5. Publish a self-contained preview (inline the CSS and JS, disable links) and show it. Wait for approval.
6. Run `python scripts/register_day.py ...` to update days.js, the track page, the home card and the README.
7. Commit the day page plus every changed shared file in one push; use `push_files` with full file contents.

## Approval gates
- Show previews before the first commit of any new component or look.
- After the learner has approved the look, a request like "add day N and push it" is itself approval to push the new day.
- Ask before deleting files or removing features.

## Pitfalls seen in practice
- 403 "Resource not accessible by integration" on write: the connector has read-only access. The fix is on the learner's side (reauthorise with contents write; a fine-grained token header on the custom connector worked). Do not loop; explain once, offer a zip of the site for manual upload.
- Creating repositories may be refused even when file writes work; ask the learner to create an empty public repo with a README.
- After pushing, GitHub Pages needs a minute or two; browsers cache hard, so advise Ctrl+Shift+R.
- Progress, XP and card boxes are stored in the browser; mention that they do not sync across devices.
- In `String.replace` use a function replacement when injecting JavaScript (it contains `$$`).
- jsdom does not load external scripts; preload days.js in tests.
- Design decisions the learner already made: centred 760px page, diagrams as SVG sized to the text (about 483px max), no full-width layout, no home dashboard, no machine-learning second track, recap and revision as quiz and flip cards only.

## Fallback without GitHub access
Zip the site folder (`zip -r site.zip .`), present it, and give the steps: unzip, GitHub repo, Add file, Upload files, drag the contents (not the zip), commit, then Settings, Pages, deploy from branch main root.
