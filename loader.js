document.addEventListener("DOMContentLoaded", () => {
  const headerTarget = document.getElementById("header");
  const footerTarget = document.getElementById("footer");
  const tasks = [];

  if (headerTarget) {
    tasks.push(
      fetch("header.html")
        .then((res) => res.text())
        .then((data) => {
          headerTarget.innerHTML = data;
          setupMobileNavigation();
        })
    );
  }

  if (footerTarget) {
    tasks.push(
      fetch("footer.html")
        .then((res) => res.text())
        .then((data) => {
          footerTarget.innerHTML = data;
        })
    );
  }

  Promise.all(tasks).finally(() => {
    setupContactForm();
    setupPastMastersArchive();
    setupScrollReveal();
  });
});

const PAST_MASTERS_DEFAULT_IMAGE = "past-masters/placeholder.svg";
const PAST_MASTERS_PHOTO_DIRECTORY = "past-masters";
const PAST_MASTERS_FEATURED_COUNT = 9;
const PAST_MASTERS_START_YEAR = 1956;
const PAST_MASTERS = [
   { year: 1956, name: "WM Philip Mayne" },
  { year: 1957, name: "WM Reuben Thomason" },
  { year: 1958, name: "WM Frank Norman" },
  { year: 1959, name: "WM Bob Weeks" },
  { year: 1960, name: "WM Greg Rackstraw" },
  { year: 1961, name: "WM Frank Lofthouse" },
  { year: 1962, name: "WM Cecil Charles" },
  { year: 1963, name: "WM Percy Parry" },
  { year: 1964, name: "WM Berty Webb" },
  { year: 1965, name: "WM Harold Edwards" },
  { year: 1966, name: "WM Arthur Evans" },
  { year: 1967, name: "WM Bert Street" },
  { year: 1968, name: "WM Roly Townsend" },
  { year: 1969, name: "WM John Worrall" },
  { year: 1970, name: "WM Leslie Warner" },
  { year: 1971, name: "WM Roland Garrett" },
  { year: 1972, name: "WM Ronald Skan" },
  { year: 1973, name: "WM Brian Smith" },
  { year: 1974, name: "WM Stan Brickwell" },
  { year: 1975, name: "WM Doug Stevens" },
  { year: 1976, name: "WM Alan Foley" },
  { year: 1977, name: "WM Ron Slingsby" },
  { year: 1978, name: "WM John Spicer" },
  { year: 1979, name: "WM Roy Oseman" },
  { year: 1980, name: "WM Bob Drake" },
  { year: 1981, name: "WM Doug MacMillan" },
  { year: 1982, name: "WM Roy Finch" },
  { year: 1983, name: "WM Don Clay" },
  { year: 1984, name: "WM Colin Edwards" },
  { year: 1985, name: "WM Rex Caulkin" },
  { year: 1986, name: "WM Des Davies" },
  { year: 1987, name: "WM Tom Dunderdale" },
  { year: 1988, name: "WM Adrian Hutt" },
  { year: 1989, name: "WM Rex Caulkin" }, // repeat
  { year: 1990, name: "WM Alan Dally" },
  { year: 1991, name: "WM Alan Bruno" },
  { year: 1992, name: "WM Dick King" },
  { year: 1993, name: "WM Doug Stevens" }, // repeat
  { year: 1994, name: "WM Bob Hesketh" },
  { year: 1995, name: "WM Brian Coaley" },
  { year: 1996, name: "WM Paul Taylor" },
  { year: 1997, name: "WM David Cherington" },
  { year: 1998, name: "WM Delmund Penney" },
  { year: 1999, name: "WM Dave Leggott" },
  { year: 2000, name: "WM Eric Greenfield" },
  { year: 2001, name: "WM Kevin Fletcher" },
  { year: 2002, name: "WM Alan Humphreys" },
  { year: 2003, name: "WM Brian Whittingslow" },
  { year: 2004, name: "WM Dave Waller" },
  { year: 2005, name: "WM Eric Greenfield" }, // repeat
  { year: 2006, name: "WM Rob Clark" },
  { year: 2007, name: "WM Brian Avery" },
  { year: 2008, name: "WM Tim Wilson" },
  { year: 2009, name: "WM Don Rushton" },
  { year: 2010, name: "WM John Bibby" },
  { year: 2011, name: "WM Paul Hanby-Holmes" },
  { year: 2012, name: "WM Russell Granville" },
  { year: 2013, name: "WM Giuseppe Muratore" },
  { year: 2014, name: "WM Ralph Kelsall" },
  { year: 2015, name: "WM Gary Prosser" },
  { year: 2016, name: "WM Matt Smallman" },
  { year: 2017, name: "WM Dean Clarke" },
  { year: 2018, name: "WM David Darby" },

  // Your newer data (kept, assumed correct)
  { year: 2019, name: "Unknown Right now" },
  { year: 2020, name: "Unknown Right now" },
  { year: 2021, name: "Unknown Right now" },
  { year: 2022, name: "WM Paul Cross" },
  { year: 2023, name: "WM Brian Whittingslow" },
  { year: 2024, name: "WM Adrian Hutt" },
  { year: 2025, name: "WM Ian Miller" }
];

function setupMobileNavigation() {
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  if (!menuToggle || !nav) {
    return;
  }

  function closeMenu() {
    nav.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    nav.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
  }

  menuToggle.addEventListener("click", () => {
    if (nav.classList.contains("active")) {
      closeMenu();
      return;
    }

    openMenu();
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!nav.classList.contains("active")) {
      return;
    }

    if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

function setupContactForm() {
  const nextField = document.getElementById("contact-form-next");

  if (!nextField) {
    return;
  }

  if (window.location.protocol === "http:" || window.location.protocol === "https:") {
    nextField.value = new URL("thank-you.html", window.location.href).toString();
  }
}

function setupScrollReveal() {
  const sections = document.querySelectorAll(".reveal-section");

  if (!sections.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    sections.forEach((section) => section.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function setupPastMastersArchive() {
  renderPastMasters();

  const archive = document.querySelector("[data-interactive-archive]");
  const modal = document.getElementById("portrait-modal");

  if (!archive || !modal) {
    return;
  }

  const modalImage = document.getElementById("portrait-modal-image");
  const modalTitle = document.getElementById("portrait-modal-title");
  const modalYear = document.getElementById("portrait-modal-year");
  const defaultImage = archive.dataset.defaultImage || PAST_MASTERS_DEFAULT_IMAGE;
  const modalHideDuration = 240;
  let activeRow = null;
  let clearModalImageTimer = null;
  let modalHistoryOpen = false;
  let ignoreNextPopstate = false;

  setupImageFade(modalImage);

  modalImage.addEventListener("error", () => {
    modalImage.src = defaultImage;
  });

  archive.querySelectorAll(".master-row").forEach((row) => {
    row.tabIndex = 0;
    row.setAttribute("role", "button");
    row.setAttribute("aria-haspopup", "dialog");
  });

  function openModal(row) {
    const year = row.querySelector(".master-row-year")?.textContent?.trim() || "";
    const name = row.querySelector(".master-row-name")?.textContent?.trim() || "Past Master";
    const image = row.dataset.image || defaultImage;

    if (!image) {
      return;
    }

    if (activeRow) {
      activeRow.classList.remove("is-active");
    }

    activeRow = row;
    activeRow.classList.add("is-active");
    clearTimeout(clearModalImageTimer);
    modalImage.src = image;
    setupImageFade(modalImage);
    modalImage.alt = `${name} portrait`;
    modalTitle.textContent = name;
    modalYear.textContent = year;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    if (!modalHistoryOpen) {
      history.pushState({ ...history.state, pastMasterModal: true }, "");
      modalHistoryOpen = true;
    }
  }

  function closeModal(fromHistory = false) {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    clearTimeout(clearModalImageTimer);
    clearModalImageTimer = setTimeout(() => {
      if (modal.classList.contains("is-open")) {
        return;
      }

      modalImage.classList.remove("is-loaded");
      modalImage.src = "";
    }, modalHideDuration);

    if (activeRow) {
      activeRow.classList.remove("is-active");
      activeRow.focus();
      activeRow = null;
    }

    if (!fromHistory && modalHistoryOpen) {
      modalHistoryOpen = false;
      ignoreNextPopstate = true;
      history.back();
      return;
    }

    modalHistoryOpen = false;
  }

  archive.addEventListener("click", (event) => {
    const row = event.target.closest(".master-row");

    if (!row) {
      return;
    }

    openModal(row);
  });

  archive.addEventListener("keydown", (event) => {
    const row = event.target.closest(".master-row");

    if (!row) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal(row);
    }
  });

  modal.addEventListener("click", (event) => {
    if (event.target.hasAttribute("data-close-modal")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  window.addEventListener("popstate", () => {
    if (ignoreNextPopstate) {
      ignoreNextPopstate = false;
      return;
    }

    if (modal.classList.contains("is-open")) {
      closeModal(true);
    }
  });
}

function renderPastMasters() {
  const featuredTarget = document.getElementById("featured-masters");
  const archiveTarget = document.getElementById("archive-masters");

  if (!featuredTarget || !archiveTarget) {
    return;
  }

  const records = PAST_MASTERS.slice().sort((a, b) => b.year - a.year);
  const featured = records.slice(0, PAST_MASTERS_FEATURED_COUNT);
  const archive = records.slice(PAST_MASTERS_FEATURED_COUNT);

  featuredTarget.innerHTML = featured.map(renderFeaturedMasterCard).join("");
  archiveTarget.innerHTML = archive.map(renderArchiveMasterRow).join("");
  document.querySelectorAll(".master-portrait img").forEach(setupImageFade);
}

function renderFeaturedMasterCard(master) {
  const image = getPastMasterImagePath(master);
  const description = master.description || "";

  return `
    <article class="master-card">
      <div class="master-portrait">
        <img src="${image}" alt="${escapeHtml(master.name)} portrait" onerror="this.onerror=null;this.src='${PAST_MASTERS_DEFAULT_IMAGE}'">
      </div>
      <div class="master-card-body">
        <p class="master-year">${escapeHtml(String(master.year))}</p>
        <h3>${escapeHtml(master.name)}</h3>
        <p>${escapeHtml(description)}</p>
      </div>
    </article>
  `;
}

function renderArchiveMasterRow(master) {
  const image = getPastMasterImagePath(master);

  return `
    <div class="master-row" data-image="${image}">
      <div class="master-row-year">${escapeHtml(String(master.year))}</div>
      <div class="master-row-name">${escapeHtml(master.name)}</div>
    </div>
  `;
}

function getPastMasterImagePath(master) {
  if (master.image) {
    return master.image;
  }

  if (master.photo) {
    return `${PAST_MASTERS_PHOTO_DIRECTORY}/${master.photo}.jpg`;
  }

  if (master.year >= PAST_MASTERS_START_YEAR) {
    return `${PAST_MASTERS_PHOTO_DIRECTORY}/${master.year - PAST_MASTERS_START_YEAR + 1}.jpg`;
  }

  return PAST_MASTERS_DEFAULT_IMAGE;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function setupImageFade(image) {
  if (!image) {
    return;
  }

  function markLoaded() {
    image.classList.add("is-loaded");
  }

  image.classList.remove("is-loaded");

  if (image.complete && image.naturalWidth > 0) {
    requestAnimationFrame(markLoaded);
    return;
  }

  image.addEventListener("load", markLoaded, { once: true });
}
