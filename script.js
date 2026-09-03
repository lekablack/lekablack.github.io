const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
menuBtn?.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.navlinks a').forEach(a => a.addEventListener('click',()=>nav.classList.remove('open')));
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

// Estrutura pronta para analytics/TikTok Pixel.
// Quando o Pixel estiver instalado, este helper poderá disparar ttq.track(...).
function trackBookEvent(eventName, bookSlug, destination='') {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event:eventName, book:bookSlug, destination });
  if (window.ttq && typeof window.ttq.track === 'function') {
    window.ttq.track(eventName, { content_name:bookSlug, destination_url:destination });
  }
}
document.querySelectorAll('[data-book-view]').forEach(el => {
  trackBookEvent('ViewContent', el.dataset.bookView, location.href);
});
document.querySelectorAll('[data-amazon]').forEach(a => {
  a.addEventListener('click', () => trackBookEvent('ClickAmazon', a.dataset.amazon, a.href));
});
document.querySelectorAll('[data-book-link]').forEach(a => {
  a.addEventListener('click', () => trackBookEvent('ClickBook', a.dataset.bookLink, a.href));
});
