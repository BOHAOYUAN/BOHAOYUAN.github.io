# bohaoyuan.github.io

Personal portfolio of **Haoyuan Bo (薄皓元)** — AI full-stack engineer, class of 2027.

Live: <https://bohaoyuan.github.io/>

## What this is

One static page, hand-written: no framework, no build step, no web font request, no analytics.
It is meant to be *checkable*: every project card links to a public repository, and every number on
the page comes from a committed test run, a committed benchmark JSON, or a file in the repo.

- Bilingual: 中文 (default) / English — toggle in the nav, or link with `?lang=en`
- Sections: hero, three selected projects, six more projects, toolkit, about, contact
- `?static=1` renders the page with the scroll-reveal animations disabled (useful for screenshots)

## Structure

```
index.html            the whole page
assets/css/style.css  ~1000 lines, CSS custom properties, responsive, reduced-motion aware
assets/js/main.js     language toggle, sticky nav, scroll reveal, section spy — no dependencies
assets/img/           project screenshots + Open Graph card
```

## Run locally

```bash
python -m http.server 8000
# then open http://127.0.0.1:8000/
```

## Content rules used here

1. A claim only appears if it can be traced to a repository, a test run or a committed benchmark file.
2. Numbers are the measured ones, not the aspirational ones (e.g. CodeBuddy's eval says 3/4 tasks
   solved — the failing task is shown on the page).
3. Projects whose repositories are not public are labelled as such instead of pretending to be live.
4. Live URLs that no longer resolve are not printed as "live".

## Deployment

Served by GitHub Pages from the `main` branch root. No CI, no Jekyll (`index.html` is plain HTML).
