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

// botão de fechamento do pop-up do whatsapp
const popup = document.getElementById("whatsPopup");
const closeBtn = document.getElementById("closePopup");
const footer = document.getElementById("footer");

if (popup && closeBtn) {
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    popup.style.display = "none";
  });
}

if (popup && footer) {
  window.addEventListener("scroll", () => {
    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (footerTop < windowHeight) {
      popup.style.display = "none";
    } else {
      popup.style.display = "flex";
    }
  });
}

  // Busca de produtos (global + local)
const formBusca = document.querySelector('.pesquisa-box');
const inputBusca = document.querySelector('.pesquisa-box input');

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

// Cards dos produtos
const container = document.querySelector(".container-pro-cards");
let todosProdutos = [];

fetch("./assets/produtos/banco.json")
.then (response => response.json())
.then (produtos => {
 const params = new URLSearchParams(window.location.search);
const categoriaURL = params.get("categoria")?.toLowerCase();
const buscaURL = params.get("busca")?.toLowerCase();

let produtosFiltrados = produtos;

// 🔹 filtro por categoria
if (categoriaURL) {
  produtosFiltrados = produtosFiltrados.filter(produto =>
    produto.categoria?.some(cat =>
      cat.toLowerCase() === categoriaURL
    )
  );
}

// 🔹 filtro por busca (nome do produto)
if (buscaURL) {
  produtosFiltrados = produtosFiltrados.filter(produto =>
    produto.nome.toLowerCase().includes(buscaURL)
  );
}

    // limpa antes de renderizar (importante se reutilizar)
    container.innerHTML = "";
    
    produtosFiltrados.forEach (produto => {
    const card = document.createElement("div");
    card.classList.add("card-base");
    card.innerHTML =  `
    <div class="product-img">
    <img src="${produto.imagem}" alt="${produto.alt}" loading="lazy">
    </div>
    <div class="preco">
        <h4 class="product-name">${produto.nome}</h4>
        <span class="price">${produto.preco}</span>
    </div>
     `;

    container.appendChild(card);
  });

/* ---------- FILTRO LOCAL (somente produtos.html) ---------- */
if (inputBusca) {
    inputBusca.addEventListener('input', () => {
        const termo = inputBusca.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.card-base');


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
})
.catch(err => {
  console.error("Erro ao carregar produto.", err)
  container.innerHTML = "<p>Não foi possível carregar os produtos no momento.</p>"
})
