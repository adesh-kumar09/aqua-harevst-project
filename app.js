// --- START OF app.js ---

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed."); // General check

    // --- Global Code (Runs on potentially multiple pages) ---

    // 1. Scroll to Top Button Logic
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (scrollToTopBtn) {
        const scrollThreshold = 300;
        function toggleScrollTopButton() {
            // Check if button still exists in DOM before manipulating
            const btn = document.getElementById("scrollToTopBtn");
            if (!btn) return;
            if (window.scrollY > scrollThreshold) { btn.classList.add("show"); }
            else { btn.classList.remove("show"); }
        }
        function scrollToTop(event) {
            if (event) event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        window.addEventListener("scroll", toggleScrollTopButton);
        scrollToTopBtn.addEventListener("click", scrollToTop);
        toggleScrollTopButton(); // Initial check
        console.log("ScrollToTop initialized.");
    } else {
        // console.log("ScrollToTop button not found on this page.");
    }

    // 2. Intersection Observer for Animations
    const elementsToAnimate = document.querySelectorAll('.fade-in-on-scroll');
    if (elementsToAnimate.length > 0) {
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // observer.unobserve(entry.target); // Optional: Stop observing after first animation
                }
                // else { entry.target.classList.remove('is-visible'); } // Optional: Re-animate
            });
        };
        const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);
        elementsToAnimate.forEach(el => scrollObserver.observe(el));
        console.log("IntersectionObserver initialized for animations.");
    } else {
       // console.log("No elements found for scroll animation.");
    }

    // 3. Footer Year Update
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
        console.log("Footer year updated.");
    } else {
       // console.log("Footer year element not found.");
    }


    // --- Page-Specific Code ---

    // 4. Rainwater Calculator Logic (Education Page)
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) { // Check if the calculator button exists
        const roofAreaInput = document.getElementById('roofArea');
        const rainfallInput = document.getElementById('rainfall');
        const resultDiv = document.getElementById('calculationResult');

        if (roofAreaInput && rainfallInput && resultDiv) {
            calculateBtn.addEventListener('click', function () {
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
                    if (roofAreaInput) roofAreaInput.focus();
                    isValid = false;
                }
                if (isValid && (isNaN(rain) || rain <= 0)) {
                    resultDiv.textContent = 'Please enter valid annual rainfall (positive number).';
                    resultDiv.classList.add('text-danger');
                    if (rainfallInput) rainfallInput.focus();
                    isValid = false;
                }

                if (isValid) {
                    const potentialGallons = Math.round(area * rain * conversionFactor);
                    setTimeout(() => {
                        resultDiv.textContent = `Estimated Potential: ${potentialGallons.toLocaleString()} Gallons/Year`;
                        resultDiv.style.opacity = 1;
                    }, 100);
                } else {
                    resultDiv.style.opacity = 1; // Show error message
                }
            });
            console.log("Calculator logic initialized.");
        } else {
            console.warn("Calculator elements (input/result) missing, though button exists.");
        }
    } else {
       // console.log("Calculator button not found on this page.");
    }

    // 5. Contact Form Logic (Contact Page)
    const contactForm = document.getElementById('contactFormV4');
    if (contactForm) { // Check if the contact form exists
        const modalElement = document.getElementById('responseModal');
        if (modalElement && typeof bootstrap !== 'undefined') {
            // Use getOrCreateInstance for robustness
            const responseModal = bootstrap.Modal.getOrCreateInstance(modalElement);

            contactForm.addEventListener('submit', event => {
                event.preventDefault(); // Prevent default form submission/reload
                // event.stopPropagation(); // Usually not needed here, removed.

                const submitButton = contactForm.querySelector('button[type="submit"]');
                contactForm.classList.remove('was-validated'); // Clear previous validation state

                if (!contactForm.checkValidity()) {
                    contactForm.classList.add('was-validated'); // Show Bootstrap validation feedback
                } else {
                    // --- FORM IS VALID ---
                    console.log("Contact form is valid. Showing modal.");
                    const modalTitle = modalElement.querySelector('.modal-title');
                    const modalIconDiv = modalElement.querySelector('#modalIcon');
                    const modalMessageP = modalElement.querySelector('#modalMessage');

                    // Set success content
                    if (modalTitle) modalTitle.textContent = 'Message Sent!';
                    if (modalIconDiv) modalIconDiv.innerHTML = '<i class="fas fa-check-circle fa-3x text-success" aria-hidden="true"></i>'; // Added fa-3x for size
                    if (modalMessageP) modalMessageP.innerHTML = 'Thank you for contacting us.<br>Our team will get back to you shortly.';

                    responseModal.show(); // Show the modal
                    contactForm.reset(); // Reset form fields

                    // Disable submit button while modal is shown
                    if (submitButton) {
                        submitButton.disabled = true;
                        // Re-enable button *after* modal is hidden
                        modalElement.addEventListener('hidden.bs.modal', () => {
                            // Check again in case button removed from DOM while modal was open
                            const currentSubmitButton = contactForm.querySelector('button[type="submit"]');
                            if (currentSubmitButton) currentSubmitButton.disabled = false;
                        }, { once: true }); // Use { once: true } so listener removes itself
                    }

                    // --- Optional Failure Simulation (Keep commented out for production) ---
                    /*
                    setTimeout(() => {
                        if (modalTitle) modalTitle.textContent = 'Submission Error';
                        if (modalIconDiv) modalIconDiv.innerHTML = '<i class="fas fa-times-circle fa-3x text-danger" aria-hidden="true"></i>'; // Added fa-3x
                        if (modalMessageP) modalMessageP.innerHTML = 'Sorry, there was an issue sending your message.<br>Please try again later.';
                        responseModal.show();
                        if(submitButton) { submitButton.disabled = false; } // Re-enable on failure too
                    }, 3000);
                    */
                }
            }, false);
            console.log("Contact form logic initialized.");
        } else {
            console.error("Contact form response modal or Bootstrap JS missing.");
        }
    } else {
       // console.log("Contact form not found on this page.");
    }


    // 6. Product Filtering, Sorting & Modal Logic (Product Listing Pages)
    const productFilterForm = document.getElementById('productFilterForm');
    if (productFilterForm) { // Check if the product filter form exists
        console.log("Product filter script initializing...");
        const productSearchInput = document.getElementById('productSearchInput');
        const productCategoryFilter = document.getElementById('productCategoryFilter');
        const productSortFilter = document.getElementById('productSortFilter');
        const productListRow = document.getElementById('productListRow');
        const noProductsMessage = document.getElementById('noProductsMessage');
        const productDetailModalEl = document.getElementById('productDetailModal'); // Get element first

        if (productListRow && productSearchInput && productCategoryFilter && productSortFilter && noProductsMessage) {
            const allProductCols = Array.from(productListRow.querySelectorAll('.col.product-col'));
            console.log(`Found ${allProductCols.length} initial product columns.`);

            function sortAndFilterProducts() {
                console.log("Running sortAndFilterProducts...");
                const searchTerm = productSearchInput.value.toLowerCase().trim();
                const selectedCategory = productCategoryFilter.value;
                const selectedSort = productSortFilter.value;
                let visibleProductCols = [];

                // Filter logic...
                allProductCols.forEach(col => {
                    const card = col.querySelector('.product-card');
                    if (!card) return;
                    const productName = card.dataset.name ? card.dataset.name.toLowerCase() : '';
                    const productCategory = card.dataset.category ? card.dataset.category : '';
                    const searchMatch = searchTerm === '' || productName.includes(searchTerm);
                    const categoryMatch = selectedCategory === 'all' || productCategory === selectedCategory;
                    if (searchMatch && categoryMatch) {
                        visibleProductCols.push(col);
                        col.style.display = '';
                    } else {
                        col.style.display = 'none';
                    }
                });
                console.log(`Filtering complete. ${visibleProductCols.length} products match.`);

                // Sort logic...
                if (selectedSort !== 'default') {
                    visibleProductCols.sort((colA, colB) => {
                        const cardA = colA.querySelector('.product-card');
                        const cardB = colB.querySelector('.product-card');
                        const priceA = parseFloat(cardA?.dataset.price || 0);
                        const priceB = parseFloat(cardB?.dataset.price || 0);
                        const nameA = cardA?.dataset.name || '';
                        const nameB = cardB?.dataset.name || '';

                        switch (selectedSort) {
                            case 'price-asc': return priceA - priceB;
                            case 'price-desc': return priceB - priceA;
                            case 'name-asc': return nameA.localeCompare(nameB);
                            case 'name-desc': return nameB.localeCompare(nameA);
                            default: return 0;
                        }
                    });
                    console.log(`Products sorted by ${selectedSort}.`);
                }

                // Re-append logic...
                productListRow.innerHTML = '';
                visibleProductCols.forEach(col => productListRow.appendChild(col));
                console.log("DOM updated with filtered/sorted products.");

                // No products message logic...
                noProductsMessage.style.display = visibleProductCols.length === 0 ? 'block' : 'none';
            }

            // Event Listener for Apply Button
            productFilterForm.addEventListener('submit', (event) => {
                event.preventDefault();
                console.log("Apply button clicked (form submitted).");
                sortAndFilterProducts();
            });

            // Optional: Initial run if needed
            // sortAndFilterProducts();

        } else {
            console.warn("One or more product filter/list elements are missing.");
        }

        // Product Detail Modal Population Logic (Still part of product page logic)
        if (productDetailModalEl && typeof bootstrap !== 'undefined') {
            console.log("Product detail modal listener attached.");
            // Get modal instance once
            const productDetailModalInstance = bootstrap.Modal.getOrCreateInstance(productDetailModalEl);

            productDetailModalEl.addEventListener('show.bs.modal', function (event) {
                console.log("Product detail modal 'show.bs.modal' event triggered.");
                const button = event.relatedTarget;
                if (!button || !button.classList.contains('view-details-btn')) {
                     console.warn("Modal triggered, but not by a view-details button.");
                     return;
                }

                const card = button.closest('.product-card');
                if (!card) {
                    console.error("Could not find parent '.product-card' for the clicked button.");
                    return;
                }

                // Extract data from card...
                const name = card.dataset.name || 'N/A';
                const price = parseFloat(card.dataset.price || 0);
                const imageElement = card.querySelector('.product-image');
                const categoryElement = card.querySelector('.category-tag');
                const descriptionElement = card.querySelector('.description');
                const imageSrc = imageElement ? imageElement.src : 'images/placeholder.jpg';
                const categoryDisplay = categoryElement ? categoryElement.textContent : 'N/A';
                const description = descriptionElement ? descriptionElement.textContent : 'No description available.';

                // Get modal elements... (use productDetailModalEl as context)
                const modalTitle = productDetailModalEl.querySelector('#productDetailModalLabel');
                const modalImage = productDetailModalEl.querySelector('#modalProductImage');
                const modalCategory = productDetailModalEl.querySelector('#modalProductCategory');
                const modalDescription = productDetailModalEl.querySelector('#modalProductDescription');
                const modalPrice = productDetailModalEl.querySelector('#modalProductPrice');
                const modalProductName = productDetailModalEl.querySelector('#modalProductName');

                // Update modal content...
                if (modalTitle) modalTitle.textContent = name;
                if (modalProductName) modalProductName.textContent = name;
                if (modalImage) { modalImage.src = imageSrc; modalImage.alt = name; }
                if (modalCategory) modalCategory.textContent = `Category: ${categoryDisplay}`;
                if (modalDescription) modalDescription.textContent = description;
                // Format price according to PKR
                if (modalPrice) {
                     modalPrice.textContent = price > 0
                        ? `PKR ${price.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` // Basic PKR formatting
                        : 'Price not available';
                }

                console.log(`Product detail modal populated for: ${name}`);
            });
        } else {
            console.warn("Product detail modal element or Bootstrap JS missing.");
        }

    } else {
       // console.log("Product filter form not found on this page.");
    }


}); // --- END OF SINGLE DOMContentLoaded LISTENER ---

// --- END OF app.js ---
