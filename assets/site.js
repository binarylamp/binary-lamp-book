(function () {
  const articles = window.BINARY_LAMP_ARTICLES || [];

  function escapeHtml(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function inlineMarkdown(value) {
    return escapeHtml(value)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  }

  function markdownToHtml(markdown) {
    const lines = markdown.replace(/\r\n/g, "\n").split("\n");
    const html = [];
    let listOpen = false;

    function closeList() {
      if (listOpen) {
        html.push("</ul>");
        listOpen = false;
      }
    }

    for (const line of lines) {
      if (/^### /.test(line)) {
        closeList();
        html.push(`<h3>${inlineMarkdown(line.slice(4))}</h3>`);
      } else if (/^## /.test(line)) {
        closeList();
        html.push(`<h2>${inlineMarkdown(line.slice(3))}</h2>`);
      } else if (/^# /.test(line)) {
        closeList();
        html.push(`<h1>${inlineMarkdown(line.slice(2))}</h1>`);
      } else if (/^- /.test(line)) {
        if (!listOpen) {
          html.push("<ul>");
          listOpen = true;
        }
        html.push(`<li>${inlineMarkdown(line.slice(2))}</li>`);
      } else if (/^> /.test(line)) {
        closeList();
        html.push(`<blockquote>${inlineMarkdown(line.slice(2))}</blockquote>`);
      } else if (line.trim()) {
        closeList();
        html.push(`<p>${inlineMarkdown(line)}</p>`);
      } else {
        closeList();
      }
    }

    closeList();
    return html.join("\n");
  }

  function renderToc() {
    const toc = document.querySelector("[data-toc]");
    if (!toc) return;

    toc.innerHTML = articles
      .map((article) => `<li><a href="articles/${article.slug}.html">${article.title}</a></li>`)
      .join("");
  }

  function renderSideNav(currentSlug) {
    const nav = document.querySelector("[data-side-nav]");
    if (!nav) return;

    nav.innerHTML = [
      "<h2>Contents</h2>",
      ...articles.map((article) => {
        const current = article.slug === currentSlug ? ' aria-current="page"' : "";
        return `<a href="${article.slug}.html"${current}>${String(article.number).padStart(2, "0")}. ${article.title}</a>`;
      })
    ].join("");
  }

  function renderPager(currentArticle) {
    const pager = document.querySelector("[data-pager]");
    if (!pager) return;

    const index = articles.findIndex((article) => article.slug === currentArticle.slug);
    const previous = articles[index - 1];
    const next = articles[index + 1];

    pager.innerHTML = [
      previous ? `<a href="${previous.slug}.html">Previous<br>${previous.title}</a>` : "<span></span>",
      next ? `<a href="${next.slug}.html">Next<br>${next.title}</a>` : "<span></span>"
    ].join("");
  }

  async function renderArticlePage() {
    const page = document.querySelector("[data-article-page]");
    if (!page) return;

    const slug = page.dataset.slug;
    const article = articles.find((item) => item.slug === slug);
    const title = document.querySelector("[data-article-title]");
    const meta = document.querySelector("[data-article-meta]");
    const body = document.querySelector("[data-article-body]");

    if (!article || !body) return;

    document.title = `${article.title} | Binary Lamp`;
    title.textContent = article.title;
    meta.textContent = `Chapter ${String(article.number).padStart(2, "0")}`;
    renderSideNav(slug);
    renderPager(article);

    try {
      const response = await fetch(`../articles/${slug}.md`, { cache: "no-store" });
      const markdown = response.ok ? await response.text() : "";
      body.innerHTML = markdown.trim()
        ? markdownToHtml(markdown)
        : '<p><span class="status">Coming Soon</span></p><p>この章はこれから執筆します。</p>';
    } catch (error) {
      body.innerHTML = '<p><span class="status">Coming Soon</span></p><p>この章はこれから執筆します。</p>';
    }
  }

  renderToc();
  renderArticlePage();
})();
