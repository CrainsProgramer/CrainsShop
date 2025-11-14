function toggleMenu() {
  const nav = document.getElementById('main-nav');
  nav.classList.toggle('active');
}

// ====== KERANJANG ======
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(name, price) {
  let cart = getCart();
  const item = cart.find(i => i.name === name);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  saveCart(cart);
  alert(`${name} telah ditambahkan ke keranjang!`);
}

function loadCart() {
  const container = document.getElementById('cart-items');
  if (!container) return;

  const cart = getCart();
  container.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <span>${item.name} (x${item.qty})</span>
      <strong>Rp ${item.price.toLocaleString()}</strong>
      <button onclick="removeItem(${index})">❌</button>
    `;
    container.appendChild(div);
  });

  document.getElementById('total-price').textContent = `Rp ${total.toLocaleString()}`;
}

function removeItem(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  loadCart();
}

function checkout() {
  const cart = getCart();
  if (cart.length === 0) {
    alert('Keranjang Anda kosong!');
    return;
  }
  alert('Terima kasih! Pesanan Anda sedang diproses.');
  localStorage.removeItem('cart');
  window.location.href = 'index.html';
}

window.onload = loadCart;
