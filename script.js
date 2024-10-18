var currentTab = 0;
showTab(currentTab);
let reportType = null;

// affiche l'étape souhaitée
function showTab(n) {
  var x = document.getElementsByClassName("tab");
  var y = document.getElementsByClassName("tab-title");
  if (n == 8 && reportType == "simplified") {
    x[n].style.display = "block";
    y[n].style.display = "block";
    document.getElementById("submitBtn").style.display = "inline";
    document.getElementById("prevBtn").style.display = "inline";
    document.getElementById("nextBtn").style.display = "none";
    return;
  }

  x[n].style.display = "block";
  y[n].style.display = "block";
  if (currentTab != 0) {
    if (reportType == "simplified") {
      console.log(reportType + "dans bouttons");
      if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
        document.getElementById("submitBtn").style.display = "none";
        document.getElementById("nextBtn").style.display = "none";
      } else {
        document.getElementById("prevBtn").style.display = "inline";
      }
      if (n == x.length - 1) {
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("submitBtn").style.display = "inline";
      } else {
        document.getElementById("submitBtn").style.display = "none";
        document.getElementById("nextBtn").style.display = "inline";
      }
    } else {
      if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
        document.getElementById("submitBtn").style.display = "none";
        document.getElementById("nextBtn").style.display = "none";
      } else {
        document.getElementById("prevBtn").style.display = "inline";
      }
      if (n == x.length - 1) {
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("submitBtn").style.display = "inline";
      } else {
        document.getElementById("submitBtn").style.display = "none";
        document.getElementById("nextBtn").style.display = "inline";
      }
    }
  } else {
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("submitBtn").style.display = "none";
  }
  fixStepIndicator(n);
}

// avance ou recule d'une étape
function nextPrev(n) {
  var x = document.getElementsByClassName("tab");
  var y = document.getElementsByClassName("tab-title");
  if (n == -1) {
    x[currentTab].style.display = "none";
    y[currentTab].style.display = "none";
    currentTab = currentTab - 1;
    showTab(currentTab);
    return;
  }

  if (currentTab == 0) {
    const clientSelect = document.getElementById("clients");
    if (clientSelect.value === "Sélectionner un client") {
      showMessage("Veuillez remplir tous les champs");
      return false;
    }
  }

  if (n == 1 && !validateForm()) return false;

  if (reportType == "simplified") {
    if (
      currentTab == 2 ||
      currentTab == 4 ||
      currentTab == 8 ||
      currentTab == 9
    ) {
      console.log("a detruire");
      x[currentTab].style.display = "none";
      y[currentTab].style.display = "none";
      currentTab = currentTab + 2;
    } else {
      console.log("Inside comprehensive block");
      console.log("a garder");
      x[currentTab].style.display = "none";
      y[currentTab].style.display = "none";
      currentTab = currentTab + 1;
      if (currentTab >= x.length) {
        return false;
      }
    }
  } else {
    console.log("Inside comprehensive block");
    console.log("a garder");
    x[currentTab].style.display = "none";
    y[currentTab].style.display = "none";
    currentTab = currentTab + 1;
    if (currentTab >= x.length) {
      return false;
    }
  }

  console.log("currentTab after update:", currentTab);
  showTab(currentTab);
}

// valide le formulaire
function validateForm() {
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  if (currentTab == 1) {
    var client = document.getElementById("clients");
    var carriere = document.getElementById("Carriere");
    if (client.className.includes("is-invalid")) {
      showMessage("le client est invalide", "danger");
      return false;
    }
    if (carriere.className.includes("is-invalid")) {
      showMessage("la carriere est invalide", "danger");
      return false;
    }
  }

  // vérifie que tous les champs sont remplis
  for (i = 0; i < y.length; i++) {
    if (y[i].value == "") {
      y[i].className += " invalid";
      valid = false;
    }
  }
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid;
}
// ajoute la classe active à l'étape actuelle
function fixStepIndicator(n) {
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}

// affiche un message
function showMessage(message, type) {
  const messageContainer = document.getElementById("alert-container");
  messageContainer.style.display = "block";
  messageContainer.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                  ${message}
                                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>`;
  setTimeout(() => {
    const alert = bootstrap.Alert.getInstance(document.querySelector(".alert"));
    messageContainer.style.display = "none";
    alert.close();
  }, 5000);
}
