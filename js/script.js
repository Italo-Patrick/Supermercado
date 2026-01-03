console.log('menu.js carregado');

const menuToggle =document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links')

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});