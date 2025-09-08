const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 80) {
        // Scrolling down
        navbar.classList.add('hide-navbar');
    } else {
        // Scrolling up
        navbar.classList.remove('hide-navbar');
    }
    lastScrollY = window.scrollY;
});

const themeSwitcher = document.getElementById('theme-switcher');
const themeClose = document.getElementById('theme-close');
const themeOpen = document.getElementById('theme-open');
const darkThemeBtn = document.getElementById('dark-theme-btn');

themeClose.onclick = function() {
    themeSwitcher.style.display = 'none';
    themeOpen.style.display = 'flex';
};
themeOpen.onclick = function() {
    themeSwitcher.style.display = 'flex';
    themeOpen.style.display = 'none';
};

// Dark theme toggle with persistence
darkThemeBtn.onclick = function() {
    document.body.classList.toggle('dark-theme');
    // Save theme preference
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
};

// On page load, apply saved theme and hide theme switcher
window.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
    // Hide theme switcher and show open button by default
    themeSwitcher.style.display = 'none';
    themeOpen.style.display = 'flex';
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    const message = document.getElementById('signup-message');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            try {
                const res = await fetch('https://backend-the-wave.onrender.com', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password })
                });
                const data = await res.json();
                if (res.ok) {
                    message.textContent = data.message;
                    message.style.color = 'green';
                    form.reset();
                } else {
                    message.textContent = data.message;
                    message.style.color = 'red';
                }
            } catch (err) {
                message.textContent = 'Server error. Please try again later.';
                message.style.color = 'red';
            }
        });
    }
});