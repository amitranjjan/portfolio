// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const menuItems = document.getElementById('menuItems');
const navbar = document.querySelector('nav');

mobileMenu.addEventListener('click', () => {
    menuItems.classList.toggle('active');
    navbar.classList.toggle('active');
});

// Close mobile menu when clicking on a menu item
document.querySelectorAll('nav ul li a').forEach(item => {
    item.addEventListener('click', () => {
        menuItems.classList.remove('active');
        navbar.classList.remove('active');
    });
});

// Shrink header on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.padding = '0.5rem 0';
    } else {
        header.style.padding = '1rem 0';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Normally you would send this data to a server
        console.log('Form submitted with:', { name, email, subject, message });
        
        // Show success message (in a real application)
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Add animation on scroll
window.addEventListener('DOMContentLoaded', () => {
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    };
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        section.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Run on initial load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});

// Project filtering (if we add filter buttons later)
const setupProjectFilters = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                // Show/hide projects based on filter
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        const tags = card.querySelectorAll('.project-tags span');
                        let hasTag = false;
                        
                        tags.forEach(tag => {
                            if (tag.textContent.toLowerCase() === filter.toLowerCase()) {
                                hasTag = true;
                            }
                        });
                        
                        card.style.display = hasTag ? 'block' : 'none';
                    }
                });
            });
        });
    }
};

// Skill animation
const animateSkills = () => {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(skill => {
        const width = skill.style.width;
        skill.style.width = '0%';
        
        setTimeout(() => {
            skill.style.transition = 'width 1s ease-in-out';
            skill.style.width = width;
        }, 200);
    });
};

// Run skill animation when about section is visible
const aboutSection = document.getElementById('about');
if (aboutSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(aboutSection);
}

// Typing effect for hero section
const typeEffect = () => {
    const element = document.querySelector('.hero-content h2');
    if (element) {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 100);
    }
};

// Run typing effect when page loads
window.addEventListener('load', typeEffect); 