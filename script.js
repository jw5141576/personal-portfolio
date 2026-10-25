
// Feature 1: Mobile Navigation

const menuToggle = document.getElementById("menu-toggle");
const mainNavigation = document.getElementById("main-navigation");

if (menuToggle && mainNavigation) {
    // Open and close the menu
    menuToggle.addEventListener("click", () => {
        const isOpen = mainNavigation.classList.toggle("is-open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Close the menu after a navigation link is selected
    mainNavigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mainNavigation.classList.remove("is-open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.textContent = "☰";
        });
    });

    // Reset the menu when returning to desktop width
    window.addEventListener("resize", () => {
        if (window.innerWidth > 1100) {
            mainNavigation.classList.remove("is-open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.textContent = "☰";
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && mainNavigation.classList.contains("is-open")) {
            mainNavigation.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.textContent = "☰";
            menuToggle.focus();
        }
    });
}

// Feature 2: Active Navigation Highlight

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navigationLinks = document.querySelectorAll(
        '#main-navigation a[href^="#"]'
    );

    if (!sections.length || !navigationLinks.length) {
        return;
    }

    function updateActiveLink() {
        let currentSectionId = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                currentSectionId = section.id;
            }
        });

        navigationLinks.forEach((link) => {
            const isActive =
                link.getAttribute("href") === `#${currentSectionId}`;

            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    window.addEventListener("load", updateActiveLink);

    navigationLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const targetId = link.getAttribute("href").slice(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                navigationLinks.forEach((navLink) => {
                    navLink.classList.remove("active");
                    navLink.removeAttribute("aria-current");
                });

                link.classList.add("active");
                link.setAttribute("aria-current", "location");
            }
        });
    });

    updateActiveLink();
});

// Feature 3: Scroll Reveal Animations

document.addEventListener("DOMContentLoaded", () => {
    const prefersReducedMotion = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Select sections and card classes used by the current markup.
    const revealElements = document.querySelectorAll(
        "#about, #skills, #education, #projects, " +
        "#services, #networks, #contacts, " +
        ".skill-card, .project-card, .services-section > .container"
    );

    // Avoid animations for visitors who prefer reduced motion
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        return;
    }

    // Add the reveal class to the selected elements
    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });

    // Reveal elements as they enter the viewport
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
});

// Feature 4: Project Filtering

document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projects = document.querySelectorAll(
        ".project-card[data-category]"
    );

    // Stop if the filter controls or categorized projects are missing
    if (!filterButtons.length || !projects.length) {
        return;
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter;

            // Update the selected button
            filterButtons.forEach((filterButton) => {
                const isActive = filterButton === button;

                filterButton.classList.toggle("active", isActive);
                filterButton.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );
            });

            // Show matching projects
            projects.forEach((project) => {
                const matchesFilter =
                    selectedFilter === "all" ||
                    project.dataset.category === selectedFilter;

                project.classList.toggle(
                    "filter-hidden",
                    !matchesFilter
                );
            });
        });
    });
});

// Feature 5: Contact Form Validation

document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");

    if (!contactForm) {
        return;
    }

    const fields = {
        name: document.getElementById("contact-name"),
        email: document.getElementById("contact-email"),
        subject: document.getElementById("contact-subject"),
        message: document.getElementById("contact-message")
    };

    const statusMessage = document.getElementById("form-status");
    const submitButton = document.getElementById("contact-submit");

    const errorElements = {
        name: document.getElementById("name-error"),
        email: document.getElementById("email-error"),
        subject: document.getElementById("subject-error"),
        message: document.getElementById("message-error")
    };

    function showFieldError(fieldName, message) {
        const field = fields[fieldName];
        const errorElement = errorElements[fieldName];

        if (!field || !errorElement) {
            return;
        }

        errorElement.textContent = message;
        field.setAttribute("aria-invalid", String(Boolean(message)));
    }

    function validateField(fieldName) {
        const field = fields[fieldName];

        if (!field) {
            return true;
        }

        const value = field.value.trim();
        let error = "";

        if (!value) {
            error = "This field is required.";
        } else if (
            fieldName === "name" &&
            value.length < 2
        ) {
            error = "Please enter at least 2 characters.";
        } else if (
            fieldName === "email" &&
            !field.validity.valid
        ) {
            error = "Please enter a valid email address.";
        } else if (
            fieldName === "subject" &&
            value.length < 3
        ) {
            error = "Please enter a subject of at least 3 characters.";
        } else if (
            fieldName === "message" &&
            value.length < 10
        ) {
            error = "Your message must contain at least 10 characters.";
        }

        showFieldError(fieldName, error);

        return error === "";
    }

    // Validate a field when the visitor leaves it
    Object.keys(fields).forEach((fieldName) => {
        const field = fields[fieldName];

        if (field) {
            field.addEventListener("blur", () => {
                validateField(fieldName);
            });

            field.addEventListener("input", () => {
                if (field.getAttribute("aria-invalid") === "true") {
                    validateField(fieldName);
                }
            });
        }
    });

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        statusMessage.textContent = "";
        statusMessage.className = "form-status";

        const fieldNames = Object.keys(fields);
        const invalidFields = fieldNames.filter(
            (fieldName) => !validateField(fieldName)
        );

        if (invalidFields.length > 0) {
            statusMessage.textContent =
                "Please correct the highlighted fields before continuing.";
            statusMessage.classList.add("error");

            const firstInvalidField = fields[invalidFields[0]];

            if (firstInvalidField) {
                firstInvalidField.focus();
            }

            return;
        }

        // Validation succeeded, but no message has been sent.
        statusMessage.textContent =
            "Validation successful! Your details are ready. Email delivery has not been configured yet.";
        statusMessage.classList.add("success");

        // No network request is made by this validation-only feature.
    });
});

// Feature 6: Back-to-Top Button

document.addEventListener("DOMContentLoaded", () => {
    const backToTopButton = document.getElementById("back-to-top");

    if (!backToTopButton) {
        return;
    }

    // Show the button after the visitor scrolls down
    function updateBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add("is-visible");
        } else {
            backToTopButton.classList.remove("is-visible");
        }
    }

    // Return to the top when clicked
    backToTopButton.addEventListener("click", () => {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "auto" : "smooth"
        });
    });

    // Update button visibility while scrolling
    window.addEventListener("scroll", updateBackToTopButton, {
        passive: true
    });

    // Set the correct initial visibility
    updateBackToTopButton();
});

// Feature 7: Dynamic Copyright Year

document.addEventListener("DOMContentLoaded", () => {
    const copyrightYear = document.getElementById("copyright-year");

    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
});