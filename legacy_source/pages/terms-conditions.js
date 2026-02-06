// Terms & Conditions Page Enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function() {
            const isOpen = navLinks.classList.contains('open');
            navLinks.classList.toggle('open');
            menuBtn.setAttribute('aria-expanded', !isOpen);
        });
    }
    
    // Smooth scrolling for table of contents links
    const tocLinks = document.querySelectorAll('.terms__toc a');
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without causing scroll jump
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
    
    // Highlight current section in table of contents
    const sections = document.querySelectorAll('.terms__content section');
    const tocItems = document.querySelectorAll('.terms__toc a');
    
    function highlightCurrentSection() {
        const scrollPosition = window.scrollY + 100; // Offset for fixed header
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all toc items
                tocItems.forEach(item => item.classList.remove('active'));
                // Add active class to current section's toc item
                if (tocItems[index]) {
                    tocItems[index].classList.add('active');
                }
            }
        });
    }
    
    // Add CSS for active TOC item
    const style = document.createElement('style');
    style.textContent = `
        .terms__toc a.active {
            color: var(--primary-color);
            font-weight: 600;
            text-decoration: underline;
        }
    `;
    document.head.appendChild(style);
    
    // Listen for scroll events (throttled for performance)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(highlightCurrentSection, 10);
    });
    
    // Initial highlight
    highlightCurrentSection();
    
    // Back to top functionality
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="ri-arrow-up-line"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: var(--text-dark);
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Add hover effects for better UX
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    });
    
    // Print functionality
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '<i class="ri-printer-line"></i> Print Terms';
    printBtn.className = 'print-btn btn';
    printBtn.style.cssText = `
        margin: 2rem 0;
        background-color: var(--text-light);
    `;
    
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    const termsHeader = document.querySelector('.terms__header');
    if (termsHeader) {
        termsHeader.appendChild(printBtn);
    }
    
    // Enhanced focus management for accessibility
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape' && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.focus();
        }
    });
    
    // Handle URL hash on page load
    if (window.location.hash) {
        setTimeout(() => {
            const targetSection = document.querySelector(window.location.hash);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 100);
    }
});

// Performance monitoring (optional)
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}