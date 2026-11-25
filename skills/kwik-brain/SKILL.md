---
name: kwik-brain
description: Build study notes, learning plans and revision material for a visual learner who forgets within a week, using memory-science techniques (Jim Kwik style) and spaced repetition. Produces day-by-day interactive notes (SVG diagrams, flip cards, quizzes, memory palaces, a runnable coding question), weekly and monthly recaps, and can host them on GitHub Pages with preview-then-commit approval. Use whenever the user asks for study notes, a prep or learning plan, "notes for day N", interview-prep notes, revision or recap material, flashcards or quizzes, memory techniques, "kwik brain", or wants to learn any topic in a way that sticks, even if they do not name the technique.
---

# Kwik-Brain: notes that stick

A repeatable method for turning any topic into notes a learner actually remembers. It was refined over a real 100-day AI-engineering prep with a learner who is visual, forgets most things within a week, mainly rereads, and learns best from diagrams, analogies and active recall. Every rule below exists to serve that goal, so when a situation is not covered, ask which choice helps retention.

## The idea in one paragraph

Retention comes from (1) encoding an idea several ways at once (picture, analogy, definition, story), (2) pulling it back out of memory instead of rereading, (3) spacing those pulls over days and weeks, and (4) keeping sessions short, calm and rewarding. So each note mixes visuals and mnemonics, contains a coding task the learner attempts before seeing the answer, and feeds a card-based spaced-review loop. Revision is always quiz and flip-card style, never "write what you remember" essays.

## First run: gather inputs, then plan

Ask only what is missing, in one short batch (tappable options if available):

1. Topic and goal (for example "AI Engineer interviews in 3 months").
2. Starting level and what is already known.
3. Time per weekday (default 2 hours) and what weekends are for (default: projects and portfolio).
4. Start date and length (default 100 days; the last 10 are a revision and mock sprint).
5. Source material (notes, a roadmap site, a Drive folder). Read it first and mirror its order.
6. Hosting: a GitHub Pages site (default yes). Repo name, public or private (free Pages needs public), and whether the GitHub connector can write.

Then draft the plan using `references/plan-template.md`: weekday template, phases, one row per day (date, topic, practice slot), weekend project table, checkpoints. Show it, get approval, then write notes.

## The weekday template (2 hours)

| Block | Time | What |
|---|---|---|
| Learn | 45 min | the day's note, quiet room, phone away |
| Break | 5 min | water, stretch, cross-crawl |
| Practice slot | 30 min | DSA or a skill drill |
| Break | 5 min | move |
| Revise | 20 min | the "Revise earlier days" cards at the top of the note |
| Hands-on | 15 min | run the coding question, or answer one interview question aloud |

Saturday: Part A weekly recap (quiz and flip cards from Mon to Fri) plus Part B project build. Sunday: finish and ship the project, a 3-line weekend review, a preview of next week. The monthly recap page exists from the start, but its link is added to the track page only on the month's last weekend.

## What every day's note contains (in this order)

Start from `assets/template-day.html`; read `references/note-anatomy.md` for exact content and wording rules.

1. Header: tag line, title, one-line context, colour legend.
2. "Top 3 to remember" box (class `recap`). The same three points return in a recap box at the end (primacy and recency).
3. Warm-up (5 min): redraw or recite yesterday's picture. The "Revise earlier days" card session is inserted automatically after the Top 3 box.
4. The gist: one highlighted sentence plus a Capture and Create table.
5. The picture to remember: a step diagram as SVG.
6. Analogies from the learner's own world (for a Hyderabad learner: chai stall, biryani, auto meter, traffic).
7. Definitions as small cards, in plain words.
8. A live interactive demo when the idea is numeric or behavioural (sliders, a wheel, a simulator).
9. The "why?" ladder: 4 to 5 flip-card boxes, then a pitfall box.
10. Memory hooks: an acronym with a silly sentence, plus a memory palace of 4 to 5 stops with one emoji each.
11. A try-it task (about 15 min) with a small fill-in table.
12. One coding question: task and worked example, a runnable editor with tests, a hint, a collapsed solution with numbered explanation. The learner attempts it before seeing the answer.
13. A quick quiz of exactly 4 multiple-choice questions, each with a one-line explanation.
14. An outcome check ("say it aloud") with a model answer, and a teach-it box.
15. The spaced-revision tracker, the closing recap box and a "tomorrow" line.

Do not explain the memory techniques inside the notes. Apply them silently; the learner wants the result, not a lecture on the method.

## Diagrams and visuals

The learner thinks in pictures, so make several per note and keep them page-scaled.

- Use SVG, never raster. The main step diagram is inline in the page (`svg data-steps`, viewBox about 370 wide, 5 or 6 boxes, arrows as paths inside one `g` group). `assets/site/visuals.js` adds more diagrams per day from a spec table (flow, chips, comparison columns, bars, segmented bars, lanes, patch grid) and animates every `data-steps` SVG with a Play button.
- Size rule: diagrams must look the same size as the body text, not larger. Cap at about 483px wide inside a centred 760px page. Full-width pages and HTML card flows were tried and rejected, so do not bring them back.
- Aim for 3 to 5 visuals per day: one main flow, plus whichever of comparison, numeric bars, token or data chips, timeline, or architecture fits the idea.
- Colour roles are fixed: purple definition, yellow key idea, green analogy, blue why, red pitfall.

## Revision system (cards, not essays)

Every quiz question and every "why?" flip card is a card with an id (`d3:q1`, `d3:f2`). Cards move through Leitner boxes with gaps of 1, 3, 7, 21 and 45 days: correct moves up a box, missed returns to box 1 for tomorrow. Progress lives in the browser (localStorage), so say plainly that it does not sync between devices.

- Each day page auto-inserts "Revise earlier days": up to 8 due cards from earlier days only.
- A `review` page serves longer sessions (20 cards). Link it from the track page, not the home page.
- Weekly and monthly recaps are built automatically from the notes: a mixed quiz across days plus flip cards, nothing else. Missed questions link back to their day.
- No home-page dashboard; the learner asked for it to be removed.

## Hosting and delivery workflow

Read `references/delivery-workflow.md` before touching GitHub. The essentials:

1. Build the page from the template, then run `scripts/check_day.py` (structure, quiz JSON, the solution passes its own tests).
2. Show a preview and wait for approval, unless the learner has said to push directly. Their standing rule is: show first, commit after approval.
3. Register the day with `scripts/register_day.py` (updates `days.js`, the track page, the home card count and the README), then commit all changed files in one `push_files` call.
4. Pages redeploys in a minute or two; tell the learner to hard-refresh.
5. A 403 on write means the connector lacks repository write permission; say so and offer the zip fallback instead of retrying.

## Quality checklist before showing any note

- Four quiz questions, four to five why-cards, and one runnable coding question whose solution you actually executed.
- Analogies come from the learner's world; no technique lectures; typographic quotes and apostrophes in visible text.
- Top 3 appears twice; revision tracker and "tomorrow" line present.
- Numbers in examples are computed, not guessed.
- Diagrams are SVG at text-comparable size, at least three visuals.
- Revision content is quiz or flip-card only.

## Files in this skill

- `references/note-anatomy.md`: exact section content and wording rules.
- `references/components.md`: the data-attribute API and the visuals spec format.
- `references/memory-techniques.md`: the Kwik-style methods and where each shows up.
- `references/plan-template.md`: the multi-week plan format and compression rules.
- `references/delivery-workflow.md`: repo layout, approval gates, push steps, known pitfalls.
- `assets/template-day.html`: starting page for a new day.
- `assets/site/`: the shared site code (`style.css`, `app.js`, `visuals.js`, `favicon.svg`, `days.js`) to bootstrap a new site.
- `scripts/check_day.py`, `scripts/register_day.py`: verification and registration helpers.
