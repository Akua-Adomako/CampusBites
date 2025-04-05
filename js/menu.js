const menuGrid = document.getElementById("menuGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");
const cartList = document.getElementById("cartList"); // The section to display cart items
const totalPrice = document.getElementById("totalPrice"); // To display total price
const checkoutButton = document.getElementById("checkoutButton"); // Button to initiate checkout

let currentCategory = "All"; // Default
let currentSearch = ""; // Default
let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from localStorage or start fresh

// Function to update the cart display
function updateCart() {
  cartList.innerHTML = ""; // Clear the existing cart content
  let total = 0;

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
      <span>GHS ${item.price * item.quantity}</span>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;
    cartList.appendChild(cartItem);
    total += item.price * item.quantity;
  });

  totalPrice.textContent = `Total: GHS ${total}`;

  // Save the cart to localStorage after every update
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to add a meal to the cart
function addToCart(meal) {
  const existingMeal = cart.find((item) => item.name === meal.name);

  if (existingMeal) {
    existingMeal.quantity += 1; // Increase quantity if already in the cart
  } else {
    cart.push({
      name: meal.name,
      price: meal.price,
      quantity: 1,
    });
  }

  updateCart();
}

// Function to remove a meal from the cart
function removeFromCart(index) {
  cart.splice(index, 1); // Remove the item at the given index
  updateCart();
}

// Function to render meals (with "Add to Cart" button)
function renderMeals(filteredMeals) {
  menuGrid.innerHTML = "";

  if (filteredMeals.length === 0) {
    menuGrid.innerHTML = "<p>No meals found.</p>";
    return;
  }

  filteredMeals.forEach((meal) => {
    const card = document.createElement("div");
    card.className = "menu-card";
    card.innerHTML = `
      <img src="${meal.image}" alt="${meal.name}" class="menu-img">
      <div class="menu-info">
        <h3 class="menu-name">${meal.name}</h3>
        <p class="menu-desc">${meal.desc}</p>
        <span class="menu-price">GHS ${meal.price}</span>
        <button class="add-to-cart-btn" data-name="${meal.name}" data-price="${meal.price}">Add to Cart</button>
      </div>
    `;

    // Attach event listener to the "Add to Cart" button
    const addToCartBtn = card.querySelector(".add-to-cart-btn");
    addToCartBtn.addEventListener("click", () => addToCart(meal));

    menuGrid.appendChild(card);
  });
}

// Function to apply filters (category + search)
function applyFilters() {
  let filtered = meals;

  if (currentCategory !== "All") {
    filtered = filtered.filter((meal) => meal.category === currentCategory);
  }

  if (currentSearch.trim() !== "") {
    filtered = filtered.filter(
      (meal) =>
        meal.name.toLowerCase().includes(currentSearch) ||
        meal.desc.toLowerCase().includes(currentSearch)
    );
  }

  renderMeals(filtered);
}

// Function to initiate checkout process
function checkout() {
  if (cart.length === 0) {
    alert(
      "Your cart is empty. Please add items to your cart before checking out."
    );
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartSummary = cart
    .map(
      (item) =>
        `${item.name} (x${item.quantity}) - GHS ${item.price * item.quantity}`
    )
    .join("\n");

  const orderDetails = `
    Order Summary:
    -------------------
    ${cartSummary}

    Total: GHS ${total}

    Proceeding to checkout...
  `;

  // Simulate the checkout process
  alert(orderDetails);

  // Save cart details to localStorage for use on order.html
  localStorage.setItem("cartItems", JSON.stringify(cart));
  localStorage.setItem("totalPrice", total);

  // Clear the cart after checkout
  cart = [];
  updateCart();

  // Optionally, clear the cart from localStorage after checkout
  localStorage.removeItem("cart");

  // Redirect to order.html page
  window.location.href = "order.html";
}

// Initial render (show all meals)
applyFilters();

// Category filter
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    currentCategory = button.getAttribute("data-category");
    applyFilters();
  });
});

// Search input filter
searchInput.addEventListener("input", () => {
  currentSearch = searchInput.value.toLowerCase();
  applyFilters();
});

// Handle cart item removal
cartList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const index = e.target.getAttribute("data-index");
    removeFromCart(index);
  }
});

// Handle checkout button click
checkoutButton.addEventListener("click", checkout);

// Update cart when page loads (if cart exists in localStorage)
updateCart();
