var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
let reportType = null;

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  var y = document.getElementsByClassName("tab-title");
  if (n == 6 && reportType == "simplified") {
    x[n].style.display = "block";
    y[n].style.display = "block";
    document.getElementById("submitBtn").style.display = "inline";
    document.getElementById("prevBtn").style.display = "inline";
    document.getElementById("nextBtn").style.display = "none";
    return;
  }

  x[n].style.display = "block";
  y[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
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
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  var y = document.getElementsByClassName("tab-title");

  if (currentTab == 0) {
    const clientSelect = document.getElementById("clients");
    if (clientSelect.value === "Sélectionner un client") {
      showMessage("Veuillez remplir tous les champs");
      return false;
    }
  }

  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;

  // Hide the current tab:
  if (reportType == "simplified") {
    if (currentTab == 2 || currentTab == 7 || currentTab == 8) {
      console.log("a detruire");
      x[currentTab].style.display = "none";
      y[currentTab].style.display = "none";
      currentTab = currentTab + 2;
    } else {
      console.log("Inside comprehensive block");
      console.log("a garder");
      x[currentTab].style.display = "none";
      y[currentTab].style.display = "none";
      // Increase or decrease the current tab by 1:
      currentTab = currentTab + 1;
      // if you have reached the end of the form... :
      if (currentTab >= x.length) {
        //...the form gets submitted:
        //document.getElementById("regForm").submit();
        return false;
      }
    }
  } else {
    console.log("Inside comprehensive block");
    console.log("a garder");
    x[currentTab].style.display = "none";
    y[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + 1;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
      //...the form gets submitted:
      //document.getElementById("regForm").submit();
      return false;
    }
  }

  // Otherwise, display the correct tab:
  console.log("currentTab after update:", currentTab);
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

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
