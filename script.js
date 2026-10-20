
"use strict";

// Catalogue indicatif.
// Les modèles, versions et disponibilités sont à vérifier
// auprès des fabricants ou fournisseurs.

const products = [
  // JNR
  { brand: "JNR", name: "AeroX", type: "Pod / rechargeable" },
  { brand: "JNR", name: "Alien", type: "Référence à confirmer" },
  { brand: "JNR", name: "Big Mac", type: "Référence à confirmer" },
  { brand: "JNR", name: "Big Mac Shisha", type: "Référence à confirmer" },
  { brand: "JNR", name: "Cruiser", type: "Référence à confirmer" },
  { brand: "JNR", name: "Cruiser Plus", type: "Référence à confirmer" },
  { brand: "JNR", name: "Crown Shisha", type: "Référence à confirmer" },
  { brand: "JNR", name: "Crystal Glow", type: "Rechargeable à confirmer" },
  { brand: "JNR", name: "Falcon", type: "Référence à confirmer" },
  { brand: "JNR", name: "Falcon Bar", type: "Référence à confirmer" },
  { brand: "JNR", name: "Falcon GEM+", type: "Référence à confirmer" },
  { brand: "JNR", name: "Falcon Nexus", type: "Référence à confirmer" },
  { brand: "JNR", name: "Falcon Pro", type: "Référence à confirmer" },
  { brand: "JNR", name: "Falcon-X", type: "Référence à confirmer" },
  { brand: "JNR", name: "Falcon-X+", type: "Référence à confirmer" },
  { brand: "JNR", name: "Flux Pro", type: "Référence à confirmer" },
  { brand: "JNR", name: "Glide Pen", type: "Référence à confirmer" },
  { brand: "JNR", name: "Gorilla X", type: "Référence à confirmer" },
  { brand: "JNR", name: "Jpuff", type: "Référence à confirmer" },
  { brand: "JNR", name: "Lila Kiss", type: "Référence à confirmer" },
  { brand: "JNR", name: "Lila Kiss+", type: "Référence à confirmer" },
  { brand: "JNR", name: "Lion King", type: "Référence à confirmer" },
  { brand: "JNR", name: "Lira Glow", type: "Référence à confirmer" },
  { brand: "JNR", name: "Lucky Vibe", type: "Référence à confirmer" },
  { brand: "JNR", name: "Mega Box", type: "Référence à confirmer" },
  { brand: "JNR", name: "Mega Box Pro", type: "Référence à confirmer" },
  { brand: "JNR", name: "Meteorite", type: "Référence à confirmer" },
  { brand: "JNR", name: "Quads 4in1", type: "Référence à confirmer" },
  { brand: "JNR", name: "RageGorilla", type: "Référence à confirmer" },
  { brand: "JNR", name: "Shisha Classic", type: "Référence à confirmer" },
  { brand: "JNR", name: "Shisha Lightning", type: "Référence à confirmer" },
  { brand: "JNR", name: "Shisha Pro", type: "Référence à confirmer" },
  { brand: "JNR", name: "Shisha Storm", type: "Référence à confirmer" },
  { brand: "JNR", name: "Shisha Ultra", type: "Référence à confirmer" },
  { brand: "JNR", name: "ShishaSip", type: "Référence à confirmer" },
  { brand: "JNR", name: "Slim Bar", type: "Référence à confirmer" },
  { brand: "JNR", name: "Stellarc", type: "Référence à confirmer" },
  { brand: "JNR", name: "Tank Pro", type: "Pod / rechargeable" },
  { brand: "JNR", name: "Triple 3in1", type: "Référence à confirmer" },
  { brand: "JNR", name: "Whale", type: "Référence à confirmer" },

  // RAZZ BAR
  { brand: "RAZZ BAR", name: "RAZZ BAR 160K", type: "À vérifier" },
  { brand: "RAZZ BAR", name: "RAZZ BAR 120K", type: "À vérifier" },
  { brand: "RAZZ BAR", name: "RAZZ BAR 100K", type: "À vérifier" },
  { brand: "RAZZ BAR", name: "RAZZ BAR 60K", type: "À vérifier" },
  { brand: "RAZZ BAR", name: "RAZZ BAR 40K", type: "À vérifier" },

  // AL FAKHER
  { brand: "AL FAKHER", name: "Crown Bar 30K", type: "À vérifier" },
  { brand: "AL FAKHER", name: "Autres références", type: "Liste fournisseur à confirmer" }
];

const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const brandFilter = document.getElementById("brandFilter");
const resultsInfo = document.getElementById("resultsInfo");
const emptyState = document.getElementById("emptyState");
const menuButton = document.getElementById("menuBtn");
const navigation = document.getElementById("nav");

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function displayProducts() {
  if (!grid || !searchInput || !brandFilter) return;

  const query = searchInput.value.trim().toLowerCase();
  const selectedBrand = brandFilter.value;

  const filtered = products.filter(product => {
    const text = `${product.brand} ${product.name} ${product.type}`
      .toLowerCase();

    const matchesSearch = text.includes(query);
    const matchesBrand =
      selectedBrand === "all" || product.brand === selectedBrand;

    return matchesSearch && matchesBrand;
  });

  grid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-visual" aria-hidden="true">
        <span class="brand-label">${escapeHTML(product.brand)}</span>
        <div class="product-shape"></div>
      </div>

      <div class="product-info">
        <span class="product-type">${escapeHTML(product.brand)}</span>
        <h3>${escapeHTML(product.name)}</h3>
        <p>${escapeHTML(product.type)}</p>
        <span class="product-status">Disponibilité à confirmer</span>
      </div>
    </article>
  `).join("");

  if (resultsInfo) {
    resultsInfo.textContent =
      `${filtered.length} référence(s) affichée(s) sur ${products.length}.`;
  }

  if (emptyState) {
    emptyState.hidden = filtered.length !== 0;
  }
}

if (searchInput) {
  searchInput.addEventListener("input", displayProducts);
}

if (brandFilter) {
  brandFilter.addEventListener("change", displayProducts);
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const opened = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(opened));
  });

  navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

displayProducts();
