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
  const archive = document.querySelector("[data-interactive-archive]");
  const modal = document.getElementById("portrait-modal");

  if (!archive || !modal) {
    return;
  }

  const modalImage = document.getElementById("portrait-modal-image");
  const modalTitle = document.getElementById("portrait-modal-title");
  const modalYear = document.getElementById("portrait-modal-year");
  const defaultImage = archive.dataset.defaultImage || "";
  let activeRow = null;

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
    modalImage.src = image;
    modalImage.alt = `${name} portrait`;
    modalTitle.textContent = name;
    modalYear.textContent = year;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modalImage.src = "";

    if (activeRow) {
      activeRow.classList.remove("is-active");
      activeRow.focus();
      activeRow = null;
    }
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
}
