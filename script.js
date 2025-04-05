// Language switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    // Determine current language from URL path
    const path = window.location.pathname;
    const isGerman = path.includes('/de');
    
    // Update active state for all language switchers
    const langLinks = document.querySelectorAll('.lang-link');
    langLinks.forEach(link => {
        // Remove active class from all
        link.classList.remove('active');
        
        // Add active class to current language
        if ((isGerman && link.getAttribute('lang') === 'de') || 
            (!isGerman && link.getAttribute('lang') === 'en')) {
            link.classList.add('active');
        }
        
        // Add click handler for smooth language switching
        link.addEventListener('click', function(e) {
            // Only intercept if we're not already on this language page
            if (!this.classList.contains('active')) {
                e.preventDefault();
                const targetLang = this.getAttribute('lang');
                const targetUrl = targetLang === 'en' ? '/en' : '/de';
                
                // Fade out effect before redirect (optional)
                document.body.style.opacity = '0.5';
                document.body.style.transition = 'opacity 0.3s ease';
                
                // Redirect after short delay for smoother experience
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 300);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const setupMobileMenu = () => {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-menu a');
        const headerBar = document.querySelector('.header-bar');
        
        if (hamburger && mobileMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('open');
                mobileMenu.classList.toggle('open');
                document.body.classList.toggle('no-scroll');
            });
        }
        
        // Handle header bar opacity on scroll
        if (headerBar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 10) {
                    headerBar.style.opacity = '1';
                } else {
                    headerBar.style.opacity = '0.8';
                }
            });
        }
    };
    
    // Mobile navigation toggle
    const setupMobileNav = () => {
        if (window.innerWidth <= 768) {
            const sidebar = document.querySelector('.sidebar');
            const logo = document.querySelector('.logo');
            
            // Create hamburger menu
            const menuToggle = document.createElement('button');
            menuToggle.classList.add('menu-toggle');
            menuToggle.innerHTML = `<span></span><span></span><span></span>`;
            menuToggle.setAttribute('aria-label', 'Toggle navigation');
            
            // Create mobile nav container
            const mobileNav = document.createElement('div');
            mobileNav.classList.add('mobile-nav');
            
            // Clone nav links
            const navLinks = document.querySelector('.sidebar-nav').cloneNode(true);
            mobileNav.appendChild(navLinks);
            
            // Add to DOM
            sidebar.appendChild(menuToggle);
            document.body.appendChild(mobileNav);
            
            // Toggle functionality
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                mobileNav.classList.toggle('active');
                document.body.classList.toggle('nav-open');
            });
        }
    };
    
    // Add mobile styles
    const addMobileStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .menu-toggle {
                display: none;
                background: none;
                border: none;
                cursor: pointer;
                padding: 10px;
            }
            
            .menu-toggle span {
                display: block;
                width: 24px;
                height: 2px;
                background-color: #000;
                margin: 5px 0;
                transition: transform 0.3s ease, opacity 0.3s ease;
            }
            
            .menu-toggle.active span:nth-child(1) {
                transform: translateY(7px) rotate(45deg);
            }
            
            .menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .menu-toggle.active span:nth-child(3) {
                transform: translateY(-7px) rotate(-45deg);
            }
            
            .mobile-nav {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #fff;
                padding: 80px 40px;
                z-index: 1000;
                transition: transform 0.3s ease, opacity 0.3s ease;
                transform: translateY(-100%);
                opacity: 0;
            }
            
            .mobile-nav.active {
                transform: translateY(0);
                opacity: 1;
            }
            
            .mobile-nav .sidebar-nav {
                display: flex;
                flex-direction: column;
                gap: 20px;
                font-size: 24px;
            }
            
            @media (max-width: 768px) {
                .menu-toggle {
                    display: block;
                }
                
                body.nav-open {
                    overflow: hidden;
                }
                
                .mobile-nav {
                    display: block;
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    // Handle contact form submission
    const setupContactForm = () => {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const name = this.querySelector('#name').value;
                const email = this.querySelector('#email').value;
                const project = this.querySelector('#project').value;
                
                // In a real application, you would send this data to a server
                // For now, we'll just show a success message
                
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('form-success');
                successMessage.innerHTML = `
                    <h3>Thanks for reaching out, ${name}!</h3>
                    <p>We've received your message and will get back to you at ${email} shortly.</p>
                `;
                
                // Replace form with success message
                this.style.opacity = '0';
                setTimeout(() => {
                    this.style.display = 'none';
                    this.parentNode.insertBefore(successMessage, this.nextSibling);
                    
                    // Add success message styles
                    const style = document.createElement('style');
                    style.textContent = `
                        .form-success {
                            padding: 30px;
                            background-color: rgba(0, 0, 0, 0.03);
                            border-radius: 4px;
                            margin-bottom: 40px;
                            animation: fadeIn 0.5s ease forwards;
                        }
                        
                        .form-success h3 {
                            font-size: 20px;
                            font-weight: 600;
                            margin-bottom: 12px;
                        }
                        
                        .form-success p {
                            font-size: 16px;
                            line-height: 1.5;
                            color: rgba(0, 0, 0, 0.7);
                            margin-bottom: 0;
                        }
                        
                        @keyframes fadeIn {
                            from { opacity: 0; transform: translateY(10px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                    `;
                    document.head.appendChild(style);
                }, 300);
            });
        }
    };
    
    // Initialize
    setupMobileMenu();
    setupMobileNav();
    addMobileStyles();
    setupContactForm();
});

// Typing Effect Animation
document.addEventListener('DOMContentLoaded', function() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Get the elements
    const part1 = document.getElementById('typing-effect-part1');
    const part2 = document.getElementById('typing-effect-part2');
    const cursor = document.getElementById('typing-cursor');
    const container = document.getElementById('typing-effect-container');
    
    // If elements don't exist, exit early
    if (!part1 || !part2 || !cursor || !container) return;
    
    // Define the text to type based on the current language
    const isGerman = document.documentElement.lang === 'de';
    const text = isGerman ? "die das Unternehmen aufbauen" : "That Build the Business";
    
    // For users who prefer reduced motion, show the full text immediately
    if (prefersReducedMotion) {
        part2.textContent = text;
        cursor.style.display = 'none';
        return;
    }
    
    // Empty the text initially
    part2.textContent = '';
    
    // Set cursor position at the beginning
    cursor.style.display = 'inline-block';
    
    // Add a slight delay to ensure page is rendered before animation starts
    setTimeout(() => {
        // Type the text
        let charIndex = 0;
        const typingSpeed = 100; // milliseconds per character
        
        const typingInterval = setInterval(function() {
            if (charIndex < text.length) {
                part2.textContent += text.charAt(charIndex);
                charIndex++;
            } else {
                // Stop blinking cursor after typing is complete
                setTimeout(() => {
                    cursor.style.animation = 'none';
                    cursor.style.opacity = '0';
                }, 1000);
                
                clearInterval(typingInterval);
            }
        }, typingSpeed);
    }, 500); // 500ms delay before starting
});

// Toggle the mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            mobileMenu.classList.toggle('open');  // Add 'open' class for CSS targeting
            document.body.classList.toggle('no-scroll');
        });
    }
}); 