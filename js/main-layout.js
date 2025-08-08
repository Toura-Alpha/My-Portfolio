// my-portfolio/js/main-layout.js
import { observeAuthState, signOutUser } from './firebase-auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const authLink = document.getElementById('auth-link');
    const logoutButton = document.getElementById('logout-button');
    const siteHeader = document.querySelector('.site-header');

    // --- Theme Toggling Logic ---
    const currentTheme = localStorage.getItem('theme');

    // Apply saved theme or detect system preference on initial load
    if (currentTheme) {
        document.body.classList.add(currentTheme);
    } else {
        // Check user's system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            localStorage.setItem('theme', 'light-theme'); // Explicitly set light as default
        }
    }

    themeToggleButton.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light-theme');
        } else {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        }
    });

    // --- Sticky Header with Shrink/Shadow Effect ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Adjust scroll threshold as needed
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    });

    // --- Firebase Authentication State Observer (for header links) ---
    observeAuthState((user) => {
        if (user) {
            // User is signed in
            authLink.classList.add('hidden');
            logoutButton.classList.remove('hidden');
            console.log('User is logged in:', user.email);
            // Optionally update authLink text to "Welcome, [User Email]" or similar
        } else {
            // User is signed out
            authLink.classList.remove('hidden');
            logoutButton.classList.add('hidden');
            console.log('User is logged out.');
        }
    });

    // --- Logout Button Event Listener ---
    logoutButton.addEventListener('click', async () => {
        const result = await signOutUser();
        if (result.success) {
            console.log('Logged out successfully from UI.');
            // Redirect to landing page or signin page after logout
            window.location.href = '../auth/signin.html';
        } else {
            alert('Error logging out: ' + result.error);
        }
    });

    // --- Active Navigation Link Highlighting ---
    const navLinks = document.querySelectorAll('.main-nav.nav-link');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        // Get the href relative to the 'pages' directory
        const linkPath = link.getAttribute('href');
        if (currentPath.includes(linkPath)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});