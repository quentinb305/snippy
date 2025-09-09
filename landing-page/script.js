// Email validation utility
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form submission handler
function handleFormSubmission(formId, emailId, messageId) {
    const form = document.getElementById(formId);
    const emailInput = document.getElementById(emailId);
    const messageDiv = document.getElementById(messageId);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Clear previous messages
        messageDiv.style.display = 'none';
        messageDiv.className = 'form-message';
        
        // Validate email
        if (!email) {
            showMessage(messageDiv, 'Please enter your email address.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage(messageDiv, 'Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission (since no backend)
        const button = form.querySelector('.cta-button');
        const originalText = button.innerHTML;
        
        // Show loading state
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Joining...';
        button.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Reset button
            button.innerHTML = originalText;
            button.disabled = false;
            
            // Show success message
            showMessage(messageDiv, `Thanks! We'll send updates to ${email}`, 'success');
            
            // Clear form
            emailInput.value = '';
            
            // Store email in localStorage for demo purposes
            localStorage.setItem('petmeet_email', email);
            
            // Show celebration animation
            createCelebrationAnimation();
            
        }, 1500);
    });
}

// Show form message
function showMessage(messageDiv, text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

// Create celebration animation
function createCelebrationAnimation() {
    const emojis = ['🐶', '🐱', '🎉', '❤️', '🦴', '🐾'];
    
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            createFloatingEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
        }, i * 100);
    }
}

// Create floating emoji animation
function createFloatingEmoji(emoji) {
    const emojiElement = document.createElement('div');
    emojiElement.textContent = emoji;
    emojiElement.style.cssText = `
        position: fixed;
        font-size: 24px;
        pointer-events: none;
        z-index: 10000;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight}px;
        animation: floatUp 3s ease-out forwards;
    `;
    
    document.body.appendChild(emojiElement);
    
    // Remove element after animation
    setTimeout(() => {
        emojiElement.remove();
    }, 3000);
}

// Add CSS for floating animation
function addFloatingAnimationCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Floating CTA button functionality
function setupFloatingCTA() {
    const floatingCta = document.getElementById('floatingCta');
    const signupSection = document.getElementById('signup');
    
    floatingCta.addEventListener('click', () => {
        signupSection.scrollIntoView({ behavior: 'smooth' });
        
        // Add attention animation
        const ctaForm = document.getElementById('ctaSignupForm');
        ctaForm.style.animation = 'pulse 1s ease-in-out';
        setTimeout(() => {
            ctaForm.style.animation = '';
        }, 1000);
    });
    
    // Show/hide floating CTA based on scroll position
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const heroSection = document.getElementById('home');
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        
        if (scrollTop > heroBottom && scrollTop > lastScrollTop) {
            // Scrolling down and past hero
            floatingCta.style.transform = 'translateY(0)';
            floatingCta.style.opacity = '1';
        } else if (scrollTop < lastScrollTop) {
            // Scrolling up
            floatingCta.style.transform = 'translateY(100px)';
            floatingCta.style.opacity = '0';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Add pulse animation CSS
function addPulseAnimationCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

// Intersection Observer for animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.benefit-card, .step, .cta-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize navbar background on scroll
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Add typing effect to hero title
function setupTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeSpeed = 50;
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, typeSpeed);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Form input enhancements
function setupFormEnhancements() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    
    emailInputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Real-time email validation
        input.addEventListener('input', function() {
            const messageDiv = this.closest('form').querySelector('.form-message');
            if (this.value && !isValidEmail(this.value)) {
                this.style.borderColor = '#EF4444';
                this.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            } else {
                this.style.borderColor = '#E5E7EB';
                this.style.boxShadow = 'none';
                if (messageDiv.classList.contains('error')) {
                    messageDiv.style.display = 'none';
                }
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form handlers
    handleFormSubmission('heroSignupForm', 'heroEmail', 'heroFormMessage');
    handleFormSubmission('ctaSignupForm', 'ctaEmail', 'ctaFormMessage');
    
    // Setup other features
    setupSmoothScrolling();
    setupFloatingCTA();
    setupScrollAnimations();
    setupNavbarScroll();
    setupFormEnhancements();
    
    // Add custom CSS
    addFloatingAnimationCSS();
    addPulseAnimationCSS();
    
    // Optional: Add typing effect (uncomment if desired)
    // setupTypingEffect();
    
    // Log initialization
    console.log('🐾 PetMeet landing page initialized successfully!');
    
    // Check if user has already signed up (demo purposes)
    const savedEmail = localStorage.getItem('petmeet_email');
    if (savedEmail) {
        console.log(`Welcome back! Previously registered email: ${savedEmail}`);
    }
});

// Handle page visibility change for animations
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Resume animations when page becomes visible
        document.querySelectorAll('.floating-icon').forEach(icon => {
            icon.style.animationPlayState = 'running';
        });
    } else {
        // Pause animations when page is hidden
        document.querySelectorAll('.floating-icon').forEach(icon => {
            icon.style.animationPlayState = 'paused';
        });
    }
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`Failed to load image: ${this.src}`);
            // You could set a fallback image here
            // this.src = 'path/to/fallback-image.jpg';
        });
    });
});