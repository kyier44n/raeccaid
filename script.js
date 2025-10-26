document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    if (link.getAttribute('href').startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


let cart = [];
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const total = document.getElementById('total');

document.querySelectorAll('.add-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.dataset.name;
    const price = parseInt(btn.dataset.price);
    cart.push({ name, price });
    updateCart();
  });
});

function updateCart() {
  cartItems.innerHTML = "";
  let sum = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - Rp ${item.price.toLocaleString()}`;
    cartItems.appendChild(li);
    sum += item.price;
  });
  total.textContent = `Total: Rp ${sum.toLocaleString()}`;
  cartCount.textContent = cart.length;
}


document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  const message = cart.map(item => `• ${item.name} - Rp ${item.price.toLocaleString()}`).join("%0A");
  const totalHarga = cart.reduce((acc, item) => acc + item.price, 0);
  const url = `https://wa.me/6281234567890?text=Halo%20Raecca!%0ASaya%20ingin%20memesan:%0A${message}%0A%0ATotal:%20Rp%20${totalHarga.toLocaleString()}`;
  window.open(url, "_blank");
});
