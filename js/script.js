const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ==================== SMOOTH SCROLL & ACTIVE NAV ==================== 
const navItems = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.style.color = 'var(--primary-color)';
            item.style.borderBottom = '2px solid var(--primary-color)';
            item.style.paddingBottom = '3px';
        } else {
            item.style.color = 'var(--dark-text)';
            item.style.borderBottom = 'none';
            item.style.paddingBottom = '0';
        }
    });
});

// ==================== CONTACT FORM SUBMISSION ==================== 
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simple validation
    if (name.trim() && email.trim() && message.trim()) {
        // Create a mailto link as fallback (you can replace with actual API)
        const mailtoLink = `mailto:hello@portfolio.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(email)}`;
        
        // Show success message
        showNotification('Message sent successfully! We\'ll be in touch soon.', 'success');
        
        // Reset form
        contactForm.reset();
    } else {
        showNotification('Please fill in all fields.', 'error');
    }
});

// ==================== NOTIFICATION SYSTEM ==================== 
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${type === 'success' ? '#a8d5ba' : '#d4a5a5'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 2000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== ANIMATIONS ==================== 
// Add animation styles to the document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe project cards and other elements
document.querySelectorAll('.project-card, .skill-category, .stat-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==================== SCROLL ANIMATIONS FOR PROGRESS BARS ==================== 
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.progress');
            if (progressBar) {
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            }
            progressObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-item').forEach(el => {
    progressObserver.observe(el);
});

// ==================== PARALLAX EFFECT ==================== 
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-image-container');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ==================== DARK MODE TOGGLE (OPTIONAL) ==================== 
// Uncomment to enable dark mode toggle
/*
const darkModeToggle = document.createElement('button');
darkModeToggle.textContent = '🌙';
darkModeToggle.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

document.body.appendChild(darkModeToggle);
*/

// ==================== WINDOW LOAD EVENT ==================== 
window.addEventListener('load', () => {
    // Trigger animations after page load
    document.querySelectorAll('.project-card, .skill-category').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});

// ==================== KEYBOARD NAVIGATION ==================== 
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu on Escape
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});
