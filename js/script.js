/*Menu hamburger*/
const menuToggle =document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links')

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.addEventListener('click', (e)=>
{   const clicouNoMenu = navLinks.contains(e.target);
    const clicouNobotao = menuToggle.contains(e.target);

    if(!clicouNoMenu && !clicouNobotao) {
        navLinks.classList.remove('active');
    }
})

/*Slide dos banners da home*/
const banners = document.querySelectorAll('.banner');
let index = 0;

function mostrarBanner() {
    banners.forEach(banner => banner.classList.remove('active'));
    banners[index].classList.add('active');
}

function proximoBanner() {
    index++;
    if (index >= banners.length) {
        index = 0;
    }
    mostrarBanner();
}

mostrarBanner();
setInterval(proximoBanner, 4000);