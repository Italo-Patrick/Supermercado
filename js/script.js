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