

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navList = document.querySelector('.main-nav ul');
  const portrait = document.getElementById('portrait');
  const gallery = document.getElementById('miniGallery');
  const bookNow = document.getElementById('bookNow');
  const viewPortfolio = document.getElementById('viewPortfolio');
  const bookBtn = document.getElementById('bookBtn');
  const contactForm = document.getElementById('contactForm');
  const bookTrial = document.getElementById('bookTrial');

  // Mobile nav toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      if (!expanded) {
        navList.style.display = 'flex';
        navList.style.flexDirection = 'column';
        navList.style.position = 'absolute';
        navList.style.right = '18px';
        navList.style.top = '64px';
        navList.style.background = 'rgba(255,255,255,0.02)';
        navList.style.padding = '10px';
        navList.style.borderRadius = '12px';
      } else {
        navList.style.display = 'none';
      }
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.main-nav a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 980) {
        navList.style.display = 'none';
        hamburger && hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Initialize portrait from first gallery image
  (function initPortrait(){
    const first = gallery && gallery.querySelector('img');
    const src = first ? (first.dataset.src || first.src) : '';
    if (portrait && src) {
      portrait.style.backgroundImage = `url('${src}')`;
      portrait.style.backgroundSize = 'cover';
      portrait.style.backgroundPosition = 'center';
    }
  })();

  // Gallery swap with a small animation
  gallery && gallery.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if (!img) return;
    const src = img.dataset.src || img.src;
    portrait.style.transition = 'transform 260ms ease, opacity 260ms ease';
    portrait.style.transform = 'scale(0.98)';
    portrait.style.opacity = '0.8';
    setTimeout(()=> {
      portrait.style.backgroundImage = `url('${src}')`;
      portrait.style.transform = 'scale(1)';
      portrait.style.opacity = '1';
    }, 160);
  });

  // CTA scroll behaviours
  viewPortfolio && viewPortfolio.addEventListener('click', () => document.getElementById('work').scrollIntoView({behavior:'smooth'}));
  bookNow && bookNow.addEventListener('click', () => document.getElementById('contact').scrollIntoView({behavior:'smooth'}));
  bookBtn && bookBtn.addEventListener('click', () => document.getElementById('contact').scrollIntoView({behavior:'smooth'}));

  // Contact form mock handler
  window.handleSubmit = function(e){
    e.preventDefault();
    const f = e.target;
    const name = f.name.value.trim();
    const email = f.email.value.trim();
    const message = f.message.value.trim();
    if (!name || !email || !message) {
      alert('Please complete all required fields.');
      return false;
    }
    alert(`Thanks ${name}! I will get back to you soon. (Demo form)`);
    f.reset();
    return false;
  };

  // Book trial button
  bookTrial && bookTrial.addEventListener('click', () => {
    alert('Please send a short message with preferred date/time for trial. I will confirm availability.');
    document.getElementById('contact').scrollIntoView({behavior:'smooth'});
  });

  // Scrollspy for nav highlight
  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.main-nav a')];

  function onScrollSpy(){
    const y = window.scrollY + 120;
    sections.forEach(sec => {
      if (!sec.id) return;
      if (sec.offsetTop <= y && sec.offsetTop + sec.offsetHeight > y) {
        navLinks.forEach(a=>a.classList.remove('active'));
        const match = navLinks.find(a=>a.getAttribute('href') === ('#' + sec.id));
        match && match.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', onScrollSpy);
  onScrollSpy();

  // Small project cards entrance animation
  document.querySelectorAll('.project-card').forEach((el,i)=>{
    el.style.transform = 'translateY(14px)';
    el.style.opacity = '0';
    setTimeout(()=> {
      el.style.transition = 'all 600ms cubic-bezier(.2,.9,.2,1)';
      el.style.transform = 'none';
      el.style.opacity = '1';
    }, 120 * i);
  });
});
