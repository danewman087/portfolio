# Personal portfolio

A lightweight personal portfolio built with Vite, React, and Tailwind CSS. Featured work, experience, and archive entries live in JSON files under `src/data/`, so you can update your content without editing the UI.

## Get started

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Useful commands:

```sh
npm run build
npm run preview
```

## Add your content

- Replace the clearly labeled starter examples in `src/data/projects.json` with your featured projects. Each project opens as a case study.
- Update `src/data/experience.json` with education, internships, work, or other milestones.
- Add dated entries to `src/data/archive.json` for a searchable chronological log of builds, learning, events, and notes.
- Replace the name, email, and profile details in `src/App.jsx` before publishing.

Archive entries use `date`, `title`, `type`, `description`, and `tags` fields. Dates should use `YYYY-MM-DD` so chronological sorting stays consistent.
