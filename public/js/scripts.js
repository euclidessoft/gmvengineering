// GMV Engineering - Enhanced JavaScript Interactions
document.addEventListener('DOMContentLoaded', function() {

    // Navbar scroll effect
    const navbar = document.getElementById('mainNavbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Animated counter for statistics
    const stats = document.querySelectorAll('.stat-number');
    const animateCounters = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.floor(current);
                    setTimeout(updateCounter, 20);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        });
    };

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Trigger counter animation for stats section
                if (entry.target.id === 'stats') {
                    animateCounters();
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.value-card, .service-card, .contact-info-card, .quality-highlight, .stat-card, .section-header'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add CSS class for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .service-card:nth-child(even) .animate-in {
            animation-delay: 0.2s;
        }
        
        .service-card:nth-child(odd) .animate-in {
            animation-delay: 0.1s;
        }
        
        .value-card:hover .icon-wrapper {
            transform: scale(1.1) rotate(5deg);
        }
        
        .service-card:hover .icon-bg {
            transform: scale(1.1);
        }
        
        @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(14, 165, 233, 0.3); }
            50% { box-shadow: 0 0 30px rgba(14, 165, 233, 0.5); }
        }
        
        .btn-cta:hover {
            animation: pulseGlow 1.5s infinite;
        }
        
        /* Parallax effect for hero background */
        .hero-bg {
            transform: translateZ(0);
        }
        
        /* Loading animation for form submission */
        .form-loading {
            position: relative;
            pointer-events: none;
        }
        
        .form-loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin: -10px 0 0 -10px;
            border: 2px solid transparent;
            border-top: 2px solid #ffffff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Hover effects for images */
        .about-image img,
        .quality-image img {
            transition: transform 0.3s ease, filter 0.3s ease;
        }
        
        .about-image:hover img,
        .quality-image:hover img {
            transform: scale(1.05);
            filter: brightness(1.1);
        }
        
        /* Enhanced scroll indicator animation */
        .scroll-indicator {
            cursor: pointer;
        }
        
        .scroll-indicator:hover .scroll-arrow {
            animation-duration: 1s;
        }
    `;
    document.head.appendChild(style);

    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.classList.add('form-loading');
            submitBtn.innerHTML = '<span style="opacity: 0;">Envoi en cours...</span>';

            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                submitBtn.classList.remove('form-loading');
                submitBtn.innerHTML = '<span>Message envoyé ✓</span>';
                submitBtn.style.background = '#10b981';

                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.innerHTML = `
                    <strong>Merci !</strong> Votre message a été envoyé avec succès. 
                    Notre équipe vous contactera dans les plus brefs délais.
                `;
                contactForm.appendChild(successMessage);

                // Reset form after 3 seconds
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    successMessage.remove();
                }, 3000);

            }, 2000);
        });
    }

    // // Parallax effect for hero section
    // window.addEventListener('scroll', function() {
    //     const scrolled = window.pageYOffset;
    //     const heroImage = document.querySelector('.hero-image');
    //     if (heroImage) {
    //         const rate = scrolled * -0.5;
    //         heroImage.style.transform = `translateY(${rate}px)`;
    //     }
    // });

    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.service-card, .value-card, .contact-info-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Scroll to top functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            document.querySelector('#about').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Add floating action for contact
    const floatingContact = document.createElement('div');
    floatingContact.innerHTML = `
        <div class="floating-contact" style="
            position: fixed;
            bottom: 20px;
            right: 30px;
            z-index: 1000;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 15px 20px;
            border-radius: 50px;
            box-shadow: 0 4px 20px rgba(30, 64, 175, 0.3);
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
            font-size: 14px;
            display: none;
        ">
            📞 Contact Rapide
        </div>
    `;
    document.body.appendChild(floatingContact);

    const floatingBtn = document.querySelector('.floating-contact');

    // Show floating button on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            floatingBtn.style.display = 'block';
            setTimeout(() => floatingBtn.style.opacity = '1', 10);
        } else {
            floatingBtn.style.opacity = '0';
            setTimeout(() => floatingBtn.style.display = 'none', 300);
        }
    });

    floatingBtn.addEventListener('click', function() {
        document.querySelector('#contact').scrollIntoView({
            behavior: 'smooth'
        });
    });

    floatingBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 25px rgba(30, 64, 175, 0.4)';
    });

    floatingBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 20px rgba(30, 64, 175, 0.3)';
    });

    // Go to Top Button
    const goToTopBtn = document.createElement('button');
    goToTopBtn.className = 'go-to-top';
    goToTopBtn.setAttribute('aria-label', 'Retour en haut');
    goToTopBtn.setAttribute('title', 'Retour en haut');
    document.body.appendChild(goToTopBtn);

    // Show/Hide Go to Top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            goToTopBtn.classList.add('visible');
        } else {
            goToTopBtn.classList.remove('visible');
        }
    });

    // Go to Top functionality
    goToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Preloader (optional)
window.addEventListener('load', function() {
    const preloader = document.createElement('div');
    preloader.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        " id="preloader">
            <div style="text-align: center; color: white;">
                <div style="
                    width: 50px;
                    height: 50px;
                    border: 3px solid rgba(255,255,255,0.3);
                    border-top: 3px solid white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 20px;
                "></div>
                <h3>GMV ENGINEERING</h3>
                <p>Chargement...</p>
            </div>
        </div>
    `;

    // Remove preloader after a short delay
    setTimeout(() => {
        const loader = document.getElementById('preloader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    }, 1500);
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar-custom');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

//langue systeme
var url = $(location).attr("href");
var fr = url.indexOf("/fr/");
var lang = $('#changelang');
if (fr !== -1) {
    lang.html('EN');

} else {
    lang.html('FR');
}
lang.click(function () {
    if (fr !== -1) {
        url = url.replace("/fr/", "/en/");
    } else {
        url = url.replace("/en/", "/fr/");
    }
    document.location.href = url;
});