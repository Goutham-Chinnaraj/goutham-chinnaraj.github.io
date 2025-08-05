document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    // Toggle mobile navigation
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile nav when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('main section');
    const navLi = document.querySelectorAll('.nav-links li a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 75) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') == '#' + current) {
                a.classList.add('active');
            }
        });
    });

    // Intersection Observer for animations
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animate skill bars when the 'about' section is visible
                if (entry.target.id === 'about') {
                    const skillFills = entry.target.querySelectorAll('.skill-fill');
                    skillFills.forEach(fill => {
                        const level = fill.getAttribute('data-level');
                        fill.style.width = level + '%';
                    });
                }
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});

