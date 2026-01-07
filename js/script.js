console.log('script carregado');
//Menu hamburger
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

// Slide dos banners da home
const banners = document.querySelectorAll('.banner');
let index = 0;

if (banners.length > 0) {

    banners[index].classList.add('active');

    function proximoBanner() {
        banners[index].classList.remove('active');

        index++;
        if (index >= banners.length) {
            index = 0;
        }

        banners[index].classList.add('active');
    }

    setInterval(proximoBanner, 4000);
}



// Busca de produtos (global + local)
const formBusca = document.querySelector('.pesquisa-box');
const inputBusca = document.querySelector('.pesquisa-box input');
const cards = document.querySelectorAll('.card-base');

/* ---------- BUSCA GLOBAL (todas as páginas) ---------- */
if (formBusca && inputBusca) {
    formBusca.addEventListener('submit', (e) => {
        e.preventDefault();

        const termo = inputBusca.value.trim();
        if (termo) {
            window.location.href = `produtos.html?busca=${encodeURIComponent(termo)}`;
        }
    });
}

/* ---------- FILTRO LOCAL (somente produtos.html) ---------- */
if (inputBusca && cards.length > 0) {
    inputBusca.addEventListener('input', () => {
        const termo = inputBusca.value.toLowerCase().trim();

        cards.forEach(card => {
            const nome = card
                .querySelector('.product-name')
                .textContent
                .toLowerCase();

            card.style.display = nome.includes(termo) ? '' : 'none';
        });
    });

    // Aplica busca vinda da URL (quando veio de outra página)
    const params = new URLSearchParams(window.location.search);
    const termoURL = params.get('busca');

    if (termoURL) {
        inputBusca.value = termoURL;
        inputBusca.dispatchEvent(new Event('input'));
    }
}
