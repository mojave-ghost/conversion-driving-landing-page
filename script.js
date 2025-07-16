// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// FAQ Toggle Functionality
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const toggle = element.querySelector('.faq-toggle');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-answer').forEach(faq => {
        if (faq !== answer) {
            faq.classList.remove('active');
        }
    });
    document.querySelectorAll('.faq-toggle').forEach(toggleIcon => {
        if (toggleIcon !== toggle) {
            toggleIcon.classList.remove('active');
        }
    });
    
    // Toggle current FAQ
    answer.classList.toggle('active');
    toggle.classList.toggle('active');
}

// Countdown Timer
function updateCountdown() {
    const now = new Date().getTime();
    const endTime = now + (2 * 60 * 60 * 1000) + (14 * 60 * 1000) + (37 * 1000); // 2:14:37 from now
    
    const timer = setInterval(function() {
        const currentTime = new Date().getTime();
        const distance = endTime - currentTime;
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            countdownElement.innerHTML = String(hours).padStart(2, '0') + ':' + 
                                      String(minutes).padStart(2, '0') + ':' + 
                                      String(seconds).padStart(2, '0') + ' remaining';
        }
        
        if (distance < 0) {
            clearInterval(timer);
            if (countdownElement) {
                countdownElement.innerHTML = "OFFER EXPIRED";
            }
        }
    }, 1000);
}

// Spots remaining counter (simulated scarcity)
function updateSpotsRemaining() {
    const spots = Math.floor(Math.random() * 5) + 18; // Random between 18-22
    document.querySelectorAll('#spots-remaining, #spots-remaining-2').forEach(element => {
        element.textContent = spots;
    });
}

// Handle enrollment clicks
function handleEnrollment() {
    // In a real implementation, this would integrate with a payment processor
    alert('This would redirect to a secure checkout page. For demo purposes, this shows the conversion tracking point.');
    
    // Track conversion (example)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
            'value': 1497.00,
            'currency': 'USD'
        });
    }
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Initialize countdown and spots counter
    updateCountdown();
    updateSpotsRemaining();
    
    // Update spots every few minutes to simulate real-time changes
    setInterval(updateSpotsRemaining, 180000); // Every 3 minutes
});

// Navigation background on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Form validation and lead capture (if you add forms later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Exit intent popup (optional enhancement)
let exitIntentShown = false;
document.addEventListener('mouseleave', function(e) {
    if (e.clientY <= 0 && !exitIntentShown) {
        exitIntentShown = true;
        // Show exit intent popup
        console.log('User attempting to leave - show exit intent offer');
    }
});
