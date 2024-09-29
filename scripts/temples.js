// temples.js

// Set the current year in the footer
const yearElement = document.getElementById('year');
yearElement.textContent = new Date().getFullYear();

// Set the last modified date in the footer
const lastModifiedElement = document.getElementById('last-modified');
lastModifiedElement.textContent = document.lastModified;

// Toggle hamburger menu visibility
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('hidden');
    if (navLinks.classList.contains('hidden')) {
        hamburger.textContent = '☰';
    } else {
        hamburger.textContent = '✖';
    }
});

// Update main heading based on navigation link clicked
const sectionTitle = document.querySelector('.section-title');
const navItems = document.querySelectorAll('#nav-links a');

navItems.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        sectionTitle.textContent = link.textContent; // Update the main heading
    });
});
