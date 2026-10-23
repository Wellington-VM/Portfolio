const projetos = [
  //PROJETO PORTIFOLIO
  {
    id: "portfolio",
    titulo: "Portfólio pessoal",
    resumo: "Site de divulgação dos meus trabalhos, com design moderno e totalmente responsivo.",
    descricao:
      " Desenvolvimento de um portfólio web responsivo com o objetivo de apresentar projetos, habilidades técnicas e informações profissionais do desenvolvedor. O sistema foi desenvolvido com foco em design moderno, experiência do usuário e organização visual, servindo como ferramenta de apresentação.",
    capa: "assets/Imagens_projeto/card 1.png",
    tecnologias: ["HTML", "CSS", "Bootstrap", "JavaScript", "AOS.js", "LottieFiles"],
    funcionalidades: [
      "Layout responsivo para celular, tablet e desktop",
      "Barra de navegação que muda ao rolar a página",
      "Animações de entrada nas seções",
    ],
    links: {
      demo: "https://wellington-vm.github.io/Portfolio/",
      codigo: "https://github.com/Wellington-VM/Portfolio",
      documentacao: "assets/docs/Documentação do Projeto Portfólio.pdf",
    },
    midias: [
      { tipo: "imagem", src: "assets/imagens/Wireframe-inicial.svg", legenda: "Wireframe inicial" },
      { tipo: "imagem", src: "assets/imagens/Prototipagem.svg", legenda: "Prototipagem no Figma" },
    ],
  },

  //PROJETO SOS SERVIÇO
  {
    id: "sos-servico",
    titulo: "SOS Serviço",
    resumo: "Plataforma Mobile de Prestação de Serviços.",
    descricao:
    "Desenvolvido originalmente como projeto acadêmico e expandido para um projeto vitrine de alto padrão em front-end com Ionic e Angular, com forte foco em UI/UX e responsividade. O SOS serviço é um aplicativo mobile focado na conexão entre clientes e profissionais autônomos, permitindo a solicitação de serviços residenciais. Como diferencial de usabilidade, a aplicação conta com alternância dinâmica de papéis (Cliente e Profissional), permitindo visualizar em tempo real tanto a perspectiva de busca e contratação quanto o painel de gerenciamento de tarefas. (Nota: Projeto desenvolvido com dados mockados para demonstração de interface e experiência de usuário).",
    capa: "assets/Imagens_projeto/SOS/capa.png",
    tecnologias: ["Ionic", "HTML", "SCSS", "Angular", "TypeScript"],
    funcionalidades: [
      "Interface desenhada com foco em UX e UI",
      "Navegação otimizada por abas com rolagem adaptativa",
      "Dados mockados para demonstração",
      "Alternância dinâmica de papéis entre Cliente e Profissional",
    ],
    links: {
      demo: "https://wellington-vm.github.io/Sos-Servi-o/",
      codigo: "https://github.com/Wellington-VM/Sos-Servi-o",
      documentacao: null,
    },
    midias: [
      {
        tipo: "video",
        src: "assets/Imagens_projeto/SOS/sos.mp4",
        poster: "assets/Imagens_projeto/SOS/capa.png",
        legenda: "Aplicativo em funcionamento",
      },
      { tipo: "imagem", src: "assets/Imagens_projeto/SOS/Wireframe_SOS.png", legenda: "Wireframe inicial" },
      { tipo: "imagem", src: "assets/Imagens_projeto/SOS/Prototipo_SOS.png", legenda: "Prototipagem no Figma" },
    ],
  },
];

/* ===================== PROJETOS ===================== */
const listaProjetos = document.getElementById("listaProjetos");
const modalEl = document.getElementById("modalProjeto");
const modalBootstrap = new bootstrap.Modal(modalEl);

const palco = document.getElementById("palcoMidia");
const palcoLegenda = document.getElementById("palcoLegenda");
const miniaturas = document.getElementById("miniaturas");
const btnAnterior = document.getElementById("midiaAnterior");
const btnProxima = document.getElementById("midiaProxima");

let midiasAtuais = [];
let indiceAtual = 0;

function esc(texto) {
  return String(texto).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function imagemComFallback(img) {
  img.addEventListener("error", () => img.classList.add("sem-imagem"), { once: true });
}

// ---------- CARDS ----------
function criarCard(projeto) {
  const card = document.createElement("article");
  card.className = "card";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", "Ver detalhes de " + projeto.titulo);
  card.dataset.id = projeto.id;

  card.innerHTML = `
                <img class="card-img-top" src="${esc(projeto.capa)}" alt="Capa do projeto ${esc(projeto.titulo)}" loading="lazy">
                <div class="card-body">
                    <div>
                        <h3 class="card-text">${esc(projeto.titulo)}</h3>
                        <p>${esc(projeto.resumo)}</p>
                        <div class="tags">
                            ${projeto.tecnologias
                              .slice(0, 4)
                              .map((t) => `<span>${esc(t)}</span>`)
                              .join("")}
                        </div>
                    </div>
                    <span class="card-cta">Ver detalhes</span>
                </div>
            `;
  imagemComFallback(card.querySelector("img"));
  return card;
}

projetos.forEach((p) => listaProjetos.appendChild(criarCard(p)));

function abrirDoCard(evento) {
  const card = evento.target.closest(".card");
  if (!card) return;
  const projeto = projetos.find((p) => p.id === card.dataset.id);
  if (projeto) abrirModal(projeto);
}
listaProjetos.addEventListener("click", abrirDoCard);
listaProjetos.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    abrirDoCard(e);
  }
});

// ---------- MODAL ----------
function abrirModal(projeto) {
  modalEl.querySelector(".modal-title").textContent = projeto.titulo;
  document.getElementById("modalDescricao").textContent = projeto.descricao;

  // Destaques
  const blocoFunc = document.getElementById("blocoFuncionalidades");
  const listaFunc = document.getElementById("modalFuncionalidades");
  listaFunc.innerHTML = "";
  (projeto.funcionalidades || []).forEach((f) => {
    const li = document.createElement("li");
    li.textContent = f;
    listaFunc.appendChild(li);
  });
  blocoFunc.hidden = listaFunc.children.length === 0;

  // Tecnologias
  document.getElementById("modalTecnologias").innerHTML = projeto.tecnologias.map((t) => `<span>${esc(t)}</span>`).join("");

  // Links
  const caixaLinks = document.getElementById("modalLinks");
  caixaLinks.innerHTML = "";
  const definicaoLinks = [
    { chave: "demo", texto: "Demo", icone: "assets/imagens/play-svgrepo-com.svg", destaque: true },
    { chave: "codigo", texto: "Código", icone: "assets/imagens/github-svgrepo-com.svg" },
    { chave: "documentacao", texto: "Documentação", icone: "assets/imagens/documento.svg" },
  ];
  definicaoLinks.forEach((l) => {
    const url = projeto.links && projeto.links[l.chave];
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    a.className = "btn-projeto" + (l.destaque ? " btn-projeto-destaque" : "");
    a.innerHTML = `<img src="${l.icone}" alt=""><span>${l.texto}</span>`;
    caixaLinks.appendChild(a);
  });

  // Mídias
  midiasAtuais = projeto.midias || [];
  montarMiniaturas();
  mostrarMidia(0);

  modalBootstrap.show();
}

function criarMiniatura(midia, i) {
  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = "miniatura";
  botao.setAttribute("aria-label", midia.legenda || "Mídia " + (i + 1));

  let imagemSrc = null;
  if (midia.tipo === "imagem") imagemSrc = midia.src;
  else if (midia.poster) imagemSrc = midia.poster;
  else if (midia.tipo === "youtube") imagemSrc = `https://img.youtube.com/vi/${midia.id}/mqdefault.jpg`;

  if (imagemSrc) {
    const img = document.createElement("img");
    img.src = imagemSrc;
    img.alt = "";
    img.loading = "lazy";
    imagemComFallback(img);
    botao.appendChild(img);
  }
  if (midia.tipo !== "imagem") {
    const play = document.createElement("span");
    play.className = "miniatura-play";
    play.textContent = "\u25B6";
    botao.appendChild(play);
  }
  botao.addEventListener("click", () => mostrarMidia(i));
  return botao;
}

function montarMiniaturas() {
  miniaturas.innerHTML = "";
  midiasAtuais.forEach((m, i) => miniaturas.appendChild(criarMiniatura(m, i)));

  const varias = midiasAtuais.length > 1;
  miniaturas.hidden = !varias;
  btnAnterior.hidden = !varias;
  btnProxima.hidden = !varias;
}

function limparPalco() {
  palco.querySelectorAll("video").forEach((v) => v.pause());
  palco.innerHTML = "";
}

function mostrarMidia(i) {
  if (!midiasAtuais.length) {
    limparPalco();
    palcoLegenda.textContent = "";
    return;
  }
  indiceAtual = (i + midiasAtuais.length) % midiasAtuais.length;
  const midia = midiasAtuais[indiceAtual];

  limparPalco();

  let elemento;
  if (midia.tipo === "video") {
    elemento = document.createElement("video");
    elemento.controls = true;
    elemento.playsInline = true;
    elemento.preload = "metadata";
    if (midia.poster) elemento.poster = midia.poster;
    elemento.src = midia.src;
    elemento.setAttribute("aria-label", midia.legenda || "Vídeo do projeto");
  } else if (midia.tipo === "youtube") {
    elemento = document.createElement("iframe");
    elemento.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(midia.id);
    elemento.title = midia.legenda || "Vídeo do projeto";
    elemento.allow = "accelerometer; encrypted-media; picture-in-picture; fullscreen";
    elemento.allowFullscreen = true;
  } else {
    elemento = document.createElement("img");
    elemento.src = midia.src;
    elemento.alt = midia.legenda || "";
    imagemComFallback(elemento);
  }
  palco.appendChild(elemento);

  palcoLegenda.textContent = midia.legenda || "";
  Array.from(miniaturas.children).forEach((m, idx) => {
    m.classList.toggle("ativa", idx === indiceAtual);
    m.setAttribute("aria-current", idx === indiceAtual ? "true" : "false");
  });
}

btnAnterior.addEventListener("click", () => mostrarMidia(indiceAtual - 1));
btnProxima.addEventListener("click", () => mostrarMidia(indiceAtual + 1));

modalEl.addEventListener("keydown", (e) => {
  if (e.target.tagName === "VIDEO" || e.target.tagName === "IFRAME") return;
  if (e.key === "ArrowLeft") mostrarMidia(indiceAtual - 1);
  if (e.key === "ArrowRight") mostrarMidia(indiceAtual + 1);
});

modalEl.addEventListener("hidden.bs.modal", limparPalco);
