// my-portfolio/js/pages/_skills.js
import { gsap } from '../../node_modules/gsap/index.js';
import { ScrollTrigger } from '../../node_modules/gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.getElementById('skills-section');
    const sectionTitle = skillsSection.querySelector('.section-title');
    const filterButtons = skillsSection.querySelectorAll('.filter-button');
    const skillItems = skillsSection.querySelectorAll('.skill-item');

    // --- Scroll-Triggered Reveal for Section Title ---
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

    // --- Scroll-Triggered Staggered Reveal for Skill Items ---
    gsap.from(skillItems, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08, // Stagger the animation for each skill item
        scrollTrigger: {
            trigger: skillsSection,
            start: "top 60%",
            toggleActions: "play none none none",
            // markers: true
        }
    });

    // --- Skill Filtering Logic ---
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterCategory = button.dataset.filter;

            skillItems.forEach(item => {
                const itemCategory = item.dataset.category;

                if (filterCategory === 'all' |

| itemCategory === filterCategory) {
                    // Show item with animation
                    gsap.to(item, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        height: 'auto',
                        padding: '20px',
                        margin: '0 0 25px 0', // Restore margin if needed
                        duration: 0.5,
                        ease: "power3.out",
                        clearProps: "all" // Clear GSAP inline styles after animation
                    });
                    item.classList.remove('hidden-by-filter');
                } else {
                    // Hide item with animation
                    gsap.to(item, {
                        opacity: 0,
                        y: 20,
                        scale: 0.8,
                        height: 0,
                        padding: 0,
                        margin: 0,
                        duration: 0.3,
                        ease: "power2.in",
                        onComplete: () => {
                            item.classList.add('hidden-by-filter');
                        }
                    });
                }
            });
        });
    });
});