# Binary Lamp
Binary Lamp

Making IT and English accessible to non-engineers.

Building a book in public.

Binary Lamp is a static GitHub Pages website for a book-in-progress project.

The site publishes the table of contents first, then allows each article to be expanded over time. Article history is preserved naturally through Git commits.

## Structure

- `index.html` is the homepage and table of contents.
- `articles/*.md` contains the editable article text.
- `articles/*.html` contains the public page for each article.
- `assets/articles.js` stores the article list used by the homepage and navigation.
- `assets/site.js` renders Markdown and article navigation in the browser.
- `styles/main.css` controls the visual design.
- `roadmap.md` tracks project milestones.

## Updating an Article

1. Open the matching Markdown file in `articles/`.
2. Replace the placeholder text with the article draft.
3. Keep the first line as the article title, using Markdown heading syntax.
4. Commit the change with a clear message.

Example:

```markdown
# Packet

この記事では、packet という言葉がネットワークでどのように使われるかを説明します。
```

## Previewing Locally

Because article pages load Markdown files in the browser, preview the site with a local static server instead of opening `index.html` directly from the file system.

One simple option:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Adding a New Article Later

1. Add a new Markdown file in `articles/`.
2. Add a matching HTML page in `articles/` using the existing article page pattern.
3. Add the new entry to `assets/articles.js`.
4. Link it from the table of contents if needed.

## Enabling GitHub Pages

1. Create a GitHub repository for this project.
2. Copy the contents of this folder into the repository root.
3. Commit and push the files.
4. In GitHub, open the repository settings.
5. Go to **Pages**.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Select the branch, usually `main`.
8. Select `/ (root)` as the folder.
9. Save the settings.

GitHub will publish the site after the first Pages deployment finishes.

## Writing Policy

- Use English for titles and UI labels.
- Use Japanese for explanatory draft placeholders.
- Avoid personal names.
- Keep changes small and meaningful so the writing process remains readable in Git history.
