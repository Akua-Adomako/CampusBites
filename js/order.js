// Retrieve cart details from localStorage
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let totalPrice = localStorage.getItem("totalPrice") || 0;

// Display cart items and total price
const cartItemsDisplay = document.getElementById("cartItemsDisplay");
const totalPriceDisplay = document.getElementById("totalPriceDisplay");

// Check if cart is empty or price is 0 before allowing submission
if (cartItems.length === 0 || totalPrice == 0) {
  alert(
    "Your cart is empty or the total price is invalid. Please add items to your cart."
  );
  // Optionally, disable the form submission button if necessary
  document.querySelector("button.submit-btn").disabled = true;
} else {
  // Show cart items and total price if available
  cartItemsDisplay.innerHTML = cartItems
    .map(
      (item) => `
    <p>${item.name} - $${item.price}</p>
  `
    )
    .join("");
  totalPriceDisplay.innerHTML = `<h3>Total Price: $${totalPrice}</h3>`;
}

// Form submission event for collecting buyer information
document.getElementById("buyerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Collect buyer's details
  const buyerName = document.getElementById("name").value;
  const buyerPhone = document.getElementById("phone").value;
  const buyerAddress = document.getElementById("address").value;

  // Validate that the fields are filled before submitting
  if (!buyerName || !buyerPhone || !buyerAddress) {
    alert("Please fill in all fields.");
    return; // Stop form submission if fields are incomplete
  }

  // You can now handle the form submission by sending this data to a server
  alert(`Order submitted for ${buyerName}!`);

  // Redirect to order-success.html after successful submission
  window.location.href = "order-success.html";

  // Clear localStorage (cart and total price) after successful submission
  localStorage.removeItem("cartItems");
  localStorage.removeItem("totalPrice");
});
