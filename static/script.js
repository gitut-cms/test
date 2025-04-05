// templates/static/script.js

/**
 * Wait for the DOM to be fully loaded before running scripts
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed"); // Log to confirm script runs

    /**
     * Feature: Dark Mode Toggle
     */
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement; // Target the <html> element
    const sunIcon = themeToggle ? themeToggle.querySelector('.icon-sun') : null;
    const moonIcon = themeToggle ? themeToggle.querySelector('.icon-moon') : null;

    // Function to apply the theme
    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (sunIcon && moonIcon) {
            if (theme === 'dark') {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'inline-block';
            } else {
                sunIcon.style.display = 'inline-block';
                moonIcon.style.display = 'none';
            }
        }
         console.log(`Theme applied: ${theme}`);
    };

    // Get saved theme from localStorage or detect system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    // Apply the initial theme
    applyTheme(currentTheme);

    // Add event listener to the toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    } else {
        console.warn("Theme toggle button not found.");
    }

    // Listen for system theme changes (optional)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (!localStorage.getItem('theme')) { // Only change if user hasn't set a preference
            applyTheme(event.matches ? 'dark' : 'light');
        }
    });


    /**
     * Feature: Responsive Navigation Toggle
     */
    const menuToggle = document.getElementById('menu-toggle');
    const mainNavigation = document.getElementById('main-navigation');

    if (menuToggle && mainNavigation) {
        menuToggle.addEventListener('click', () => {
            mainNavigation.classList.toggle('nav-open'); // Toggle class on the UL
            // Toggle ARIA expanded attribute for accessibility
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
             console.log("Menu toggled. Is open:", mainNavigation.classList.contains('nav-open'));
        });

        // Optional: Close menu if clicking outside of it (more complex)
        // document.addEventListener('click', (event) => {
        //     if (!mainNavigation.contains(event.target) && !menuToggle.contains(event.target) && mainNavigation.classList.contains('nav-open')) {
        //         mainNavigation.classList.remove('nav-open');
        //         menuToggle.setAttribute('aria-expanded', 'false');
        //         console.log("Menu closed via outside click.");
        //     }
        // });

    } else {
        console.warn("Menu toggle button or main navigation element not found.");
    }


    /**
     * Feature: Header Scroll Effect
     */
    const siteHeader = document.getElementById('site-header');
    let lastScrollY = window.scrollY;
    const scrollThreshold = 10; // Pixels scrolled before effect triggers

    if (siteHeader) {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > scrollThreshold) {
                siteHeader.classList.add('site-header-scrolled');
            } else {
                siteHeader.classList.remove('site-header-scrolled');
            }

            // Optional: Hide header on scroll down, show on scroll up (more complex Casper effect)
            // if (currentScrollY > lastScrollY && currentScrollY > siteHeader.offsetHeight) {
            //    // Scrolling down - hide header
            //    siteHeader.classList.add('site-header-hidden');
            // } else if (currentScrollY < lastScrollY || currentScrollY <= scrollThreshold) {
            //    // Scrolling up or near top - show header
            //     siteHeader.classList.remove('site-header-hidden');
            // }

            lastScrollY = currentScrollY; // Update last scroll position
        };

        // Throttle scroll events for performance
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Initial check in case page loads already scrolled
        handleScroll();

    } else {
        console.warn("Site header element not found.");
    }

    /**
     * Feature: Simple Image Lightbox (Click to Enlarge)
     * Note: This is a very basic implementation. Libraries offer more features.
     */
    const postContentImages = document.querySelectorAll('.post-content img'); // Select images in post content

    if (postContentImages.length > 0) {
        postContentImages.forEach(img => {
            // Check if image is already wrapped in a link
            if (!img.closest('a')) {
                img.style.cursor = 'zoom-in'; // Indicate interactivity
                img.addEventListener('click', (e) => {
                    e.preventDefault(); // Prevent default if ever needed
                    createLightbox(img.src, img.alt);
                });
            }
        });

        const createLightbox = (src, alt) => {
            // Check if a lightbox is already open
             if (document.querySelector('.simple-lightbox-overlay')) {
                 return;
             }

            console.log("Creating lightbox for:", src);

            const overlay = document.createElement('div');
            overlay.className = 'simple-lightbox-overlay lightbox-active'; // Add active class immediately

            const lightboxImg = document.createElement('img');
            lightboxImg.src = src;
            lightboxImg.alt = alt || 'Lightbox image';
            lightboxImg.className = 'simple-lightbox-image';

            const closeButton = document.createElement('button');
            closeButton.className = 'simple-lightbox-close';
            closeButton.setAttribute('aria-label', 'Close lightbox');
            closeButton.innerHTML = '×'; // Simple 'X'

            overlay.appendChild(lightboxImg);
            overlay.appendChild(closeButton);
            document.body.appendChild(overlay);

            // Function to close lightbox
            const closeLightbox = () => {
                 if (overlay) {
                     overlay.classList.remove('lightbox-active');
                     // Remove after transition (if any) or slight delay
                     setTimeout(() => {
                         if (overlay && overlay.parentNode) {
                            overlay.parentNode.removeChild(overlay);
                            console.log("Lightbox removed.");
                         }
                     }, 300); // Match CSS transition duration if added
                 }
             };

            // Close on button click or overlay click
            overlay.addEventListener('click', (e) => {
                 if (e.target === overlay || e.target === closeButton) {
                     closeLightbox();
                 }
             });

             // Close on Escape key press
             const handleEscKey = (e) => {
                 if (e.key === 'Escape') {
                     closeLightbox();
                     document.removeEventListener('keydown', handleEscKey); // Clean up listener
                 }
             };
             document.addEventListener('keydown', handleEscKey);
        };

    } else {
         console.log("No images found in .post-content for lightbox feature.");
    }

}); // End DOMContentLoaded