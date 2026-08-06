const products = window.SASSY_PRODUCTS || [];
const money = value => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value);

function productCard(product) {
  const image = product.images[0];
  return `
    <article class="product-card" data-category="${product.category}">
      <a class="product-image-wrap" href="product.html?id=${encodeURIComponent(product.id)}" aria-label="View ${product.name}">
        ${product.badge ? `<span class="badge">${product.badge}</span>` : ''}
        <img class="product-image" src="${image}" alt="${product.name}" loading="lazy">
      </a>
      <div class="product-card-body">
        <p class="eyebrow">${product.category}</p>
        <h3><a href="product.html?id=${encodeURIComponent(product.id)}">${product.name}</a></h3>
        <p>${product.short}</p>
        <div class="product-card-footer">
          <strong>${money(product.price)}</strong>
          <button class="button button-small snipcart-add-item"
            data-item-id="${product.id}"
            data-item-price="${product.price.toFixed(2)}"
            data-item-url="/products.html"
            data-item-description="${product.short.replace(/\"/g, '&quot;')}"
            data-item-image="/${image}"
            data-item-name="${product.name}">Add to cart</button>
        </div>
      </div>
    </article>`;
}

function renderProducts(selector, list) {
  const root = document.querySelector(selector);
  if (root) root.innerHTML = list.map(productCard).join('');
}

renderProducts('#featured-products', products.filter(p => p.featured).slice(0, 4));
renderProducts('#all-products', products);

const search = document.querySelector('#product-search');
const category = document.querySelector('#category-filter');
if (category) {
  const categories = [...new Set(
    products
      .map(product => product.category)
      .filter(Boolean)
  )].sort();

  category.innerHTML = `
    <option value="all">All categories</option>
    ${categories
      .map(categoryName => `
        <option value="${categoryName}">${categoryName}</option>
      `)
      .join('')}
  `;
}
function applyFilters() {
  const q = (search?.value || '').toLowerCase().trim();
  const cat = category?.value || 'all';
  const filtered = products.filter(p => {
    const matchesText = `${p.name} ${p.short} ${p.category}`.toLowerCase().includes(q);
    const matchesCategory = cat === 'all' || p.category === cat;
    return matchesText && matchesCategory;
  });
  renderProducts('#all-products', filtered);
  const count = document.querySelector('#product-count');
  if (count) count.textContent = `${filtered.length} product${filtered.length === 1 ? '' : 's'}`;
}
search?.addEventListener('input', applyFilters);
category?.addEventListener('change', applyFilters);
applyFilters();

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

function renderProductPage() {
  const root = document.querySelector('#product-detail');
  if (!root) return;
  const id = new URLSearchParams(location.search).get('id');
  const product = products.find(p => p.id === id) || products[0];
  if (!product) return;
  document.title = `${product.name} | Sassy Cow Creations`;
  root.innerHTML = `
    <div class="gallery">
      <img id="main-product-image" class="main-product-image" src="${product.images[0]}" alt="${product.name}">
      <div class="thumb-row">
        ${product.images.map((src, i) => `<button class="thumb ${i === 0 ? 'active' : ''}" data-src="${src}" aria-label="View image ${i + 1}"><img src="${src}" alt=""></button>`).join('')}
      </div>
    </div>
    <div class="product-info">
      <p class="eyebrow">${product.category}</p>
      <h1>${product.name}</h1>
      <p class="product-price">${money(product.price)}</p>
      <p class="lead">${product.description}</p>
      <ul class="tick-list"><li>Handmade with care</li><li>Unique small-batch design</li><li>UK-based seller</li></ul>
      <button class="button button-large snipcart-add-item"
        data-item-id="${product.id}"
        data-item-price="${product.price.toFixed(2)}"
        data-item-url="/products.html"
        data-item-description="${product.short.replace(/\"/g, '&quot;')}"
        data-item-image="/${product.images[0]}"
        data-item-name="${product.name}">Add to cart</button>
      <p class="small-note">Prices and product details are editable in <code>assets/js/products.js</code>.</p>
    </div>`;
  root.querySelectorAll('.thumb').forEach(button => button.addEventListener('click', () => {
    root.querySelector('#main-product-image').src = button.dataset.src;
    root.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    button.classList.add('active');
  }));
}
renderProductPage();

document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
