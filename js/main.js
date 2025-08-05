document.addEventListener('DOMContentLoaded', () => {
  const skills = [
    { name: 'Java & Spring Boot', level: 90 },
    { name: 'JavaScript & React', level: 85 },
    { name: 'AWS & Cloud', level: 80 },
    { name: 'Salesforce', level: 75 },
  ];

  const projects = [
    {
      title: 'Project One',
      desc: 'A data-driven dashboard built with React & AWS Lambda.',
      github: 'https://github.com/your-username/project-one',
      demo: 'https://demo-one.netlify.app'
    },
    {
      title: 'Project Two',
      desc: 'Microservices app using Spring Boot & Docker.',
      github: 'https://github.com/your-username/project-two',
      demo: 'https://demo-two.vercel.app'
    },
    {
      title: 'Project Three',
      desc: 'Salesforce integration for automated lead routing.',
      github: 'https://github.com/your-username/project-three',
      demo: 'https://project-three.pages.dev'
    }
  ];

  // Render skills
  const skGrid = document.getElementById('skills-grid');
  skills.forEach(s => {
    const el = document.createElement('div');
    el.className = 'skill fade-in';
    el.innerHTML = `
      <h3>${s.name}</h3>
      <div class="bar"><div class="fill" style="--width:${s.level}%"></div></div>
    `;
    skGrid.appendChild(el);
    // animate width after slight delay
    setTimeout(() => {
      el.querySelector('.fill').style.width = s.level + '%';
    }, 200);
  });

  // Render projects
  const pjGrid = document.getElementById('projects-grid');
  projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card fade-in';
    card.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <p><a href="${p.github}" target="_blank">GitHub</a> | <a href="${p.demo}" target="_blank">Demo</a></p>
    `;
    pjGrid.appendChild(card);
  });

  // Mobile nav toggle
  document.querySelector('.hamburger').onclick = () =>
    document.querySelector('.nav-links').classList.toggle('open');

  // Scroll-reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('reveal');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 80;
      if (pageYOffset >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  });
});


