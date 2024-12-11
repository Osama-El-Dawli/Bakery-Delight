const products = [
  {
    name: "Chocolate Cake",
    description: "Rich and moist chocolate cake topped with creamy ganache.",
    image: "./imgs/choclate_cake.jpg",
  },
  {
    name: "Strawberry Tart",
    description: "Fresh strawberries on a buttery tart base with custard.",
    image: "./imgs/strawberry_tart.jpg",
  },
  {
    name: "Blueberry Muffin",
    description: "Soft muffins loaded with juicy blueberries.",
    image: "./imgs/blueberry_muffin.jpg",
  },
  {
    name: "Croissant",
    description: "Flaky and buttery croissants made fresh daily.",
    image: "./imgs/croissant.jpg",
  },
  {
    name: "Apple Pie",
    description: "Classic apple pie with a golden crust and cinnamon flavor.",
    image: "./imgs/apple_pie.jpg",
  },
  {
    name: "Cupcakes",
    description: "Colorful cupcakes with a variety of frosting flavors.",
    image: "./imgs/cupcakes.jpg",
  },
  {
    name: "Cheesecake",
    description: "Creamy cheesecake with a buttery biscuit base.",
    image: "./imgs/cheesecake.jpg",
  },
  {
    name: "Baguette",
    description: "Crispy and soft French baguette, perfect with any meal.",
    image: "./imgs/baguette.jpg",
  },
  {
    name: "Lemon Tart",
    description: "Tangy and sweet lemon tart with a crispy pastry shell.",
    image: "./imgs/lemon_tart.jpg",
  },
  {
    name: "Brownies",
    description:
      "Chewy brownies with rich chocolate flavor and chunks of chocolate.",
    image: "./imgs/brownies.jpg",
  },
];

let cart = [];

// Save and load cart from localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function loadCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

// Add product to cart with notification
function addToCart(product) {
  cart.push(product);
  saveCart();
  showPopup("Product added to cart!");
}

// Display popup notification
function showPopup(message) {
  const popup = document.getElementById("popup");
  popup.textContent = message;
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}

// Display products
function displayProducts() {
  const productsContainer = document.getElementById("products");
  if (!productsContainer) return;

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product");
    productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <div class="product-info">
              <h3>${product.name}</h3>
              <p>${product.description}</p>
              <button onclick='addToCart(${JSON.stringify(
                product
              )})'>Add to Cart</button>
          </div>
      `;
    productsContainer.appendChild(productCard);
  });
}

// Display cart items
function displayCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("product");
    cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="product-info">
              <h3>${item.name}</h3>
              <p>${item.description}</p>
              <button onclick="removeFromCart(${index})">Remove</button>
          </div>
      `;
    cartItemsContainer.appendChild(cartItem);
  });
}

// Remove product from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
  showPopup("Removed successfully");
}

// Confirm purchase
function confirmCart() {
  showPopup("Purchase confirmed! Thank you for shopping.");
  cart = [];
  saveCart();
  displayCart();
}

// Initialize
loadCart();
if (document.getElementById("products")) displayProducts();
if (document.getElementById("cart-items")) displayCart();
