document.addEventListener('DOMContentLoaded', () => {
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
    
    // Simple smooth scroll with special handling for CTA section
    const setupSmoothScroll = () => {
        const navLinks = document.querySelectorAll('.sidebar-nav a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    let offset = 65; // Default offset
                    
                    // Special offset for CTA section
                    if (targetId === '#cta-section') {
                        offset = 45; // Increase this value to scroll lower
                    }
                    
                    window.scrollTo({
                        top: targetId === '#top' ? 0 : targetElement.offsetTop - offset,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without causing a page jump
                    history.pushState(null, null, targetId);
                }
            });
        });
    };
    
    // Set up Intersection Observer for detecting active sections
    const setupActiveNavigation = () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.sidebar-nav a:not(.logo)');
        
        const options = {
            rootMargin: '-10% 0px -85% 0px', // Consider a section in view when it's 10% from the top and 85% from the bottom
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Get the id of the current section
                    const id = entry.target.getAttribute('id');
                    
                    // Remove active class from all links
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // Add active class to the corresponding link
                    const correspondingLink = document.querySelector(`.sidebar-nav a[href="#${id}"]`);
                    if (correspondingLink) {
                        correspondingLink.classList.add('active');
                    }
                }
            });
        }, options);
        
        // Observe all sections
        sections.forEach(section => {
            if (section.id) {
                observer.observe(section);
            }
        });
        
        // Also observe the top section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            observer.observe(heroSection);
        }
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
    setupMobileNav();
    addMobileStyles();
    setupSmoothScroll();
    setupActiveNavigation();
    setupContactForm();
}); 