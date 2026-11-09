// 1. Mobile Hamburger Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// 2. Live Scroll Reveal Animation (IntersectionObserver)
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach(el => revealObserver.observe(el));

// 3. Scroll Progress Bar + Live Parallax Effect on Scroll & Mouse Move
const scrollProgress = document.getElementById('scroll-progress');
const parallaxOrbs = document.querySelectorAll('.neon-orb');
const heroParallax = document.getElementById('hero-parallax');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = `${scrollPercent}%`;

    // Move background Slytherin neon orbs at different speeds
    parallaxOrbs.forEach(orb => {
        const speed = parseFloat(orb.getAttribute('data-speed'));
        orb.style.transform = `translateY(${scrollTop * speed}px)`;
    });
});

// Subtle Mouse-Move Parallax on Hero Visual
document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 900 && heroParallax) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.015;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.015;
        heroParallax.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// 4. Portfolio Filter Tabs (6 Projects)
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// 5. Live Website Cost Estimator Logic
const projectType = document.getElementById('project-type');
const pageCount = document.getElementById('page-count');
const pageCountVal = document.getElementById('page-count-val');
const addonChecks = document.querySelectorAll('.addon-check');
const totalPriceEl = document.getElementById('total-price');
const sendEstimateBtn = document.getElementById('send-estimate-btn');

function calculateEstimate() {
    const basePrice = parseInt(projectType.value);
    const pages = parseInt(pageCount.value);
    pageCountVal.textContent = `${pages} ${pages === 1 ? 'Page' : 'Pages'}`;

    const pageCost = (pages - 1) * 800;

    let addonCost = 0;
    addonChecks.forEach(check => {
        if (check.checked) {
            addonCost += parseInt(check.value);
        }
    });

    const total = basePrice + pageCost + addonCost;
    totalPriceEl.textContent = `₹${total.toLocaleString('en-IN')}`;
    return total;
}

projectType.addEventListener('change', calculateEstimate);
pageCount.addEventListener('input', calculateEstimate);
addonChecks.forEach(check => check.addEventListener('change', calculateEstimate));

// Send calculated quote directly to Updated WhatsApp (+91 89106 87080)
sendEstimateBtn.addEventListener('click', () => {
    const selectedType = projectType.options[projectType.selectedIndex].text;
    const pages = pageCount.value;
    const total = totalPriceEl.textContent;

    const selectedAddons = [];
    addonChecks.forEach(check => {
        if (check.checked) selectedAddons.push(check.getAttribute('data-name'));
    });

    const addonsText = selectedAddons.length > 0 ? selectedAddons.join(', ') : 'None';

    const message = `Hi Taquie, I used the Cost Estimator on your portfolio:%0A%0A` +
                    `*Project Type:* ${selectedType}%0A` +
                    `*Pages:* ${pages}%0A` +
                    `*Add-ons:* ${addonsText}%0A` +
                    `*Estimated Budget:* ${total}%0A%0A` +
                    `Let's discuss this project!`;

    window.open(`https://wa.me/918910687080?text=${message}`, '_blank');
});

// 6. Direct Contact Form to Updated WhatsApp (+91 89106 87080)
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('client-name').value;
    const role = document.getElementById('client-role').value;
    const msg = document.getElementById('client-msg').value;

    const whatsappText = `Hi Taquie, my name is *${name}*.%0A` +
                         `*Inquiry:* ${role}%0A` +
                         `*Details:* ${msg}`;

    window.open(`https://wa.me/918910687080?text=${whatsappText}`, '_blank');
});

// 7. Dynamic Copyright Year
document.getElementById('year').textContent = new Date().getFullYear();

// Initial calculation on page load
calculateEstimate();