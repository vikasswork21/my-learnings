#!/usr/bin/env python3
"""Register a new day in the site: days.js, track page, home card, README.

Usage:
  python register_day.py --root SITE_DIR --track 100-days-of-ai-engineering \
      --id d7 --n 7 --folder day-007-where-llms-fail --title "Where LLMs Fail" \
      --date 2026-11-23 --weekday "Mon 23 Nov" --q 4 --f 5 [--total 100]

Updates (idempotent for the same id):
  assets/days.js                 appends the day with card counts
  TRACK/index.html               adds the list item, updates 'N of TOTAL' and the progress bar
  index.html                     updates 'Day N of TOTAL written'
  README.md                      adds the folder line to the structure block
Prints the files to commit.
"""
import argparse, os, re

def rw(path, fn):
    s = open(path, encoding="utf-8").read()
    t = fn(s)
    if t != s:
        open(path, "w", encoding="utf-8").write(t)
        return True
    return False

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", required=True)
    ap.add_argument("--track", required=True)
    ap.add_argument("--id", required=True)
    ap.add_argument("--n", type=int, required=True)
    ap.add_argument("--folder", required=True)
    ap.add_argument("--title", required=True)
    ap.add_argument("--date", required=True)
    ap.add_argument("--weekday", required=True)
    ap.add_argument("--q", type=int, default=4)
    ap.add_argument("--f", type=int, default=5)
    ap.add_argument("--total", type=int, default=100)
    a = ap.parse_args()
    R, changed = a.root, []
    url = "%s/%s/" % (a.track, a.folder)

    def days(s):
        if "id:'%s'," % a.id in s:
            return s
        entry = "{id:'%s',n:%d,title:'%s',url:'%s',date:'%s',cards:{q:%d,f:%d}}" % (
            a.id, a.n, a.title.replace("'", "\\'"), url, a.date, a.q, a.f)
        return s.rstrip().rstrip(";").rstrip("]") + "," + entry + "];\n"
    if rw(os.path.join(R, "assets/days.js"), days): changed.append("assets/days.js")

    tp = os.path.join(R, a.track, "index.html")
    def track(s):
        if 'href="%s/"' % a.folder in s:
            return s
        li = '<li><a href="%s/"><b>Day %03d</b> %s <em>%s ✓</em></a></li>\n' % (a.folder, a.n, a.title, a.weekday)
        # insert after the last "Day NNN" list item
        items = list(re.finditer(r'<li><a href="[^"]*"><b>Day \d+</b>.*?</li>\n', s))
        pos = items[-1].end() if items else s.index("</ul>")
        s = s[:pos] + li + s[pos:]
        s = re.sub(r"<b>\d+ of \d+</b>", "<b>%d of %d</b>" % (a.n, a.total), s)
        s = re.sub(r"width:\d+%", "width:%d%%" % round(a.n * 100 / a.total), s)
        return s
    if rw(tp, track): changed.append(a.track + "/index.html")

    def home(s):
        return re.sub(r"<b>Day \d+ of \d+</b> written", "<b>Day %d of %d</b> written" % (a.n, a.total), s)
    if os.path.exists(os.path.join(R, "index.html")) and rw(os.path.join(R, "index.html"), home):
        changed.append("index.html")

    def readme(s):
        if a.folder in s:
            return s
        lines = s.split("\n")
        idx = [i for i, l in enumerate(lines) if re.match(r"\s+day-\d+-", l)]
        if idx:
            lines.insert(idx[-1] + 1, "  %s/" % a.folder)
        return "\n".join(lines)
    rp = os.path.join(R, "README.md")
    if os.path.exists(rp) and rw(rp, readme): changed.append("README.md")

    print("updated:", ", ".join(changed) or "(nothing, already registered)")
    print("commit these plus %s/%sindex.html, and visuals.js if you added diagram specs." % (a.track, a.folder + "/"))

if __name__ == "__main__":
    main()
