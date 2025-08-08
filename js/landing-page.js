// my-portfolio/js/landing-page.js
import Typewriter from '../node_modules/typewriter-effect/dist/core.js';
import { gsap } from '../node_modules/gsap/index.js';

document.addEventListener('DOMContentLoaded', () => {
    const landingTitle = document.getElementById('landing-title');
    const landingActions = document.querySelector('.landing-actions');
    const animatedButtons = landingActions.querySelectorAll('.animated-button');

    // --- Vanta.js Background Initialization ---
    // Ensure Vanta.js and Three.js are loaded globally or via CDN in HTML
    if (window.VANTA) {
        window.VANTA.BIRDS({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            backgroundColor: 0x121212, // Match dark theme background
            color1: 0x22D3EE, // Neon Cyan
            color2: 0x4A90E2, // Muted Blue
            quantity: 3.00,
            birdSize: 1.50,
            wingSpan: 20.00,
            speedLimit: 4.00,
            separation: 50.00,
            alignment: 40.00,
            cohesion: 40.00
        });
    } else {
        console.warn("Vanta.js not loaded. Ensure script tags are correct.");
        // Fallback: Set a static background color if Vanta.js fails to load
        document.body.style.backgroundColor = 'var(--bg-primary)';
    }

    // --- Typewriter Effect for Landing Title ---
    new Typewriter(landingTitle, {
        strings: ,
        autoStart: true,
        loop: false, // Only type once
        delay: 75,
        deleteSpeed: 30,
        cursor: '|',
        wrapperClassName: 'typewriter-wrapper', // Apply styles to this
        cursorClassName: 'typewriter-cursor',
        // Callback after typing is complete
        onComplete: function (self) {
            // Animate buttons in after typing
            gsap.to(animatedButtons, {
                opacity: 1,
                y: 0,
                stagger: 0.2, // Stagger the animation for each button
                duration: 0.8,
                ease: "power3.out"
            });
            // Remove cursor animation after typing is done
            landingTitle.style.borderRight = 'none';
            landingTitle.style.animation = 'none';
        }
    }).start();

    // --- GSAP Animations for Text Reveal (Optional, if not using Typewriter for full reveal) ---
    // If you wanted a different text reveal, e.g., clip-path, you'd use GSAP here.
    // Example:
    // gsap.from(landingTitle, {
    //     clipPath: 'inset(0 0 100% 0)',
    //     duration: 1.5,
    //     ease: 'power4.out',
    //     delay: 0.5 // After Vanta.js might load
    // });
});