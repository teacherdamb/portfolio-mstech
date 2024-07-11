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
