"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// ================= SIDEBAR =================
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// ================= TESTIMONIALS =================
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");

  const sliderBtns = document.querySelectorAll(".slider-btn");

  // modal terbuka
  if (modalContainer.classList.contains("active")) {
    sliderBtns.forEach((btn) => {
      btn.style.opacity = "0";
      btn.style.visibility = "hidden";
      btn.style.pointerEvents = "none";
    });
  }

  // modal tertutup
  else {
    sliderBtns.forEach((btn) => {
      btn.style.opacity = "1";
      btn.style.visibility = "visible";
      btn.style.pointerEvents = "auto";
    });
  }
};

// klik card testimonials
testimonialsItem.forEach((item) => {
  item.addEventListener("click", function (e) {
    // ✅ FIX: kalau klik link IG → jangan buka modal
    if (e.target.closest("a")) return;

    // ambil data
    const avatar = this.querySelector("[data-testimonials-avatar]");
    const title = this.querySelector(".testimonials-item-title");
    const text = this.querySelector("[data-testimonials-text]");

    modalImg.src = avatar.src;
    modalImg.alt = avatar.alt;
    modalTitle.innerHTML = title.innerText; // ambil teks saja (biar bersih)
    modalText.innerHTML = text.innerHTML;

    // buka modal
    testimonialsModalFunc();
  });
});

// close modal
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// ================= FILTER PORTFOLIO =================
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

selectItems.forEach((item) => {
  item.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

const filterFunc = function (selectedValue) {
  filterItems.forEach((item) => {
    if (selectedValue === "all" || selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

let lastClickedBtn = filterBtn[0];

filterBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// ================= CONTACT FORM =================
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach((input) => {
  input.addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

// ================= NAVIGATION =================
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const target = this.textContent.trim().toLowerCase();

    navigationLinks.forEach((el) => el.classList.remove("active"));
    this.classList.add("active");

    pages.forEach((page) => {
      if (page.dataset.page === target) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    });

    window.scrollTo(0, 0);
  });
});

// ================= MODAL IMAGE AWARDS =================
function openModal(element) {
  const img = element.querySelector("img");
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");

  modal.style.display = "block";
  modalImg.src = img.src;
}

// tombol close
document.querySelector(".close-modal").onclick = function () {
  document.getElementById("imageModal").style.display = "none";
};

// klik luar gambar
document.getElementById("imageModal").onclick = function (e) {
  if (e.target === this) {
    this.style.display = "none";
  }
};
// ================= INFINITE BUSINESS SLIDER =================

const businessList = document.querySelector(".testimonials-list");

const nextBtn = document.querySelector(".next-btn");

const prevBtn = document.querySelector(".prev-btn");

const items = document.querySelectorAll(".testimonials-item");

let currentIndex = 0;

// fungsi scroll ke item
function scrollToItem(index) {
  const itemWidth = items[0].offsetWidth + 20;

  businessList.scrollTo({
    left: itemWidth * index,
    behavior: "smooth",
  });
}

// tombol kanan
nextBtn.addEventListener("click", () => {
  currentIndex++;

  // jika sudah terakhir → kembali ke awal
  if (currentIndex >= items.length) {
    currentIndex = 0;
  }

  scrollToItem(currentIndex);
});

// tombol kiri
prevBtn.addEventListener("click", () => {
  currentIndex--;

  // jika sebelum pertama → lompat ke terakhir
  if (currentIndex < 0) {
    currentIndex = items.length - 1;
  }

  scrollToItem(currentIndex);
});
// ================= READ MORE EXPAND =================

const readMoreBtns = document.querySelectorAll(".read-more-btn");

readMoreBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    const card = btn.closest(".content-card");

    const slider = btn.closest(".business-slider");

    // toggle active card
    card.classList.toggle("active");

    // cek apakah ada card aktif
    const hasActiveCard = slider.querySelector(".content-card.active");

    // hide/show tombol slider
    if (hasActiveCard) {
      slider.classList.add("reading-mode");
    } else {
      slider.classList.remove("reading-mode");
    }
  });
});
// ================= WEBSITE TRANSLATE =================

const translateBtn = document.getElementById("translateToggle");

let translated = false;

translateBtn.addEventListener("click", () => {
  const googleSelect = document.querySelector(".goog-te-combo");

  if (!googleSelect) return;

  // translate
  if (!translated) {
    const userLang = navigator.language || navigator.userLanguage;

    const targetLang = userLang.split("-")[0];

    googleSelect.value = targetLang;

    googleSelect.dispatchEvent(new Event("change"));

    translateBtn.innerHTML = `
      <ion-icon name="refresh-outline"></ion-icon>
      <span>Original</span>
    `;

    translated = true;
  }

  // kembali original
  else {
    googleSelect.value = "en";

    googleSelect.dispatchEvent(new Event("change"));

    translateBtn.innerHTML = `
      <ion-icon name="language-outline"></ion-icon>
      <span>Translate</span>
    `;

    translated = false;
  }
});
