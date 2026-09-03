const menuBtn = document.querySelector('.menu-btn');
const homeHeader = document.querySelector('.header-inner');
const internalNav = document.querySelector('.nav');
menuBtn?.addEventListener('click', () => {
  if (homeHeader) {
    const open = homeHeader.classList.toggle('menu-open');
    menuBtn.setAttribute('aria-expanded', String(open));
  } else if (internalNav) {
    internalNav.classList.toggle('open');
  }
});
document.querySelectorAll('.main-nav a, .navlinks a').forEach(a => a.addEventListener('click',()=>{
  homeHeader?.classList.remove('menu-open');
  internalNav?.classList.remove('open');
  menuBtn?.setAttribute('aria-expanded','false');
}));
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



// Carrossel automático de avaliações — um card por vez.
document.querySelectorAll('[data-review-carousel]').forEach(carousel => {
  const slides = Array.from(carousel.querySelectorAll('[data-review-slide]'));
  const prev = carousel.querySelector('.review-arrow.prev');
  const next = carousel.querySelector('.review-arrow.next');
  if (!slides.length) return;
  let current = Math.max(0, slides.findIndex(s => s.classList.contains('active')));
  let timer;
  function show(index) {
    const old = slides[current];
    const target = (index + slides.length) % slides.length;
    if (target === current) return;
    old.classList.add('is-leaving');
    old.classList.remove('active');
    current = target;
    slides[current].classList.remove('is-leaving');
    slides[current].classList.add('active');
    window.setTimeout(() => old.classList.remove('is-leaving'), 600);
  }
  function start(){ window.clearInterval(timer); timer=window.setInterval(()=>show(current+1),5000); }
  prev?.addEventListener('click', e=>{e.preventDefault();show(current-1);start();});
  next?.addEventListener('click', e=>{e.preventDefault();show(current+1);start();});
  carousel.addEventListener('mouseenter',()=>window.clearInterval(timer));
  carousel.addEventListener('mouseleave',start);
  carousel.addEventListener('focusin',()=>window.clearInterval(timer));
  carousel.addEventListener('focusout',start);
  slides.forEach((slide,i)=>slide.classList.toggle('active',i===current));
  start();
});
