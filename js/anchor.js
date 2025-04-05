/**
 * Avenra Website - Anchor Navigation System
 * This file contains all code related to the section anchoring and smooth scrolling
 */

// Initialize the anchor system when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupSmoothScroll();
    setupActiveNavigation();
    setupLanguageSwitcher();
});

/**
 * Sets up smooth scrolling for all anchor links
 */
const setupSmoothScroll = () => {
    // Find all anchor links in the document
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Skip language switcher links
        if (anchor.classList.contains('lang-link')) return;
        
        anchor.addEventListener('click', function(e) {
            e.preventDefault();                
            const targetId = this.getAttribute('href');
            scrollToSection(targetId);
        });
    });
};

/**
 * Core function for scrolling to a section with proper alignment
 * Ensures the section number aligns with the sidebar "Avenra" logo
 */
const scrollToSection = (targetId) => {
    if (!targetId || typeof targetId !== 'string') return;
    
    // Handle "back to top" case
    if (targetId === '#top') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        // Update URL without causing a page jump
        history.pushState(null, null, targetId);
        return;
    }
    
    // Find the target element by ID
    const targetElement = document.querySelector(targetId);
    
    if (!targetElement) {
        console.error(`Target element ${targetId} not found`);
        return;
    }
    
    // Get the feature number element within the target section
    const featureNumber = targetElement.querySelector('.feature-number');
    
    // Get the position of the Avenra logo in the sidebar for alignment reference
    const sidebarLogo = document.querySelector('.sidebar-nav a.logo');
    const logoOffset = sidebarLogo ? sidebarLogo.getBoundingClientRect().top : 0;
    
    // Calculate the position to scroll to
    let scrollToPosition;
    
    // Special handling for the Contact Us section (cta-section)
    if (targetId === '#cta-section') {
        // Get the h2 tag within cta-content for better alignment
        const ctaHeading = targetElement.querySelector('.cta-content h2');
        
        if (ctaHeading) {
            const headingRect = ctaHeading.getBoundingClientRect();
            // Use a neutral offset to align perfectly (from +40 to 0)
            scrollToPosition = window.pageYOffset + headingRect.top - logoOffset + 20;
        } else {
            // Fallback to using the section itself
            const elemRect = targetElement.getBoundingClientRect();
            scrollToPosition = window.pageYOffset + elemRect.top - logoOffset;
        }
    } else if (featureNumber) {
        // Normal case: align feature-number with the logo
        const featureRect = featureNumber.getBoundingClientRect();
        scrollToPosition = window.pageYOffset + featureRect.top - logoOffset;
    } else {
        // Fallback if no feature number found
        const elemRect = targetElement.getBoundingClientRect();
        scrollToPosition = window.pageYOffset + elemRect.top;
    }
    
    // Perform the scroll
    window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth'
    });
    
    // Update URL without causing a page jump
    history.pushState(null, null, targetId);
    
    // Update active state in nav
    const navLinks = document.querySelectorAll('.sidebar-nav a:not(.logo):not(.lang-link), .mobile-menu a:not(.logo):not(.lang-link)');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
};

/**
 * Sets up the Intersection Observer for detecting active sections during scrolling
 */
const setupActiveNavigation = () => {
    const sections = document.querySelectorAll('section[id]');
    // Only select the navigation links, not the language switcher links
    const navLinks = document.querySelectorAll('.sidebar-nav a:not(.logo):not(.lang-link), .mobile-menu a:not(.logo):not(.lang-link)');
    
    // More precise intersection detection
    const options = {
        rootMargin: '-30% 0px -65% 0px', // Consider section in view when it's in the middle 30% of the viewport
        threshold: 0.1 // Require at least 10% of the element to be visible
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the id of the current section
                const id = entry.target.getAttribute('id');
                
                // Remove active class from all navigation links, but NOT language switcher links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to the corresponding links in both sidebar and mobile menu
                const correspondingLinks = document.querySelectorAll(`.sidebar-nav a[href="#${id}"]:not(.lang-link), .mobile-menu a[href="#${id}"]:not(.lang-link)`);
                correspondingLinks.forEach(link => {
                    link.classList.add('active');
                });
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
        
        // Special case for hero section (top)
        const topLinks = document.querySelectorAll('.sidebar-nav a[href="#top"]:not(.lang-link), .mobile-menu a[href="#top"]:not(.lang-link)');
        const topObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && entries[0].intersectionRatio > 0.5) {
                navLinks.forEach(link => link.classList.remove('active'));
                topLinks.forEach(link => link.classList.add('active'));
            }
        }, { threshold: 0.5 });
        
        topObserver.observe(heroSection);
    }
};

/**
 * Additional event handler for mobile menu
 * Attaches the anchor navigation to the mobile menu links
 */
const setupMobileAnchorNav = () => {
    // Close mobile menu when a link is clicked
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    
    if (hamburger && mobileMenu && mobileLinks) {
        mobileLinks.forEach(link => {
            if (link.getAttribute('href').startsWith('#')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    hamburger.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    mobileMenu.classList.remove('open');
                    document.body.classList.remove('no-scroll');
                    
                    // Use the same scroll function for consistency
                    const targetId = link.getAttribute('href');
                    scrollToSection(targetId);
                });
            }
        });
    }
};

// Add mobile anchor navigation setup to the initialization
document.addEventListener('DOMContentLoaded', setupMobileAnchorNav);

/**
 * Sets up the language switcher active states separately from navigation
 */
const setupLanguageSwitcher = () => {
    // Get the language from the html tag
    const currentLang = document.documentElement.lang;
    // Select all language links
    const langLinks = document.querySelectorAll('.lang-link');
    
    // Set active class based on current language
    langLinks.forEach(link => {
        const linkLang = link.getAttribute('lang');
        if (linkLang === currentLang) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Apply stronger styling with inline styles for guaranteed visibility
    const activeLangLinks = document.querySelectorAll('.lang-link.active');
    activeLangLinks.forEach(link => {
        link.style.fontWeight = '700';
        link.style.color = link.closest('.footer') ? '#FFFFFF' : '#000000';
    });
}; 