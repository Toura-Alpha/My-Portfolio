// my-portfolio/js/pages/_hero.js
import Typewriter from '../../node_modules/typewriter-effect/dist/core.js';
import { gsap } from '../../node_modules/gsap/index.js';
import { ScrollTrigger } from '../../node_modules/gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('hero-main');
    const heroBackgroundElements = heroSection.querySelector('.hero-background-elements');
    const heroTitle = heroSection.querySelector('.name-reveal');
    const heroTagline = document.getElementById('hero-tagline');
    const ctaButton = heroSection.querySelector('.cta-button');

    // --- Initial Hero Content Animation (GSAP) ---
    gsap.from(heroTitle, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        delay: 0.5
    });

    // --- Typewriter Effect for Tagline ---
    new Typewriter(heroTagline, {
        strings:,
        autoStart: true,
        loop: true, // Loop the typewriter effect
        delay: 50,
        deleteSpeed: 20,
        pauseFor: 2000, // Pause before deleting and typing next string
        cursor: '|',
        onComplete: function (self) {
            // Ensure CTA button animates in after first string is typed
            gsap.to(ctaButton, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.2 // Small delay after tagline appears
            });
        }
    }).start();

    // --- Parallax Scrolling Effect for Background Elements (GSAP ScrollTrigger) ---
    gsap.to(heroBackgroundElements, {
        yPercent: 20, // Move background 20% slower than foreground
        ease: "none",
        scrollTrigger: {
            trigger: heroSection,
            start: "top top", // Start when top of hero hits top of viewport
            end: "bottom top", // End when bottom of hero hits top of viewport
            scrub: true, // Link animation to scroll position
            // markers: true // For debugging
        }
    });

    // --- CTA Button Initial State (hidden, then revealed by Typewriter onComplete) ---
    gsap.set(ctaButton, { opacity: 0, y: 20 });

    // --- Mouse-based Parallax for Hero Content (Optional, subtle effect) ---
    // This makes the content slightly shift with mouse movement
    heroSection.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20; // -10 to 10
        const y = (e.clientY / window.innerHeight - 0.5) * 20; // -10 to 10

        gsap.to(heroContent, {
            x: x,
            y: y,
            duration: 0.5,
            ease: "power1.out"
        });
    });
});