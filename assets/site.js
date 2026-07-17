/* emmyhai.com — shared site behavior: mobile menu + reveal-on-scroll */
(function(){
  // Mobile menu toggle
  var burger = document.querySelector('.site-burger');
  var menu = document.querySelector('.site-menu');
  if(burger && menu){
    burger.addEventListener('click', function(){
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded','false');
      });
    });
  }

  // Reveal-on-scroll (eager + failsafe: nothing stays hidden)
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.querySelectorAll('.reveal').forEach(function(e){e.classList.add('in');});
    return;
  }
  var els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){
    els.forEach(function(e){e.classList.add('in');});
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
    });
  },{threshold:0, rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(e){io.observe(e);});
  // failsafe: reveal everything after 1.4s no matter what
  setTimeout(function(){ els.forEach(function(e){e.classList.add('in');}); }, 1400);
  // on-load pass
  window.addEventListener('load', function(){
    els.forEach(function(e){
      var r = e.getBoundingClientRect();
      if(r.top < window.innerHeight){ e.classList.add('in'); }
    });
  });
})();
