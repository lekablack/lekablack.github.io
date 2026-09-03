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


// Carrossel automático de avaliações da home.
document.querySelectorAll('[data-review-carousel]').forEach(carousel => {
  const slides=[...carousel.querySelectorAll('[data-review-slide]')];
  const dotsWrap=carousel.querySelector('.review-dots');
  if(slides.length<2) return;
  let current=0, timer;
  const dots=slides.map((_,i)=>{const b=document.createElement('button');b.className='review-dot'+(i===0?' active':'');b.type='button';b.setAttribute('aria-label',`Mostrar avaliação ${i+1}`);b.addEventListener('click',()=>show(i,true));dotsWrap.appendChild(b);return b;});
  function show(i,restart=false){slides[current].classList.remove('active');dots[current].classList.remove('active');current=i;slides[current].classList.add('active');dots[current].classList.add('active');if(restart){clearInterval(timer);start();}}
  function start(){timer=setInterval(()=>show((current+1)%slides.length),5200)}
  carousel.addEventListener('mouseenter',()=>clearInterval(timer));carousel.addEventListener('mouseleave',start);start();
});
