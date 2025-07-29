const products = [
  {
    id: 1,
    title: "iPhone 14",
    price: "₹79,999",
    desc: "Apple iPhone 14 with A15 Bionic chip and dual-camera system.",
    img: "https://via.placeholder.com/200x150?text=iPhone+14"
  },
  {
    id: 2,
    title: "Samsung Galaxy S22",
    price: "₹69,999",
    desc: "Samsung flagship with dynamic AMOLED display and pro-grade camera.",
    img: "https://via.placeholder.com/200x150?text=Galaxy+S22"
  },
  {
    id: 3,
    title: "OnePlus 11",
    price: "₹56,999",
    desc: "Snapdragon 8 Gen 2, 120Hz AMOLED, Hasselblad camera.",
    img: "https://via.placeholder.com/200x150?text=OnePlus+11"
  },
  {
    id: 4,
    title: "Redmi Note 12",
    price: "₹17,999",
    desc: "Value-packed phone with AMOLED display and 5000mAh battery.",
    img: "https://via.placeholder.com/200x150?text=Redmi+Note+12"
  }
];

let cart = [];

window.onload = () => {
  const list = document.getElementById("product-list");
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
      <button onclick="buyNow(${p.id})">Buy Now</button>
    `;
    list.appendChild(card);
  });

  document.getElementById("checkout-form").addEventListener("submit", function(e) {
    e.preventDefault();
    document.getElementById("confirmation").classList.remove("hidden");
    setTimeout(() => {
      resetAll();
    }, 3000);
  });
};

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  document.getElementById("cart-count").textContent = `Cart: ${cart.length} items`;
}

function buyNow(id) {
  const p = products.find(prod => prod.id === id);
  document.getElementById("detail-title").textContent = p.title;
  document.getElementById("detail-img").src = p.img;
  document.getElementById("detail-desc").textContent = p.desc;
  document.getElementById("detail-price").textContent = p.price;

  showSection("product-detail");
}

function showCheckout() {
  showSection("checkout");
}

function goBack() {
  showSection("product-list");
}

function showSection(id) {
  ["product-list", "product-detail", "checkout"].forEach(sec => {
    document.getElementById(sec).classList.add("hidden");
  });
  document.getElementById(id).classList.remove("hidden");
}

function resetAll() {
  cart = [];
  document.getElementById("cart-count").textContent = `Cart: 0 items`;
  showSection("product-list");
  document.getElementById("confirmation").classList.add("hidden");
}
