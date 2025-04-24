const images = document.querySelectorAll('.carousel img');
let current = 0;

setInterval(() => {
  images[current].classList.remove('active');
  current = (current + 1) % images.length;
  images[current].classList.add('active');
}, 4000);
// DOM Elements
const mainNav = document.getElementById('main-nav');
const heroImage = document.querySelector('.fade-in-image');
const progressBars = document.querySelectorAll('.progress');
const floatingNavLinks = document.querySelectorAll('.floating-nav a');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const contactForm = document.getElementById('contact-form');
const sections = document.querySelectorAll('.section');

// Current slide index for carousel
let currentSlide = 0;

// Add scroll event listener
window.addEventListener('scroll', () => {
    handleNavScroll();
    fadeInElements();
    animateProgressBars();
    updateActiveNavLink();
});

// Handle navigation bar scroll effect
function handleNavScroll() {
    if (window.scrollY > 50) {
        mainNav.classList.add('scrolled');
    } else {
        mainNav.classList.remove('scrolled');
    }
}

// Fade in elements when scrolled into view
function fadeInElements() {
    const scrollPosition = window.scrollY + window.innerHeight;
    
    // Check if hero image is in view
    if (heroImage) {
        const heroImagePosition = heroImage.getBoundingClientRect().top + window.scrollY;
        if (scrollPosition > heroImagePosition) {
            heroImage.classList.add('visible');
        }
    }
    
    // Add more elements to fade in if needed
}

// Animate progress bars when in view
function animateProgressBars() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    
    const sectionPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (sectionPosition < screenPosition) {
        progressBars.forEach(progress => {
            const value = progress.getAttribute('data-value');
            progress.style.width = `${value}%`;
        });
    }
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    floatingNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Carousel functionality
function showSlide(index) {
    carouselItems.forEach(item => item.classList.remove('active'));
    
    // Handle wrapping around
    if (index >= carouselItems.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = carouselItems.length - 1;
    } else {
        currentSlide = index;
    }
    
    carouselItems[currentSlide].classList.add('active');
}

// Next slide
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Previous slide
function prevSlide() {
    showSlide(currentSlide - 1);
}

// Add event listeners for carousel buttons
if (prevBtn) prevBtn.addEventListener('click', prevSlide);
if (nextBtn) nextBtn.addEventListener('click', nextSlide);

// Auto advance carousel
setInterval(nextSlide, 5000);

// Form submission handling
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For now, we'll just log it and show a success message
        console.log('Form submitted:', { name, email, message });
        
        // Reset form
        contactForm.reset();
        
        // Show success message
        alert('Thanks for your message! I\'ll get back to you soon.');
    });
}

// Initialize first slide
showSlide(0);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Call initial functions
    handleNavScroll();
    updateActiveNavLink();
    
    // Check if hero image should be visible on page load
    if (window.scrollY > 100 && heroImage) {
        heroImage.classList.add('visible');
    }
});

// Dynamic grid layout items hover effect
const projectItems = document.querySelectorAll('.project-item');