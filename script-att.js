let stepValid = [false, false, false, false, false, false];

// affiche l'étape asouhaitée
function showTab(n) {
  let tabs = document.getElementsByClassName("tab");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].style.display = "none";
  }
  tabs[n].style.display = "block";
}

// change la couleur du bouton de l'étape
function changeColorBtn(n) {
  let elements = document.getElementsByClassName("BtnStep")[n];
  elements.classList.add("tab-finish");
}

// valide l'étape
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

// vérifie si les étapes requises sont valides
function allStepsValid() {
  if (stepValid[0] && stepValid[1] && stepValid[4] && stepValid[5]) {
    return true;
  } else if (stepValid[0] && stepValid[5] && (stepValid[2] || stepValid[3])) {
    return true;
  } else {
    return false;
  }
}

// affiche un message
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

// ajoute une nouvelle ligne pour les diamètres/... de forage
function addRow() {
  // Récupère le tableau
  const tableBody = document.getElementById("tableBody");

  // Crée une nouvelle ligne
  const newRow = document.createElement("tr");

  // Crée et ajoute chaque cellule avec l'input correspondant
  newRow.innerHTML = `
    <td>
      <input type="text" class="border-primary input-table-2" placeholder="Diamètre de forage" style="border-style: none none solid none;" id="DiametreForage"/>
    </td>
    <td>
      <input type="text" class="border-primary input-table-2" placeholder="Quantité" style="border-style: none none solid none;" id="QuantiteForage"/>
    </td>
    <td>
      <input type="text" class="border-primary input-table-2" placeholder="Unité" style="border-style: none none solid none;" id="UniteForage"/>
    </td>
  `;

  // Ajoute la nouvelle ligne au tableau
  tableBody.appendChild(newRow);
}

// récupère les valeurs de chaque ligne des diamètres/... de forage
function getElementsValuesFromNodeList(NodeList) {
  let valeurs = [];

  // Parcourt chaque élément de la NodeList
  NodeList.forEach(function (element) {
    valeurs.push(element.value);
  });

  return valeurs;
}
