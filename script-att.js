let stepValid = [false, false, false, false, false, false];

function showTab(n) {
  let tabs = document.getElementsByClassName("tab");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].style.display = "none";
  }
  tabs[n].style.display = "block";
}

function changeColorBtn(n) {
  let elements = document.getElementsByClassName("BtnStep")[n];
  elements.classList.add("tab-finish");
}

function validStep(stepIndex) {
  let steps = document.querySelectorAll(".tab");
  let step = steps[stepIndex];
  if (validateStep(step)) {
    stepValid[stepIndex] = true;
    changeColorBtn(stepIndex);
    // Si l'étape est valide, passez à l'étape suivante
    // Si c'est la dernière étape on ne passe pas à la suivante (il n'y en a pas idiot)
    if (stepIndex + 1 !== steps.length) {
      showTab(stepIndex + 1);
    }
    
  } else {
    // Sinon, affichez un message d'erreur
    showMessageError(
      "Veuillez remplir tous les champs de cette étape.",
      "danger"
    );
  }
}

function validateStep(step) {
  let inputs = step.querySelectorAll("input, select");
  let isValid = true;

  inputs.forEach((input) => {
    console.log(input.type === 'checkbox', input.checked)
    if (input.value === "" || input.type === 'checkbox' && input.checked === false) {
      isValid = false;
    }
  });

  return isValid;
}

function allStepsValid() {
  if (stepValid[0] && stepValid[1] && stepValid[4] && stepValid[5]) {
    console.log(
      "chantier forage et gnr",
      stepValid[0],
      stepValid[1],
      stepValid[4],
      stepValid[5]
    );
    return true;
  } else if (stepValid[0] && stepValid[5] && (stepValid[2] || stepValid[3])) {
    console.log(
      "chantier, minage/autre et gnr",
      stepValid[0],
      stepValid[2],
      stepValid[3],
      stepValid[4],
      stepValid[5]
    );
    return true;
  } else {
    console.log(
      "pas assez",
      stepValid[0],
      stepValid[1],
      stepValid[2],
      stepValid[3],
      stepValid[4],
      stepValid[5]
    );
    return false;
  }
}

function showMessage(message, type, newNumber) {
  const messageContainer = document.getElementById("alert-container");
  messageContainer.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            ${message}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                          </div>`;
  setTimeout(() => {
    const alert = bootstrap.Alert.getInstance(document.querySelector(".alert"));
    alert.close();
  }, 5000);

  setTimeout(() => {
    const newUrl = "Impression-attachement.html?number=" + newNumber;
    window.location.href = newUrl;
  }, 3000);
}
function showMessageError(message, type, newNumber) {
  const messageContainer = document.getElementById("alert-container");
  messageContainer.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            ${message}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                          </div>`;
}
function addInput(idInput) {
  const inputDiametre = document.getElementById(idInput);
  const inputClone = inputDiametre.cloneNode(true);
  inputDiametre.parentNode.insertBefore(inputClone, inputDiametre.nextSibling);
}

function getElementsValuesFromNodeList(NodeList) {
  let valeurs = [];

  // Parcourt chaque élément de la NodeList
  NodeList.forEach(function(element) {
      valeurs.push(element.value);
  });

  return valeurs;
}