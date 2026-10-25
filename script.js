
"use strict";

const products = [
  {
    brand: "JNR",
    name: "Présentation de JNR",
    description:
      "Présentation générale de la marque. Les références, compositions et caractéristiques doivent être confirmées auprès du fabricant."
  },
  {
    brand: "Razzbar",
    name: "Présentation de Razzbar",
    description:
      "Présentation générale de la marque. Consulte les informations officielles pour vérifier les caractéristiques des produits."
  },
  {
    brand: "Al Fakher",
    name: "Présentation d'Al Fakher",
    description:
      "Présentation générale de la marque. Les informations relatives aux produits doivent être vérifiées auprès de sources fiables."
  }
];

const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("search");
const emptyMessage = document.getElementById("empty");
const filterButtons = document.querySelectorAll(".filter");

let activeBrand = "Tous";

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();

  const filteredProducts = products.filter(product => {
    const matchesBrand =
      activeBrand === "Tous" || product.brand === activeBrand;

    const searchableText =
      `${product.brand} ${product.name} ${product.description}`
        .toLowerCase();

    return matchesBrand && searchableText.includes(query);
  });

  productsContainer.replaceChildren();

  filteredProducts.forEach(product => {
    const card = document.createElement("article");
    card.className = "product";

    const badge = document.createElement("span");
    badge.className = "product-brand";
    badge.textContent = product.brand;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const description = document.createElement("p");
    description.textContent = product.description;

    card.append(badge, title, description);
    productsContainer.appendChild(card);
  });

  emptyMessage.hidden = filteredProducts.length > 0;
}

filterButtons.forEach(button => {
  button.setAttribute(
    "aria-pressed",
    String(button.dataset.brand === activeBrand)
  );

  button.addEventListener("click", () => {
    activeBrand = button.dataset.brand;

    filterButtons.forEach(item => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    renderProducts();
  });
});

searchInput.addEventListener("input", renderProducts);

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const ageGate = document.getElementById("ageGate");

document.getElementById("ageYes").addEventListener("click", () => {
  ageGate.hidden = true;
});

document.getElementById("ageNo").addEventListener("click", () => {
  document.body.replaceChildren();

  const message = document.createElement("p");
  message.textContent =
    "L'accès à cette présentation est réservé aux adultes.";

  message.style.cssText =
    "font:18px Arial;text-align:center;margin:60px 20px";

  document.body.appendChild(message);
});

document.getElementById("year").textContent =
  String(new Date().getFullYear());

renderProducts();
