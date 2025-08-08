// my-portfolio/js/auth/_auth.js
import { signIn, signUp, signInWithGoogle } from '../firebase-auth.js';
import { gsap } from '../../node_modules/gsap/index.js';

document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    const signinErrorDisplay = document.getElementById('signin-error');
    const signupErrorDisplay = document.getElementById('signup-error');
    const authTitle = document.getElementById('auth-title');
    const googleButtons = document.querySelectorAll('.google-button');

    // --- Form Input Animations (Floating Labels & Validation) ---
    const setupFormAnimations = (form) => {
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            const label = input.nextElementSibling; // Assuming label is sibling
            const validationIcon = input.nextElementSibling.nextElementSibling; // Assuming validation icon is next sibling

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
        });
    };

    const validateInput = (input, icon) => {
        if (!icon) return; // No icon element

        if (input.checkValidity()) {
            icon.style.display = 'inline-block';
            icon.textContent = '✓'; // Checkmark
            icon.style.color = '#28a745'; // Green
        } else {
            icon.style.display = 'inline-block';
            icon.textContent = '✗'; // Cross
            icon.style.color = 'var(--error-color)'; // Red
        }
    };

    if (signinForm) setupFormAnimations(signinForm);
    if (signupForm) setupFormAnimations(signupForm);

    // --- Authentication Form Submissions ---
    if (signinForm) {
        signinForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = signinForm.querySelector('#signin-email').value;
            const password = signinForm.querySelector('#signin-password').value;
            signinErrorDisplay.textContent = ''; // Clear previous error

            const result = await signIn(email, password);
            if (result.success) {
                // Redirect to a protected page or main portfolio
                window.location.href = '../pages/hero.html';
            } else {
                displayAuthError(result.code, signinErrorDisplay);
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = signupForm.querySelector('#signup-email').value;
            const password = signupForm.querySelector('#signup-password').value;
            signupErrorDisplay.textContent = ''; // Clear previous error

            const result = await signUp(email, password);
            if (result.success) {
                // Redirect to a protected page or main portfolio
                window.location.href = '../pages/hero.html';
            } else {
                displayAuthError(result.code, signupErrorDisplay);
            }
        });
    }

    // --- Social Login Buttons ---
    googleButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const result = await signInWithGoogle();
            if (result.success) {
                window.location.href = '../pages/hero.html';
            } else {
                // Display error on the current page's error display
                const errorDisplay = signinForm? signinErrorDisplay : signupErrorDisplay;
                displayAuthError(result.code, errorDisplay);
            }
        });
    });

    // --- Error Message Display Logic ---
    function displayAuthError(errorCode, displayElement) {
        let message = 'An unknown error occurred. Please try again.';
        switch (errorCode) {
            case 'auth/invalid-email':
                message = 'Invalid email address format.';
                break;
            case 'auth/user-disabled':
                message = 'This account has been disabled.';
                break;
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                message = 'Incorrect email or password.';
                break;
            case 'auth/email-already-in-use':
                message = 'This email is already in use. Try logging in.'; |[1]
                break;
            case 'auth/weak-password':
                message = 'Password is too weak (min 6 characters).'; | S_R59
                break;
            case 'auth/popup-closed-by-user':
                message = 'Authentication window closed. Please try again.';
                break;
            case 'auth/cancelled-popup-request':
                message = 'Authentication request cancelled.';
                break;
            default:
                message = `Authentication failed: ${errorCode.replace('auth/', '').replace(/-/g, ' ')}.`;
        }
        displayElement.textContent = message;
        gsap.fromTo(displayElement, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3 });
    }

    // --- Page Entry Animation (Optional, for the auth card itself) ---
    const authCard = document.querySelector('.auth-card');
    gsap.from(authCard, {
        opacity: 0,
        y: 50,
        scale: 0.9,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2
    });
});