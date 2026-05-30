(function () {
  const page =
    window.guidePage ||
    (window.guidePages && window.guidePageId ? window.guidePages[window.guidePageId] : null);
  const root = document.querySelector("[data-guide-root]");

  if (!page || !root || !page.content) {
    return;
  }

  const storageKey = "s2guidehub-lang";
  const defaultLang = "en";

  const readLanguage = () => {
    try {
      return localStorage.getItem(storageKey) || defaultLang;
    } catch {
      return defaultLang;
    }
  };

  const writeLanguage = (lang) => {
    try {
      localStorage.setItem(storageKey, lang);
    } catch {
      // Detail pages still work when localStorage is unavailable.
    }
  };

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const items = (value) => (Array.isArray(value) ? value : []);

  function renderParagraphs(paragraphs) {
    return items(paragraphs)
      .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
      .join("");
  }

  function renderSummaryItems(summaryItems) {
    return items(summaryItems)
      .map(
        (item) => `
          <div>
            <span>${escapeHtml(item.label)}</span>
            <strong>${escapeHtml(item.value)}</strong>
          </div>
        `,
      )
      .join("");
  }

  function renderMetaList(metaItems) {
    return items(metaItems)
      .map(
        (item) => `
          <div>
            <dt>${escapeHtml(item.term)}</dt>
            <dd>${escapeHtml(item.description)}</dd>
          </div>
        `,
      )
      .join("");
  }

  function renderCards(cards) {
    return items(cards)
      .map(
        (card, index) => `
          <article class="module-card">
            <span class="module-number">${String(index + 1).padStart(2, "0")}</span>
            <h3>${escapeHtml(card.title)}</h3>
            <p>${escapeHtml(card.body)}</p>
          </article>
        `,
      )
      .join("");
  }

  function renderRouteSteps(steps) {
    return items(steps)
      .map(
        (step, index) => `
          <article class="route-step">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <h3>${escapeHtml(step.title)}</h3>
            <p>${escapeHtml(step.body)}</p>
          </article>
        `,
      )
      .join("");
  }

  function renderList(listItems) {
    return items(listItems)
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");
  }

  function renderRows(rows) {
    return items(rows)
      .map(
        (row) => `
          <tr>
            <td>${escapeHtml(row.item)}</td>
            <td>${escapeHtml(row.note)}</td>
            <td>${escapeHtml(row.status)}</td>
          </tr>
        `,
      )
      .join("");
  }

  function renderSources(sources) {
    return items(sources)
      .map((source) => {
        const href = escapeHtml(source.href);
        const label = escapeHtml(source.label);
        const note = escapeHtml(source.note);
        const link = href
          ? `<a class="inline-link" href="${href}" rel="noopener noreferrer">${label}</a>`
          : `<strong>${label}</strong>`;

        return `
          <li>
            ${link}
            <span>${note}</span>
          </li>
        `;
      })
      .join("");
  }

  function renderRelatedLinks(links) {
    if (!items(links).length) {
      return "";
    }

    return `
      <div class="guide-related-links" aria-label="Related unlock guides">
        ${items(links)
          .map(
            (link) =>
              `<a class="section-top-link" href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`,
          )
          .join("")}
      </div>
    `;
  }


  const guideImages = {
    "feedback-resonator": {
      src: "assets/official-gallery/subnautica-2-official-04.jpg",
      alt: "Official Subnautica 2 promotional screenshot showing underwater wildlife and a handheld tool view",
    },
    "tadpole-haul-chassis": {
      src: "assets/official-gallery/subnautica-2-official-02.jpg",
      alt: "Official Subnautica 2 promotional screenshot showing an interior room with equipment",
    },
    "tadpole-vehicle": {
      src: "assets/official-gallery/subnautica-2-official-06.jpg",
      alt: "Official Subnautica 2 promotional screenshot showing a vehicle moving through an orange underwater biome",
    },
    "improved-fins": {
      src: "assets/official-gallery/subnautica-2-official-03.jpg",
      alt: "Official Subnautica 2 promotional screenshot showing a diver swimming through a bright reef",
    },
    "tadpole-depth-module-mk-i": {
      src: "assets/official-gallery/subnautica-2-official-05.jpg",
      alt: "Official Subnautica 2 promotional screenshot showing a deeper dark underwater biome",
    },
  };

  function renderConceptFigure(lang) {
    const image = guideImages[window.guidePageId] || guideImages["tadpole-vehicle"];
    const caption =
      lang === "zh"
        ? "Official Subnautica 2 promotional image via Steam / 官方宣传图，来源：Steam。Rights remain with Unknown Worlds Entertainment and related rightsholders."
        : "Official Subnautica 2 promotional image via Steam. Rights remain with Unknown Worlds Entertainment and related rightsholders.";

    return `
      <figure class="concept-figure guide-concept">
        <img src="../${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}">
        <figcaption>${escapeHtml(caption)}</figcaption>
      </figure>
    `;
  }

  function renderPage(lang) {
    const data = page.content[lang] || page.content.en;
    const documentLang = lang === "zh" ? "zh-CN" : "en";

    document.documentElement.lang = documentLang;
    root.innerHTML = `
      <section class="page-hero guide-hero" id="summary" aria-labelledby="guide-title">
        <p class="eyebrow">${escapeHtml(data.heroEyebrow)}</p>
        <h1 id="guide-title">${escapeHtml(data.title)}</h1>
        ${renderParagraphs(data.deck)}
        <div class="guide-hero-summary" aria-label="${escapeHtml(data.summaryAria || data.title)}">
          ${renderSummaryItems(data.summaryItems)}
        </div>
      </section>

      ${renderConceptFigure(lang)}

      <section class="guide-section" id="guide-summary" aria-labelledby="summary-title">
        <div class="guide-layout">
          <article class="guide-panel guide-panel-primary">
            <p class="eyebrow">${escapeHtml(data.summaryEyebrow)}</p>
            <h2 id="summary-title">${escapeHtml(data.summaryTitle)}</h2>
            ${renderParagraphs(data.summaryBody)}
            ${renderRelatedLinks(data.relatedLinks)}
          </article>

          <aside class="guide-panel status-card">
            <h2>${escapeHtml(data.statusTitle)}</h2>
            <dl class="guide-meta-list">
              ${renderMetaList(data.statusItems)}
            </dl>
          </aside>
        </div>
      </section>

      <section class="guide-section" id="player-value" aria-labelledby="value-title">
        <div class="section-heading guide-heading">
          <p class="eyebrow">${escapeHtml(data.valueEyebrow)}</p>
          <h2 id="value-title">${escapeHtml(data.valueTitle)}</h2>
          ${renderParagraphs(data.valueIntro)}
        </div>
        <div class="module-grid guide-benefit-grid">
          ${renderCards(data.valueCards)}
        </div>
      </section>

      <section class="guide-section" id="required-parts" aria-labelledby="parts-title">
        <div class="guide-layout">
          <article class="guide-panel">
            <p class="eyebrow">${escapeHtml(data.partsEyebrow)}</p>
            <h2 id="parts-title">${escapeHtml(data.partsTitle)}</h2>
            ${renderParagraphs(data.partsIntro)}
            <div class="guide-table-wrap">
              <table class="guide-table">
                <thead>
                  <tr>
                    <th>${escapeHtml(data.partsHeaders[0])}</th>
                    <th>${escapeHtml(data.partsHeaders[1])}</th>
                    <th>${escapeHtml(data.partsHeaders[2])}</th>
                  </tr>
                </thead>
                <tbody>${renderRows(data.partsRows)}</tbody>
              </table>
            </div>
          </article>

          <aside class="guide-panel warning-panel">
            <h2>${escapeHtml(data.partsAsideTitle)}</h2>
            <ul class="page-list">${renderList(data.partsAsideItems)}</ul>
          </aside>
        </div>
      </section>

      <section class="guide-section" id="optimized-route" aria-labelledby="route-title">
        <div class="section-heading guide-heading">
          <p class="eyebrow">${escapeHtml(data.routeEyebrow)}</p>
          <h2 id="route-title">${escapeHtml(data.routeTitle)}</h2>
          ${renderParagraphs(data.routeIntro)}
        </div>
        <div class="guide-route-grid">
          ${renderRouteSteps(data.routeSteps)}
        </div>
      </section>

      <aside class="ad-slot ad-slot-wide" aria-label="${escapeHtml(data.adLabel)}">
        <span>${escapeHtml(data.adLabel)}</span>
      </aside>

      <section class="guide-section" id="risks-extras" aria-labelledby="risks-title">
        <div class="guide-layout">
          <article class="guide-panel warning-panel">
            <p class="eyebrow">${escapeHtml(data.risksEyebrow)}</p>
            <h2 id="risks-title">${escapeHtml(data.risksTitle)}</h2>
            <ul class="page-list">${renderList(data.risks)}</ul>
          </article>

          <aside class="guide-panel status-card">
            <h2>${escapeHtml(data.extrasTitle)}</h2>
            <ul class="page-list">${renderList(data.extras)}</ul>
          </aside>
        </div>
      </section>

      <section class="guide-section" id="verification" aria-labelledby="verification-title">
        <div class="guide-layout">
          <article class="guide-panel">
            <p class="eyebrow">${escapeHtml(data.verificationEyebrow)}</p>
            <h2 id="verification-title">${escapeHtml(data.verificationTitle)}</h2>
            ${renderParagraphs(data.verificationIntro)}
            <ul class="source-list">${renderSources(data.sources)}</ul>
          </article>

          <aside class="guide-panel status-card">
            <h2>${escapeHtml(data.nextTitle)}</h2>
            ${renderParagraphs(data.nextBody)}
            <a class="section-top-link" href="../index.html#unlocks">${escapeHtml(data.backToUnlocks)}</a>
          </aside>
        </div>
      </section>
    `;
  }

  function setLanguage(lang) {
    const nextLang = page.content[lang] ? lang : defaultLang;

    writeLanguage(nextLang);
    renderPage(nextLang);

    document.querySelectorAll("[data-guide-lang-switch]").forEach((button) => {
      const isActive = button.dataset.guideLangSwitch === nextLang;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  document.querySelectorAll("[data-guide-lang-switch]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.guideLangSwitch));
  });

  setLanguage(readLanguage());
})();
