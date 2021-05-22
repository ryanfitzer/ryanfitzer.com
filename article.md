# Converting from WordPress to Next.js

## Challenges

- Exporting posts as Markdown. Used WordPress plugin (which one?)
- Updating front-matter for a 1000+ posts. Used custom script (how?)
- Handling `date` meta with `grey-matter`. (What was the issue? <https://github.com/jonschlinkert/gray-matter/issues/62#issuecomment-577628177>)

## Architecture

- Modeled a little on WordPress's `WP_Query` and `WP_Post` classes.
