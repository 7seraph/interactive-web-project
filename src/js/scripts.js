// This file contains JavaScript code to add interactivity to the landing page.
// It handles events such as button clicks to show/hide flyouts, animations, and other interactive features.

document.addEventListener('DOMContentLoaded', function() {
    // Function to toggle the visibility of the flyout
    const toggleFlyout = (flyoutId) => {
        const flyout = document.getElementById(flyoutId);
        if (flyout.style.display === 'block') {
            flyout.style.display = 'none';
        } else {
            flyout.style.display = 'block';
        }
    };

    // Function to navigate to a new page
    const navigateToPage = (pageName) => {
        window.location.href = `${pageName.toLowerCase().replace(/\s+/g, '-')}.html`;
    };

    // Set up button click handlers for navigation
    document.getElementById('infoButton').addEventListener('click', () => navigateToPage('More Info'));
    document.getElementById('courseworkButton').addEventListener('click', () => navigateToPage('Previous Coursework'));
    document.getElementById('applicationsButton').addEventListener('click', () => navigateToPage('Applications'));
    document.getElementById('projectsButton').addEventListener('click', () => navigateToPage('Projects'));

    // Set up button click handlers
    document.getElementById('infoButton').addEventListener('click', () => toggleFlyout('flyout'));
    document.getElementById('courseworkButton').addEventListener('click', () => toggleFlyout('courseworkFlyout'));
    document.getElementById('applicationsButton').addEventListener('click', () => toggleFlyout('applicationsFlyout'));
    document.getElementById('projectsButton').addEventListener('click', () => toggleFlyout('projectsFlyout'));

    // Set up close button handlers
    document.getElementById('closeButton').addEventListener('click', () => toggleFlyout('flyout'));
    document.getElementById('closeCourseworkButton').addEventListener('click', () => toggleFlyout('courseworkFlyout'));
    document.getElementById('closeApplicationsButton').addEventListener('click', () => toggleFlyout('applicationsFlyout'));
    document.getElementById('closeProjectsButton').addEventListener('click', () => toggleFlyout('projectsFlyout'));

    // Close flyouts when clicking outside
    window.addEventListener('click', function(event) {
        const flyouts = document.querySelectorAll('.flyout');
        flyouts.forEach(flyout => {
            if (flyout.style.display === 'block' && !flyout.contains(event.target)) {
                flyout.style.display = 'none';
            }
        });
    });
});