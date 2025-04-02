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
    
    // Simple smooth scroll without changing active states
    const setupSmoothScroll = () => {
        const navLinks = document.querySelectorAll('.sidebar-nav a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetId === '#top' ? 0 : targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without causing a page jump
                    history.pushState(null, null, targetId);
                }
            });
        });
    };
    
    // Initialize
    setupMobileNav();
    addMobileStyles();
    setupSmoothScroll();
}); 