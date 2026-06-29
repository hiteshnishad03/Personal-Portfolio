
// smooth scroll + active dot tracking
  const sections = document.querySelectorAll('main section');
  const dots = document.querySelectorAll('.rail-dot');
  const mobileJump = document.getElementById('mobileJump');
 
  function goTo(id){
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth'});
  }
 
  dots.forEach(dot=>{
    dot.addEventListener('click', ()=> goTo(dot.dataset.target));
  });
  mobileJump.addEventListener('change', (e)=> goTo(e.target.value));
 
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const id = entry.target.id;
        dots.forEach(d=> d.classList.toggle('active', d.dataset.target === id));
        const opt = mobileJump.querySelector(`option[value="${id}"]`);
        if(opt) mobileJump.value = id;
      }
    });
  }, {rootMargin:'-40% 0px -50% 0px'});
  sections.forEach(s=> obs.observe(s));
 
  // reveal-on-scroll
  document.querySelectorAll('.svc-card, .proj-card, .testi-card, .stat-card, .skill-pill').forEach(el=>{
    el.classList.add('reveal');
  });
  const revealObs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        revealObs.unobserve(entry.target);
      }
    });
  }, {threshold:0.1});
  document.querySelectorAll('.reveal').forEach(el=> revealObs.observe(el));
 