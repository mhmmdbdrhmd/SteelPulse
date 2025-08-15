let products = [];
let currentLang = 'en';
let chart;

const translations = {
  en: {
    title: 'SteelPulse Prices',
    product: 'Product',
    price: 'Price (USD/ton)',
    lastUpdated: 'Last Updated',
    chartTitle: 'Price History'
  },
  fa: {
    title: 'قیمت‌های استیل‌پالس',
    product: 'محصول',
    price: 'قیمت (دلار/تن)',
    lastUpdated: 'آخرین بروزرسانی',
    chartTitle: 'تاریخچه قیمت'
  }
};

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang === 'en' ? 'en' : 'fa';
  document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
  document.getElementById('header-title').textContent = translations[lang].title;
  document.getElementById('title').textContent = translations[lang].title;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = translations[lang][key];
  });
  renderTable();
  if (products.length > 0) {
    drawChart(products[0]);
  }
}

function renderTable() {
  const tbody = document.querySelector('#product-table tbody');
  tbody.innerHTML = '';
  products.forEach(p => {
    const tr = document.createElement('tr');
    const name = currentLang === 'en' ? p.name_en : p.name_fa;
    const date = new Date(p.last_updated);
    const formattedDate = date.toLocaleDateString(currentLang === 'en' ? 'en-US' : 'fa-IR');
    tr.innerHTML = `<td>${name}</td><td>${p.price}</td><td>${formattedDate}</td>`;
    tr.addEventListener('click', () => drawChart(p));
    tbody.appendChild(tr);
  });
}

function drawChart(product) {
  const ctx = document.getElementById('price-chart').getContext('2d');
  const labels = product.history.map(h => h.date);
  const data = product.history.map(h => h.price);
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: currentLang === 'en' ? product.name_en : product.name_fa,
        data,
        borderColor: '#0074D9',
        fill: false
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: translations[currentLang].chartTitle
        }
      }
    }
  });
}

fetch('data/products.json')
  .then(r => r.json())
  .then(data => {
    products = data;
    renderTable();
    drawChart(products[0]);
  });

document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
document.getElementById('lang-fa').addEventListener('click', () => setLanguage('fa'));

document.addEventListener('DOMContentLoaded', () => setLanguage(currentLang));
