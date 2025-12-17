/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// Resume gating: hide resume content until user clicks Resume
function showResume() {
    const wrap = document.getElementById('resume-wrapper');
    if (!wrap) return;
    wrap.style.display = '';
    sessionStorage.setItem('resume_unlocked', '1');
}

function revealResume(targetId) {
    showResume();
    if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
            setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
        }
    }
}

// On load, if session indicates resume unlocked, show it. Otherwise keep hidden and ensure landing remains visible.
window.addEventListener('load', () => {
    const unlocked = sessionStorage.getItem('resume_unlocked') === '1';
    const wrap = document.getElementById('resume-wrapper');
    if (wrap) {
        if (unlocked) {
            wrap.style.display = '';
        } else {
            // If user tried to land directly on a resume anchor, force stay at top (home)
            if (location.hash && location.hash !== '#home') {
                history.replaceState(null, '', location.pathname + location.search + '#home');
                window.scrollTo(0,0);
            }
        }
    }
});
