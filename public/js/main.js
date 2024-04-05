function validateResponse(inputId, btnId) {
  var input = document.getElementById(inputId);
  var btn = document.getElementById(btnId);

  // Habilitar o botão se o campo de resposta estiver preenchido
  btn.disabled = input.value.trim() === "";
}

function init() {
  // Mapear os IDs dos campos de entrada e botões
  var fields = [
    { inputId: "js-bodyRegister", btnId: "js-btnRegister" },
    { inputId: "js-bodyUpdate", btnId: "js-btnUpdate" },
  ];

  // Adicionar o event listener em cada campo
  fields.forEach(function (field) {
    var input = document.getElementById(field.inputId);
    var btn = document.getElementById(field.btnId);

    if (input && btn) {
      input.addEventListener("input", function () {
        validateResponse(field.inputId, field.btnId);
      });
    }
  });
}

// Chamar a função init para iniciar todos os campos
init();
