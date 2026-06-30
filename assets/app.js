(async function () {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const create = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined && text !== null) element.textContent = text;
    return element;
  };

  const appendText = (parent, tag, className, text) => {
    if (!text) return null;
    const child = create(tag, className, text);
    parent.appendChild(child);
    return child;
  };

  const setText = (selector, value) => {
    if (!value) return;
    $$(selector).forEach((node) => {
      node.textContent = value;
    });
  };

  const loadContent = async () => {
    const response = await fetch("content/site.json", { cache: "no-cache" });
    if (!response.ok) throw new Error(`Unable to load content/site.json (${response.status})`);
    return response.json();
  };

  const renderLinks = (parent, links, options = {}) => {
    parent.replaceChildren();
    (links || []).forEach((link, index) => {
      if (!link.href || !link.label) return;
      const anchor = create("a", options.className || "text-link", link.label);
      anchor.href = link.href;
      if (/^https?:\/\//.test(link.href)) {
        anchor.target = "_blank";
        anchor.rel = "noreferrer";
      }
      if (options.primaryFirst && index === 0) anchor.classList.add("primary");
      parent.appendChild(anchor);
    });
  };

  const renderPills = (parent, items) => {
    if (!parent) return;
    parent.replaceChildren();
    (items || []).forEach((item) => parent.appendChild(create("span", "pill", item)));
  };

  const renderStats = (statsData) => {
    const stats = $("[data-stats]");
    if (!stats) return;
    stats.replaceChildren();
    (statsData || []).forEach((stat) => {
      const group = create("div");
      appendText(group, "dt", "", stat.label);
      appendText(group, "dd", "", stat.value);
      stats.appendChild(group);
    });
  };

  const renderTimeline = (selector, items) => {
    const root = $(selector);
    if (!root) return;
    root.replaceChildren();
    if (!items || items.length === 0) {
      root.appendChild(create("p", "empty-state", "Content coming soon."));
      return;
    }

    items.forEach((item) => {
      const article = create("article", "timeline-item");
      appendText(article, "div", "item-period", item.period);
      const main = create("div", "item-main");
      appendText(main, "h3", "", item.title);
      appendText(main, "p", "item-meta", item.organization);
      appendText(main, "p", "item-description", item.description);
      article.appendChild(main);
      root.appendChild(article);
    });
  };

  const renderPublications = (publications) => {
    const root = $('[data-section="publications"]');
    if (!root) return;
    root.replaceChildren();

    (publications || []).forEach((pub) => {
      const article = create("article", `publication-item${pub.selected ? " selected" : ""}`);
      appendText(article, "div", "publication-year", pub.year);

      const main = create("div", "publication-content");
      const topLine = create("div", "publication-topline");
      appendText(topLine, "h3", "publication-title", pub.title);
      if (pub.selected) appendText(topLine, "span", "badge", "Selected");
      main.appendChild(topLine);
      appendText(main, "p", "publication-meta", [pub.authors, pub.venue].filter(Boolean).join(" | "));
      appendText(main, "p", "publication-description", pub.description);

      if (pub.tags && pub.tags.length) {
        const tags = create("div", "tag-row");
        pub.tags.forEach((tag) => tags.appendChild(create("span", "tag", tag)));
        main.appendChild(tags);
      }

      if (pub.links && pub.links.length) {
        const links = create("div", "link-row");
        renderLinks(links, pub.links);
        main.appendChild(links);
      }

      article.appendChild(main);
      root.appendChild(article);
    });
  };

  const renderProjects = (projects) => {
    const root = $('[data-section="projects"]');
    if (!root) return;
    root.replaceChildren();

    (projects || []).forEach((project) => {
      const article = create("article", "project-item");
      appendText(article, "div", "item-period", project.period);

      const main = create("div", "project-content");
      appendText(main, "h3", "", project.title);
      appendText(main, "p", "project-description", project.description);

      if (project.tags && project.tags.length) {
        const tags = create("div", "tag-row");
        project.tags.forEach((tag) => tags.appendChild(create("span", "tag", tag)));
        main.appendChild(tags);
      }

      if (project.links && project.links.length) {
        const links = create("div", "link-row");
        renderLinks(links, project.links);
        main.appendChild(links);
      }

      article.appendChild(main);
      root.appendChild(article);
    });
  };

  const renderCompactList = (selector, items) => {
    const root = $(selector);
    if (!root) return;
    root.replaceChildren();

    (items || []).forEach((item) => {
      const article = create("article", "compact-item");
      appendText(article, "div", "item-period", item.period || item.year);
      const main = create("div", "item-main");
      appendText(main, "h3", "", item.title);
      appendText(main, "p", "compact-meta", item.meta);
      article.appendChild(main);
      root.appendChild(article);
    });
  };

  const renderAwards = (awards) => {
    const root = $('[data-section="awards"]');
    if (!root) return;
    root.replaceChildren();

    (awards || []).forEach((award) => {
      const article = create("article", "award-item");
      appendText(article, "div", "item-period", award.year);
      const main = create("div", "item-main");
      appendText(main, "h3", "", award.title);
      appendText(main, "p", "award-meta", award.organization);
      article.appendChild(main);
      root.appendChild(article);
    });
  };

  const wireNavigation = () => {
    const nav = $("[data-nav]");
    const toggle = $("[data-nav-toggle]");
    if (!nav || !toggle) return;

    toggle.addEventListener("click", () => {
      const nextState = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", nextState);
      toggle.setAttribute("aria-expanded", String(nextState));
      toggle.setAttribute("aria-label", nextState ? "Close navigation" : "Open navigation");
    });

    $$("a", nav).forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation");
      });
    });
  };

  const renderContent = (data) => {
    const owner = data.owner || {};
    const about = data.about || {};

    setText("[data-owner-short-name]", owner.name);
    setText("[data-owner-affiliation]", owner.affiliation);
    setText("[data-owner-name]", owner.name);
    setText("[data-owner-title]", owner.title);
    setText("[data-owner-summary]", owner.summary);
    setText("[data-footer-name]", owner.name);
    setText("[data-footer-affiliation]", owner.affiliation);
    setText("[data-footer-updated]", `Last updated: ${data.lastUpdated || "2026-06-30"}`);
    setText("[data-about-title]", about.title || "Biography");
    setText("[data-about-intro]", about.intro);

    const profileImage = $("[data-profile-image]");
    if (profileImage && owner.profileImage) {
      profileImage.src = owner.profileImage;
      profileImage.alt = `${owner.name || "Researcher"} profile image`;
    }

    if (owner.name) document.title = `${owner.name} | Academic Homepage`;

    const metaDescription = $('meta[name="description"]');
    if (metaDescription && owner.summary) metaDescription.setAttribute("content", owner.summary);

    const ownerLinks = $("[data-owner-links]");
    if (ownerLinks) {
      renderLinks(ownerLinks, owner.links, { className: "profile-link", primaryFirst: true });
    }

    renderPills($("[data-interests]"), about.interests || []);
    renderStats(data.stats);
    renderPublications(data.publications);
    renderProjects(data.projects);
    renderTimeline('[data-section="experience"]', data.experience);
    renderTimeline('[data-section="education"]', data.education);
    renderCompactList('[data-section="courses"]', data.courses);
    renderCompactList('[data-section="talks"]', data.talks);
    renderAwards(data.awards);
  };

  try {
    renderContent(await loadContent());
  } catch (error) {
    console.error(error);
    const main = $(".site-main");
    if (main) {
      const notice = create("p", "empty-state", "The site content could not be loaded. Please check content/site.json.");
      main.prepend(notice);
    }
  }

  wireNavigation();
})();
