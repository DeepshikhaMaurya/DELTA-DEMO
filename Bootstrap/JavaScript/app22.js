let products = [
  { name: "Shirt", price: 500 },
  { name: "Shoes", price: 1500 },
  { name: "Watch", price: 1000 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Show products
function displayProducts() {
  let container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach((p, index) => {
    container.innerHTML += `
      <div class="card">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${index})">Add to Cart</button>
      </div>
    `;
  });
}

// Add to cart
function addToCart(index) {
  let product = products[index];

  let found = cart.find(item => item.name === product.name);

  if (found) {
    found.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  displayCart();
}

// Display cart
function displayCart() {
  let cartList = document.getElementById("cart");
  let total = 0;

  cartList.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    cartList.innerHTML += `
      <li>
        ${item.name} - ₹${item.price} × ${item.qty}
        <button onclick="changeQty(${index}, 1)">+</button>
        <button onclick="changeQty(${index}, -1)">-</button>
        <button onclick="removeItem(${index})">❌</button>
      </li>
    `;
  });

  document.getElementById("total").innerText = total;
}

// Change quantity
function changeQty(index, change) {
  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
  displayCart();
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
}

// Save to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Load on start
displayProducts();
displayCart();