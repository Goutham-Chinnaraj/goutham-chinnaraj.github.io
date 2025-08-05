document.addEventListener('DOMContentLoaded', function () {

    // --- 1. INJECT DYNAMIC STYLES ---
    // This injects the necessary CSS for the new features directly into the page.
    // This makes the entire solution self-contained within this single JS file.
    const style = document.createElement('style');
    style.innerHTML = `
        /* Hide the default browser cursor */
        body {
            cursor: none;
        }

        /* Custom Cursor Styles */
        .cursor-dot,
        .cursor-outline {
            pointer-events: none;
            position: fixed;
            top: 0;
            left: 0;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            z-index: 9999;
            opacity: 0; /* Hidden by default */
            transition: opacity 0.3s ease-in-out, transform 0.2s ease-in-out;
        }

        /* Show custom cursor when mouse is over the body */
        body:hover .cursor-dot,
        body:hover .cursor-outline {
            opacity: 1;
        }

        .cursor-dot {
            width: 8px;
            height: 8px;
            background-color: var(--teal);
        }

        .cursor-outline {
            width: 40px;
            height: 40px;
            border: 2px solid var(--teal);
            transition: transform 0.3s ease-out, border-color 0.3s ease-out, width 0.3s ease-out, height 0.3s ease-out;
        }
    `;
    document.head.appendChild(style);


    // --- 2. DYNAMIC CURSOR ---
    // Create the cursor elements and add them to the page
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursorOutline);

    // Listen for mouse movement to position the custom cursor
    window.addEventListener('mousemove', function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Animate the outline for a smooth "follow" effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    });

    // Add hover effects for all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .hamburger');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            // Enlarge the cursor outline on hover
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.borderColor = 'var(--sky)';
        });
        el.addEventListener('mouseleave', () => {
            // Return to default state
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.borderColor = 'var(--teal)';
        });
    });


    // --- 3. MOBILE NAVIGATION ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });


    // --- 4. ACTIVE LINK HIGHLIGHTING ON SCROLL ---
    const sections = document.querySelectorAll('main section');
    const navLi = document.querySelectorAll('.nav-links li a');
    window.addEventListener('scroll', () => {
        let current = 'home';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === '#' + current) {
                a.classList.add('active');
            }
        });
    });


    // --- 5. ADVANCED SCROLL-TRIGGERED ANIMATIONS ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Animate skill bars with a staggered delay when they become visible
                if (entry.target.id === 'about') {
                    const skillFills = entry.target.querySelectorAll('.skill-fill');
                    skillFills.forEach((fill, index) => {
                        setTimeout(() => {
                            const level = fill.getAttribute('data-level');
                            fill.style.width = level + '%';
                        }, index * 150); // Each bar animates 150ms after the previous one
                    });
                }
                // Stop observing the element once it has been revealed to save resources
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Start animation slightly before it's fully in view
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});



