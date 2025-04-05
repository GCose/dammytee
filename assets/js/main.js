/**=============================================
 * Function that handles header scroll effects
 ==============================================*/
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**=========================================
 * Function that handles mobile menu toggle
 ==========================================*/
function handleMobileMenu() {
    const menuToggle = document.querySelector('.header__menu-toggle');
    const nav = document.querySelector('.header__nav');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.header__nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });
}

/**==========================================
 * Function that handles testimonial slider
 ===========================================*/
function handleTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial__slide');
    const indicators = document.querySelectorAll('.testimonial__indicator');
    const prevBtn = document.querySelector('.testimonial__control-prev');
    const nextBtn = document.querySelector('.testimonial__control-next');

    if (!slides.length) return;

    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        slides[index].classList.add('active');
        indicators[index].classList.add('active');

        currentSlide = index;
    }

    function nextSlide() {
        const newIndex = (currentSlide + 1) % slides.length;
        showSlide(newIndex);
    }

    function prevSlide() {
        const newIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(newIndex);
    }

    // Auto slide functionality
    let slideInterval = setInterval(nextSlide, 5000);

    // Reset interval on manual navigation
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            resetInterval();
        });
    });

    // Initialize
    showSlide(0);
}

/**========================================
 * Function that handles smooth scrolling
 =========================================*/
function handleSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href === '#') return;

            e.preventDefault();
            const targetEl = document.querySelector(href);

            if (targetEl) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const topOffset = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: topOffset,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**===================================================
 *  Function that initializes ScrollReveal animations
 ====================================================*/
function initScrollReveal() {
    // Common reveal configuration
    const defaultRevealConfig = {
        origin: 'bottom',
        distance: '30px',
        duration: 800,
        delay: 0,
        easing: 'ease-in-out',
        reset: false,
        mobile: true,
        desktop: true
    };

    // Initialize ScrollReveal
    const sr = ScrollReveal(defaultRevealConfig);

    // Hero section animations
    sr.reveal('.hero__title', {
        origin: 'left',
        delay: 100
    });

    sr.reveal('.hero__text', {
        origin: 'left',
        delay: 200
    });

    sr.reveal('.hero__cta', {
        origin: 'left',
        delay: 300
    });

    sr.reveal('.hero__image', {
        origin: 'right',
        delay: 200
    });

    sr.reveal('.hero__scroll', {
        delay: 400
    });

    // About section animations
    sr.reveal('.about__image-container', {
        origin: 'right'
    });

    sr.reveal('.about__overline', {
        origin: 'left'
    });

    sr.reveal('.about__title', {
        origin: 'left',
        delay: 100
    });

    sr.reveal('.about__text', {
        origin: 'left',
        delay: 200,
        interval: 100
    });

    sr.reveal('.about__value', {
        interval: 200
    });

    // Collections section animations
    sr.reveal('.collections__title', {
        distance: '20px'
    });

    sr.reveal('.collections__subtitle', {
        distance: '20px',
        delay: 100
    });

    sr.reveal('.collections__category-title', {
        origin: 'left',
        interval: 200
    });

    sr.reveal('.collections__item', {
        interval: 150
    });

    // Process section animations
    sr.reveal('.process__overline', {
        origin: 'left'
    });

    sr.reveal('.process__title', {
        origin: 'left',
        delay: 100
    });

    sr.reveal('.process__text', {
        origin: 'left',
        delay: 200
    });

    sr.reveal('.process__step', {
        origin: 'left',
        interval: 150,
        delay: 300
    });

    sr.reveal('.process__image', {
        origin: 'right',
        delay: 200
    });

    // Testimonial section animations
    sr.reveal('.testimonial__title');
    sr.reveal('.testimonial__slider', {
        delay: 200
    });
    sr.reveal('.testimonial__controls', {
        delay: 300
    });

    // Contact section animations
    sr.reveal('.contact__title', {
        origin: 'left'
    });

    sr.reveal('.contact__text', {
        origin: 'left',
        delay: 100
    });

    sr.reveal('.contact__detail', {
        origin: 'left',
        interval: 150,
        delay: 200
    });

    sr.reveal('.contact__form-container', {
        origin: 'right',
        delay: 200
    });

    // Footer animations
    sr.reveal('.footer__logo', {
        delay: 100
    });

    sr.reveal('.footer__links-column', {
        interval: 150
    });

    sr.reveal('.footer__bottom', {
        delay: 300
    });
}

/**=======================================
 * Function that initializes the website
 ========================================*/
function initWebsite() {
    handleHeaderScroll();
    handleMobileMenu();
    handleTestimonialSlider();
    handleSmoothScroll();

    // Initialize ScrollReveal if the library is loaded
    if (typeof ScrollReveal === 'function') {
        initScrollReveal();
    } else {
        console.warn('ScrollReveal library is not loaded. Animations will not work.');
    }

    // Add active class to current nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__nav-link');

    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Initial check
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initWebsite);