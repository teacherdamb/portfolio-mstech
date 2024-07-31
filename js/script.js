//SENHA MENU BEGINS
document.addEventListener("DOMContentLoaded", function () {
  // Busca o input

  var inputNav = document.querySelector(".form-main-nav");
  var btnNav = document.querySelector(".btnNav");

  // Seleciona o link desabilitado
  const disabledLink = document.querySelector(".nav-link.disabled");

  // Adiciona um even listener para o clique no botão de busca
  btnNav.addEventListener("click", function (event) {
    event.preventDefault();

    // Verifica se o campo de input não está vazio
    if (inputNav.value.trim() === "Password") {
      disabledLink.classList.remove("disabled");
      disabledLink.classList.add("d-none");
      disabledLink.removeAttribute("aria-disabled");

      // Criar um novo link
      const newLink = document.createElement("a");
      newLink.href = "#";
      newLink.textContent = "Sistema MS Tech";

      // Adicionar classes
      newLink.classList.add("nav-link", "teste-css");

      // Adicionar o novo link ao DOM
      const parentElement = disabledLink.parentElement;
      parentElement.appendChild(newLink);
    }
  });
});
//SENHA MENU ENDS

//CODE EDITOR BEGINS
document.addEventListener("DOMContentLoaded", function () {
  const editorContent = document.querySelector(".editor-content");

  if (editorContent) {
    editorContent.setAttribute("contenteditable", "true");
    editorContent.style.wordBreak = "break-all"; // Ensure words break correctly
    editorContent.style.overflowWrap = "break-word"; // Ensure long words wrap correctly
    editorContent.style.padding = "2px"; // Add padding for better readability
  }
});
//CODE EDITOR ENDS

//CALCULATOR SOFTWARE BEGINS

document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll("[data-index]");
  const nextButtons = document.querySelectorAll(".nextButton");
  const prevButtons = document.querySelectorAll(".prevButton");
  const calculateButton = document.getElementById("calculate-button");
  const alerta = document.getElementById("alerta");
  const cards = document.querySelectorAll(".selected-card");
  const estimativaValor = document.getElementById("estimativa-valor");
  const detalhesEstimativa = document.getElementById("detalhes-estimativa");
  const downloadPdfButton = document.getElementById("download-pdf");
  const headerDiv = document.querySelector(
    ".uk-text-center.uk-container-small.uk-container"
  );

  const valoresProjeto = {
    Software: { min: 30, max: 60 },
    Aplicativo: { min: 120, max: 180 },
    "E-commerce": { min: 40, max: 80 },
    Marketplace: { min: 240, max: 280 },
    Integração: { min: 20, max: 30 },
    Automação: { min: 50, max: 100 },
    "MVP, versão inicial": { min: 20, max: 30 },
    "Simples, mas agradável": { min: 30, max: 60 },
    "Cadastro via e-mail": { min: 10, max: 15 },
    "Cadastro via Google": { min: 20, max: 30 },
    "Cadastro via Linkedin": { min: 20, max: 30 },
    "Cadastro via Facebook": { min: 20, max: 30 },
    Dashboard: { min: 40, max: 80 },
    "Feed de atividades": { min: 50, max: 70 },
    "Perfil de usuário": { min: 15, max: 25 },
    "Upload de arquivos": { min: 10, max: 15 },
    Agendamentos: { min: 50, max: 70 },
    Geolocalização: { min: 50, max: 70 },
    "Mostrar no mapa": { min: 15, max: 25 },
    "Gestão de rotas": { min: 100, max: 150 },
    "Cálculo de frete": { min: 15, max: 20 },
    "Alertas automatizados": { min: 15, max: 20 },
    "Push notification": { min: 40, max: 60 },
    Avaliação: { min: 20, max: 40 },
    Grupos: { min: 50, max: 80 },
    "Cupons de desconto": { min: 10, max: 15 },
    "Clube de pontos": { min: 50, max: 70 },
    "Cross Selling": { min: 25, max: 30 },
    "Gestão de produtos": { min: 50, max: 70 },
    Moderação: { min: 15, max: 20 },
    "Relatórios avançados": { min: 50, max: 70 },
    "Análise de uso": { min: 20, max: 30 },
    "Alertas de uso": { min: 15, max: 20 },
    "API do software": { min: 50, max: 100 },
    "API de terceiros": { min: 40, max: 80 },
    "SMS ou WhatsApp": { min: 35, max: 50 },
    "Certificado SSL": { min: 5, max: 7 },
    "Web Application Firewall": { min: 10, max: 15 },
    "Autenticação de dois fatores": { min: 25, max: 35 },
  };

  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, idx) => {
      if (idx === index) {
        step.classList.remove("uk-hidden");
      } else {
        step.classList.add("uk-hidden");
      }
    });

    if (index > 0 && headerDiv) {
      headerDiv.classList.add("uk-hidden");
    }
  }

  function validateStep(step) {
    const required = step.getAttribute("data-required");
    const selected =
      Array.from(step.querySelectorAll(".selected-card.selected")).length > 0;

    if (required && !selected) {
      alerta.classList.remove("uk-hidden");
      return false;
    }

    alerta.classList.add("uk-hidden");
    return true;
  }

  nextButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      if (validateStep(steps[currentStep])) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  prevButtons.forEach((button) => {
    button.addEventListener("click", function () {
      currentStep--;
      showStep(currentStep);
    });
  });

  calculateButton.addEventListener("click", function () {
    if (validateStep(steps[currentStep])) {
      calculateEstimate();
      showStep(steps.length - 1);
    }
  });

  showStep(currentStep);

  cards.forEach((card) => {
    card.addEventListener("click", function () {
      this.classList.toggle("selected");
    });
  });

  downloadPdfButton.addEventListener("click", function () {
    const element = document.getElementById("resultado");
    const opt = {
      margin: 1,
      filename: "orcamento.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(element).set(opt).save();
  });

  function calculateEstimate() {
    let totalMin = 0;
    let totalMax = 0;
    detalhesEstimativa.innerHTML = "";

    const selectedCards = document.querySelectorAll(".selected-card.selected");
    selectedCards.forEach((card) => {
      const title = card.querySelector("h5").textContent.trim();
      const { min, max } = valoresProjeto[title] || { min: 0, max: 0 };
      totalMin += min;
      totalMax += max;

      const detailItem = document.createElement("div");
      detailItem.classList.add(
        "uk-card",
        "card-result",
        "uk-card-default",
        "uk-margin-bottom",
        "uk-padding-small"
      );
      detailItem.innerHTML = `
        <div class="uk-flex uk-flex-middle uk-flex-between">
          <div class="uk-flex uk-flex-middle">
            <span class="img uk-margin-right">
              <img src="${card.querySelector("img").src}" width="24px">
            </span>
            <div>
              <h4 class="uk-margin-remove uk-text-medium">${title}</h4>
            </div>
          </div>
          <div class="uk-text-right">
            <h4 class="uk-text-medium uk-margin-remove">${min} - ${max}</h4>
            <p class="uk-text-muted uk-margin-remove">Estimativa de hora</p>
          </div>
        </div>
      `;
      detalhesEstimativa.appendChild(detailItem);
    });

    const valorHora = 100;
    estimativaValor.textContent = `R$ ${totalMin * valorHora} - R$ ${
      totalMax * valorHora
    }`;
  }
});

//CALCULATOR SOFTWARE ENDS

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("download-pdf")
    .addEventListener("click", function () {
      const { jsPDF } = window.jspdf;

      // Cria uma instância do jsPDF
      const doc = new jsPDF();

      // Captura o conteúdo da div de resultado
      const resultado = document.getElementById("resultado").innerHTML;

      // Adiciona o conteúdo ao PDF
      doc.text(resultado, 10, 10);

      // Faz o download do PDF
      doc.save("orcamento.pdf");
    });
});

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("download-pdf")
    .addEventListener("click", function () {
      const { jsPDF } = window.jspdf;

      // Cria uma instância do jsPDF
      const doc = new jsPDF();

      // Captura o elemento de resultado
      const resultado = document.getElementById("resultado");

      // Usa html2canvas para renderizar o elemento como uma imagem
      html2canvas(resultado).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 210; // Largura do PDF em mm
        const pageHeight = 295; // Altura do PDF em mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        // Adiciona a imagem ao PDF
        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Se o conteúdo for maior que uma página, adiciona novas páginas
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        // Faz o download do PDF
        doc.save("orcamento.pdf");
      });
    });
});
