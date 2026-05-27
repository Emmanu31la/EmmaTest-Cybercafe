// 1. Mobile Menu Toggle
const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('open');
});

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('open');
    });
});

const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');
        
        document.querySelectorAll('.accordion-item').forEach(acc => {
            acc.classList.remove('active');
        });

        if (!isActive) {
            item.classList.add('active');
        }
    });
});

const testimonials = [
    { name: "Praise J.", type: "Student", text: "I got my JAMB admission letter very quickly. Very fast and reliable service!" },
    { name: "Deborah A.", type: "NYSC", text: "EmmaTest Cybercafe helped me with my NYSC call-up letter without stress. Highly recommend!" },
    { name: "Chinedu K.", type: "Civilian", text: "I always pay my bills and sometimes buy data from here. Super convenient and trustworthy." },
    { name: "Aisha T.", type: "Student", text: "Printed my WAEC results so easily. picked it up near my area. Nice man" },
    { name: "Samuel O.", type: "Freelancer", text: "Excellent typesetting and formatting service. My documents look highly professional." },
    { name: "Grace E.", type: "Student", text: "Got my NIN slip printed and delivered around my school quickly. Excellent customer service." },
    { name: "Tunde B.", type: "Student", text: "Post-UTME registration was seamless. Guided me through every step." },
    { name: "Ngozi M.", type: "NYSC", text: "Green card printed and delivered near to me exactly when promised." },
    { name: "Victor L.", type: "Student", text: "Result printing was quick and they directed me to cafes near me. Very reliable." }
];

let currentIndex = 0;
const container = document.getElementById('testimonial-container');

function renderTestimonials() {
    container.innerHTML = '';
    const isMobile = window.innerWidth <= 768;
    const cardsToShow = isMobile ? 1 : 3;

    for (let i = 0; i < cardsToShow; i++) {
        const index = (currentIndex + i) % testimonials.length;
        const review = testimonials[index];
        
        const cardHTML = `
            <div class="test-card hover-float">
                <i class="fas fa-quote-left text-green" style="font-size: 2rem;"></i>
                <div class="stars">
                    <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                </div>
                <p>"${review.text}"</p>
                <div style="margin-top: 15px;">
                    <strong>— ${review.name}</strong><br>
                    <span style="font-size: 0.8rem; color: var(--gray-text);">${review.type}</span>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    }
}
document.getElementById('nextTestimonial').addEventListener('click', () => {
    const isMobile = window.innerWidth <= 768;
    currentIndex = (currentIndex + (isMobile ? 1 : 3)) % testimonials.length;
    renderTestimonials();
});

document.getElementById('prevTestimonial').addEventListener('click', () => {
    const isMobile = window.innerWidth <= 768;
    const step = isMobile ? 1 : 3;
    currentIndex = (currentIndex - step + testimonials.length) % testimonials.length;
    renderTestimonials();
});

window.addEventListener('resize', renderTestimonials);

renderTestimonials();

const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');
const body = document.body;

const currentTheme = localStorage.getItem('theme');


if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
    themeIcon.classList.replace('fa-moon', 'fa-sun'); 
}

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});