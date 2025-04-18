/* --- START OF CONSOLIDATED JAVASCRIPT --- */
document.addEventListener('DOMContentLoaded', function () {

    // --- SECTION 1 REMOVED --- (Desktop Hover Dropdown JS - Not needed with CSS hover)

    // --- 2. Scroll to Top Button Logic ---
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    const scrollThreshold = 300;

    function toggleScrollTopButton() {
        if (!scrollToTopBtn) return;
        // Use window.scrollY for modern browsers
        if (window.scrollY > scrollThreshold) {
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    }

    function scrollToTop(event) {
        if (event) event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.addEventListener("scroll", toggleScrollTopButton);
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener("click", scrollToTop);
    }
    // Initial check in case the page loads already scrolled down
    toggleScrollTopButton();

    // --- 3. Intersection Observer for Animations (Global) ---
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Standard Fade-in Animation
            if (entry.target.classList.contains('fade-in-on-scroll')) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: Unobserve after first animation to prevent re-triggering
                    // observer.unobserve(entry.target);
                } else {
                    // Optional: Remove class to re-animate on scroll up
                    // entry.target.classList.remove('is-visible');
                }
            }

            // REMOVED: Number Counter Animation Logic (was targeting .stat-number-v2)

        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Observe standard fade-in elements
    const elementsToAnimate = document.querySelectorAll('.fade-in-on-scroll');
    elementsToAnimate.forEach(el => scrollObserver.observe(el));

    // REMOVED: Observation of number counter elements

    // --- 4. Rainwater Calculator Logic (Education Page Specific) ---
    const calculateBtn = document.getElementById('calculateBtn');
    const roofAreaInput = document.getElementById('roofArea');
    const rainfallInput = document.getElementById('rainfall');
    const resultDiv = document.getElementById('calculationResult');

    if (calculateBtn && roofAreaInput && rainfallInput && resultDiv) {
        calculateBtn.addEventListener('click', function() {
            const area = parseFloat(roofAreaInput.value);
            const rain = parseFloat(rainfallInput.value);
            // Using a slightly more standard conversion factor (approximate)
            // 1 sq ft * 1 inch rain = 0.623 gallons
            const conversionFactor = 0.623;

            // Clear previous result and hide
            resultDiv.textContent = '';
            resultDiv.style.opacity = 0;
            resultDiv.classList.remove('text-danger'); // Remove error class if present

            // Input validation
            let isValid = true;
            if (isNaN(area) || area <= 0) {
                resultDiv.textContent = 'Please enter a valid roof area (positive number).';
                resultDiv.classList.add('text-danger');
                roofAreaInput.focus();
                isValid = false;
            }
            if (isValid && (isNaN(rain) || rain <= 0)) {
                resultDiv.textContent = 'Please enter valid annual rainfall (positive number).';
                resultDiv.classList.add('text-danger');
                rainfallInput.focus();
                isValid = false;
            }

            // If valid, calculate and display
            if (isValid) {
                const potentialGallons = Math.round(area * rain * conversionFactor);

                // Use setTimeout for a subtle fade-in effect
                setTimeout(() => {
                    resultDiv.textContent = `Estimated Potential: ${potentialGallons.toLocaleString()} Gallons/Year`;
                    resultDiv.style.opacity = 1;
                }, 100); // Small delay
            } else {
                // Show error message immediately
                 resultDiv.style.opacity = 1;
            }
        });
    }

    // --- 5. Footer Year Update (Global) ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- 6. Optional Navbar Scroll Effect ---
    // (Can be added here if needed - e.g., shrink navbar on scroll)
    // const navbar = document.querySelector('.navbar');
    // if (navbar) {
    //     window.addEventListener('scroll', () => {
    //         if (window.scrollY > 50) {
    //             navbar.classList.add('navbar-scrolled');
    //         } else {
    //             navbar.classList.remove('navbar-scrolled');
    //         }
    //     });
    // }

}); // --- END OF SINGLE DOMContentLoaded LISTENER ---


/* --- START OF CONSOLIDATED JAVASCRIPT --- */
document.addEventListener('DOMContentLoaded', function () {

    // --- SECTION 1 REMOVED --- (Desktop Hover Dropdown JS - Not needed with CSS hover)

    // --- 2. Scroll to Top Button Logic ---
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    const scrollThreshold = 300;

    function toggleScrollTopButton() {
        if (!scrollToTopBtn) return;
        // Use window.scrollY for modern browsers
        if (window.scrollY > scrollThreshold) {
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    }

    function scrollToTop(event) {
        if (event) event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.addEventListener("scroll", toggleScrollTopButton);
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener("click", scrollToTop);
    }
    // Initial check in case the page loads already scrolled down
    toggleScrollTopButton();

    // --- 3. Intersection Observer for Animations (Global) ---
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Standard Fade-in Animation
            if (entry.target.classList.contains('fade-in-on-scroll')) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: Unobserve after first animation to prevent re-triggering
                    // observer.unobserve(entry.target);
                } else {
                    // Optional: Remove class to re-animate on scroll up
                    // entry.target.classList.remove('is-visible');
                }
            }
            // REMOVED: Number Counter Animation Logic (was targeting .stat-number-v2)
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Observe standard fade-in elements
    const elementsToAnimate = document.querySelectorAll('.fade-in-on-scroll');
    elementsToAnimate.forEach(el => scrollObserver.observe(el));
    // REMOVED: Observation of number counter elements

    // --- 4. Rainwater Calculator Logic (Education Page Specific) ---
    const calculateBtn = document.getElementById('calculateBtn');
    const roofAreaInput = document.getElementById('roofArea');
    const rainfallInput = document.getElementById('rainfall');
    const resultDiv = document.getElementById('calculationResult');

    if (calculateBtn && roofAreaInput && rainfallInput && resultDiv) {
        calculateBtn.addEventListener('click', function() {
            const area = parseFloat(roofAreaInput.value);
            const rain = parseFloat(rainfallInput.value);
            const conversionFactor = 0.623; // Gallons per sq ft per inch of rain

            resultDiv.textContent = '';
            resultDiv.style.opacity = 0;
            resultDiv.classList.remove('text-danger');

            let isValid = true;
            if (isNaN(area) || area <= 0) {
                resultDiv.textContent = 'Please enter a valid roof area (positive number).';
                resultDiv.classList.add('text-danger');
                roofAreaInput.focus();
                isValid = false;
            }
            if (isValid && (isNaN(rain) || rain <= 0)) {
                resultDiv.textContent = 'Please enter valid annual rainfall (positive number).';
                resultDiv.classList.add('text-danger');
                rainfallInput.focus();
                isValid = false;
            }

            if (isValid) {
                const potentialGallons = Math.round(area * rain * conversionFactor);
                setTimeout(() => {
                    resultDiv.textContent = `Estimated Potential: ${potentialGallons.toLocaleString()} Gallons/Year`;
                    resultDiv.style.opacity = 1;
                }, 100);
            } else {
                 resultDiv.style.opacity = 1;
            }
        });
    }

    // --- 5. Footer Year Update (Global) ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- 6. Optional Navbar Scroll Effect ---
    // (Add if needed)

    // --- 7. MINIMAL Bootstrap Form Validation & Modal Feedback (Contact Page V4 Specific) ---
    const contactForm = document.getElementById('contactFormV4'); // Ensure this ID matches your form
    const modalElement = document.getElementById('responseModal');

    // Only proceed if the specific form and modal exist on the page
    if (contactForm && modalElement) {
        const responseModal = new bootstrap.Modal(modalElement); // Create modal instance

        contactForm.addEventListener('submit', event => {
            // Always prevent default for this demo/until backend is ready
            event.preventDefault();
            event.stopPropagation();

            const submitButton = contactForm.querySelector('button[type="submit"]');

            // Remove was-validated BEFORE checking validity to clear previous states
            contactForm.classList.remove('was-validated');

            if (!contactForm.checkValidity()) {
                // If validation fails, add the class to show Bootstrap's HTML error messages
                contactForm.classList.add('was-validated');
            } else {
                // --- FORM IS VALID ---
                // Configure and show the success modal
                const modalTitle = modalElement.querySelector('.modal-title');
                const modalIconDiv = modalElement.querySelector('#modalIcon');
                const modalMessageP = modalElement.querySelector('#modalMessage');

                if (modalTitle) modalTitle.textContent = 'Message Sent!';
                if (modalIconDiv) modalIconDiv.innerHTML = '<i class="fas fa-check-circle" aria-hidden="true"></i>';
                // Corrected message with line break using innerHTML
                if (modalMessageP) modalMessageP.innerHTML = 'Thank you for contacting us.<br>Our team will get back to you shortly.';

                responseModal.show(); // Show the modal

                // Reset the form after showing the modal
                contactForm.reset();

                // Disable button temporarily while modal is shown
                if(submitButton) {
                    submitButton.disabled = true;
                     // Re-enable when modal closes
                     modalElement.addEventListener('hidden.bs.modal', () => {
                         submitButton.disabled = false;
                     }, { once: true }); // Use { once: true } so listener is removed automatically
                }


                // (Optional: Simulate failure by uncommenting and modifying the block below)
                /*
                setTimeout(() => {
                    if (modalTitle) modalTitle.textContent = 'Submission Error';
                    if (modalIconDiv) modalIconDiv.innerHTML = '<i class="fas fa-times-circle" aria-hidden="true"></i>';
                    if (modalMessageP) modalMessageP.innerHTML = 'Sorry, there was an issue sending your message.<br>Please try again later.';
                    responseModal.show(); // Show error modal (or re-show if needed)
                    // Ensure button is enabled on failure simulation
                    if(submitButton) { submitButton.disabled = false; }
                }, 3000); // Simulate after 3 seconds
                */
            }
            // NOTE: 'was-validated' is now only added if checkValidity() is false initially.
            // It's removed before the check and not re-added on success.

        }, false);
    }
    // --- End Minimal Contact Form Logic ---

}); // --- END OF SINGLE DOMContentLoaded LISTENER ---





/* --- END OF CONSOLIDATED JAVASCRIPT --- */
