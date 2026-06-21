// =========================================================
// Scroll progress bar
// =========================================================
const progressBar = document.getElementById('progress-bar');

function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
}

// =========================================================
// Scroll-reveal sections
// =========================================================
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// =========================================================
// Active nav-link highlighting
// (accounts for the fixed navbar height so the highlight
//  switches right as a section reaches the top, not 200px early)
// =========================================================
const sections = document.querySelectorAll('section, #home');
const navLinks = document.querySelectorAll('#nav a');
const navbar = document.getElementById('h');

function getNavbarHeight() {
    return navbar ? navbar.offsetHeight : 80;
}

function updateActiveNav() {
    const offset = getNavbarHeight() + 20;
    let current = sections[0] ? sections[0].id : '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - offset;
        if (window.scrollY >= sectionTop) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', () => {
    updateProgressBar();
    updateActiveNav();
});

// Run once on load so the correct link is highlighted before any scrolling
window.addEventListener('load', () => {
    updateProgressBar();
    updateActiveNav();
});

// =========================================================
// Mobile nav toggle
// =========================================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
    });
});

// Close mobile menu if user taps/clicks outside of it
document.addEventListener('click', (e) => {
    const isClickInsideNav = navMenu.contains(e.target);
    const isClickOnHamburger = hamburger.contains(e.target);
    if (!isClickInsideNav && !isClickOnHamburger) {
        navMenu.classList.remove('open');
    }
});

// =========================================================
// Contact form — opens visitor's email client with a
// pre-filled message (no backend required)
// =========================================================
const contactForm = document.getElementById('cbox');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = contactForm.elements['Name'].value.trim();
        const email = contactForm.elements['Email'].value.trim();
        const message = contactForm.elements['Message'].value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        const subject = `Portfolio Contact from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

        const mailtoLink = `mailto:hariharan77902@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;

        alert('Thank you for your message! Your email app will now open so you can send it.');
        contactForm.reset();
    });
}

// =========================================================
// Tilt-on-hover effect for project image
// Skipped on touch devices since there's no real mouse to
// drive the tilt — prevents a "stuck" rotated state on
// phones/tablets after a tap.
// =========================================================
const p1Wrap = document.getElementById('p1ImgWrap');
const p1Img = document.getElementById('p1img');
const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (p1Wrap && p1Img && supportsHover) {
    p1Wrap.addEventListener('mousemove', (e) => {
        const rect = p1Wrap.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        p1Img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        p1Img.style.boxShadow = '0 0 40px rgba(0,255,255,0.45)';
    });

    p1Wrap.addEventListener('mouseleave', () => {
        p1Img.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        p1Img.style.boxShadow = '0 0 30px rgba(0,255,255,0.3)';
    });
}
