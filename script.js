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


// Galeria horizontal automática de avaliações da home.
document.querySelectorAll('[data-review-carousel]').forEach(carousel => {
  const slides=[...carousel.querySelectorAll('[data-review-slide]')];
  const prev=carousel.querySelector('.review-arrow.prev');
  const next=carousel.querySelector('.review-arrow.next');
  if(!slides.length) return;
  let current=0, timer;
  function cardStep(){ return slides[0].getBoundingClientRect().width + 16; }
  function go(i){ current=(i+slides.length)%slides.length; carousel.scrollTo({left:current*cardStep(),behavior:'smooth'}); }
  prev?.addEventListener('click',()=>{go(current-1); restart();});
  next?.addEventListener('click',()=>{go(current+1); restart();});
  function start(){ timer=setInterval(()=>go(current+1),4500); }
  function restart(){ clearInterval(timer); start(); }
  carousel.addEventListener('mouseenter',()=>clearInterval(timer));
  carousel.addEventListener('mouseleave',start);
  start();
});
