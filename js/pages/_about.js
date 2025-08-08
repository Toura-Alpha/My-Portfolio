// my-portfolio/js/pages/_about.js
import { gsap } from '../../node_modules/gsap/index.js';
import { ScrollTrigger } from '../../node_modules/gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.getElementById('about-me');
    const sectionTitle = aboutSection.querySelector('.section-title');
    const profilePhotoContainer = aboutSection.querySelector('.profile-photo-container');
    const bioTextParagraphs = aboutSection.querySelectorAll('.bio-text p');

    // --- Scroll-Triggered Reveal for Section Title ---
    gsap.from(sectionTitle, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
            trigger: sectionTitle,
            start: "top 80%", // When top of element is 80% down the viewport
            toggleActions: "play none none none", // Play animation once
            // markers: true
        }
    });

    // --- Scroll-Triggered Staggered Reveal for About Content ---
    // Animate photo and bio text simultaneously, with bio paragraphs staggered
    const aboutElements =;

    gsap.from(aboutElements, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15, // Stagger for each element
        scrollTrigger: {
            trigger: aboutSection,
            start: "top 60%", // When top of section is 60% down the viewport
            toggleActions: "play none none none",
            // markers: true
        }
    });

    // --- Profile Photo 3D Tilt Effect (CSS handles hover, JS can enhance) ---
    // If you want a more advanced JS-driven tilt (e.g., based on mouse position within the element)
    // you would use GSAP's `to` on mousemove or a library like `tilt.js` (which requires jQuery).
    // For now, CSS handles the basic hover tilt.
});