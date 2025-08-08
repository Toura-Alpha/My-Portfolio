// my-portfolio/js/pages/_projects.js
import { gsap } from '../../node_modules/gsap/index.js';
import { ScrollTrigger } from '../../node_modules/gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const projectsSection = document.getElementById('projects-section');
    const sectionTitle = projectsSection.querySelector('.section-title');
    const projectCards = projectsSection.querySelectorAll('.project-card');
    const projectDetailModal = document.getElementById('project-detail-modal');
    const closeModalButton = projectDetailModal.querySelector('.close-button');

    // --- Sample Project Data (replace with actual data or fetch from data/projects.json) ---
    const projectsData =;

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

    // --- Scroll-Triggered Staggered Reveal for Project Cards ---
    projectCards.forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.1, // Stagger each card
            scrollTrigger: {
                trigger: card,
                start: "top 80%", // When top of card is 80% down the viewport
                toggleActions: "play none none none",
                // markers: true,
                onEnter: () => {
                    // Trigger image reveal animation when card enters view
                    const imageOverlay = card.querySelector('.image-overlay');
                    if (imageOverlay) {
                        gsap.to(imageOverlay, {
                            clipPath: 'inset(0 0 0% 0)', // Reveal from bottom
                            duration: 1,
                            ease: "power4.out"
                        });
                    }
                },
                onLeaveBack: () => {
                    // Reset image reveal when scrolling back up (optional)
                    const imageOverlay = card.querySelector('.image-overlay');
                    if (imageOverlay) {
                        gsap.set(imageOverlay, { clipPath: 'inset(0 0 100% 0)' });
                    }
                }
            }
        });
    });

    // --- Project Detail Modal Logic ---
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = parseInt(card.dataset.projectId);
            const project = projectsData.find(p => p.id === projectId);

            if (project) {
                document.getElementById('modal-project-title').textContent = project.title;
                document.getElementById('modal-project-image').src = project.image;
                document.getElementById('modal-project-problem').innerHTML = `**Problem:** ${project.problem}`;
                document.getElementById('modal-project-contribution').innerHTML = `**My Contribution:** ${project.contribution}`;
                document.getElementById('modal-project-technologies').innerHTML = `**Technologies:** ${project.technologies}`;
                document.getElementById('modal-project-solution').innerHTML = `**Solution:** ${project.solution}`;
                document.getElementById('modal-project-impact').innerHTML = `**Impact:** ${project.impact}`;

                const demoLink = document.getElementById('modal-demo-link');
                const codeLink = document.getElementById('modal-code-link');

                demoLink.href = project.demoLink;
                codeLink.href = project.codeLink;

                // Show/hide links based on availability
                if (project.demoLink && project.demoLink!== '#') {
                    demoLink.style.display = 'inline-block';
                } else {
                    demoLink.style.display = 'none';
                }
                if (project.codeLink && project.codeLink!== '#') {
                    codeLink.style.display = 'inline-block';
                } else {
                    codeLink.style.display = 'none';
                }

                projectDetailModal.classList.add('visible');
                document.body.style.overflow = 'hidden'; // Prevent scrolling background
            }
        });
    });

    closeModalButton.addEventListener('click', () => {
        projectDetailModal.classList.remove('visible');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close modal if clicking outside content
    projectDetailModal.addEventListener('click', (event) => {
        if (event.target === projectDetailModal) {
            projectDetailModal.classList.remove('visible');
            document.body.style.overflow = '';
        }
    });

    // --- 3D Tilt Effect (if using a library like tilt.js) ---
    // If you included tilt.js in your HTML, you'd initialize it here:
    // $('.tilt-effect').tilt({
    //     maxTilt: 10,
    //     perspective: 1000,
    //     easing: "cubic-bezier(.03,.98,.52,.99)",
    //     speed: 500,
    //     glare: true,
    //     maxGlare: 0.5,
    //     scale: 1.05
    // });
});