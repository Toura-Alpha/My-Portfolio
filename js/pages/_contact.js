// my-portfolio/js/pages/_contact.js
import { gsap } from '../../node_modules/gsap/index.js';
import { ScrollTrigger } from '../../node_modules/gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const contactSection = document.getElementById('contact-section');
    const sectionTitle = contactSection.querySelector('.section-title');
    const contactIntro = contactSection.querySelector('.contact-intro');
    const contactInfo = contactSection.querySelector('.contact-info');
    const contactFormContainer = contactSection.querySelector('.contact-form-container');
    const contactForm = document.getElementById('contact-form');
    const formGroups = contactForm.querySelectorAll('.form-group');
    const copyButton = document.querySelector('.copy-button');
    const copyConfirmation = document.getElementById('copy-confirmation');
    const formStatusMessage = document.getElementById('form-status');

    // --- Scroll-Triggered Reveal for Section Title & Intro ---
    gsap.from(sectionTitle, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
            trigger: sectionTitle,
            start: "top 80%",
            toggleActions: "play none none none",
        }
    });

    gsap.from(contactIntro, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: {
            trigger: contactIntro,
            start: "top 85%",
            toggleActions: "play none none none",
        }
    });

    // --- Scroll-Triggered Reveal for Contact Info and Form ---
    gsap.from([contactInfo, contactFormContainer], {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2, // Stagger info and form
        scrollTrigger: {
            trigger: contactSection,
            start: "top 60%",
            toggleActions: "play none none none",
        }
    });

    // --- Form Input Animations (Floating Labels & Validation) ---
    formGroups.forEach((group, index) => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('.floating-label');
        const validationIcon = group.querySelector('.validation-icon');

        // Initial check for pre-filled inputs (e.g., browser autofill)
        if (input.value!== '') {
            label.classList.add('active');
        }

        input.addEventListener('focus', () => {
            label.classList.add('active');
            gsap.to(input, { borderColor: 'var(--input-focus-border)', duration: 0.2 });
        });

        input.addEventListener('blur', () => {
            if (input.value === '') {
                label.classList.remove('active');
            }
            gsap.to(input, { borderColor: 'var(--border-color)', duration: 0.2 });
            validateInput(input, validationIcon);
        });

        input.addEventListener('input', () => {
            validateInput(input, validationIcon);
        });

        // Staggered reveal for form groups
        gsap.from(group, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out",
            delay: index * 0.1, // Stagger each form group
            scrollTrigger: {
                trigger: contactForm,
                start: "top 75%",
                toggleActions: "play none none none",
            }
        });
    });

    function validateInput(input, icon) {
        if (!icon) return;

        if (input.checkValidity()) {
            icon.style.display = 'inline-block';
            icon.textContent = '✓'; // Checkmark
            icon.style.color = '#28a745'; // Green
        } else {
            icon.style.display = 'inline-block';
            icon.textContent = '✗'; // Cross
            icon.style.color = 'var(--error-color)'; // Red
        }
    }

    // --- Copy Email Button ---
    if (copyButton) {
        copyButton.addEventListener('click', async () => {
            const emailToCopy = copyButton.dataset.email;
            try {
                await navigator.clipboard.writeText(emailToCopy);
                copyConfirmation.textContent = 'Email copied!';
                gsap.fromTo(copyConfirmation, { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.3 });
                gsap.to(copyConfirmation, { opacity: 0, y: -5, duration: 0.3, delay: 2 });
            } catch (err) {
                console.error('Failed to copy email: ', err);
                copyConfirmation.textContent = 'Failed to copy!';
                gsap.fromTo(copyConfirmation, { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.3 });
                gsap.to(copyConfirmation, { opacity: 0, y: -5, duration: 0.3, delay: 2 });
            }
        });
    }

    // --- Contact Form Submission (Placeholder) ---
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        formStatusMessage.classList.remove('success', 'error');
        formStatusMessage.textContent = 'Sending...';
        gsap.to(formStatusMessage, { opacity: 1, duration: 0.3 });

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        console.log('Form submitted:', data);

        // In a real application, you would send this data to a backend service (e.g., Firebase Cloud Functions, EmailJS, etc.)
        // Example success/error logic:
        const success = Math.random() > 0.3; // Simulate success/failure

        if (success) {
            formStatusMessage.textContent = 'Message sent successfully!';
            formStatusMessage.classList.add('success');
            contactForm.reset(); // Clear form fields
            formGroups.forEach(group => {
                const label = group.querySelector('.floating-label');
                const icon = group.querySelector('.validation-icon');
                if (label) label.classList.remove('active');
                if (icon) icon.style.display = 'none';
            });
        } else {
            formStatusMessage.textContent = 'Failed to send message. Please try again.';
            formStatusMessage.classList.add('error');
        }
        gsap.to(formStatusMessage, { opacity: 1, duration: 0.3 });
    });
});