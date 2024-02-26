const s = document.querySelector(':root');

function reDirect() {
  window.location.href = "./timetablepage.html";
}

function formValid() {
  const firstName = document.getElementById("fName").checkValidity();
  const lastName = document.getElementById("lName").checkValidity();
  const emailAddress = document.getElementById("emailAdd").checkValidity();
  const message = document.getElementById("uMessage").checkValidity();
  if (firstName == true && lastName == true && emailAddress == true && message == true){
    s.style.setProperty("--contactMsg", "black");
    document.getElementById("contactMessage").innerHTML = "Your message has been sent.";
    document.getElementById("fName").value = "";
    document.getElementById("lName").value = "";
    document.getElementById("emailAdd").value = "";
    document.getElementById("uMessage").value = "";
  }
  else {
    s.style.setProperty("--contactMsg", "red");
    document.getElementById("contactMessage").innerHTML = "One or more fields was incorrect.";
  }
}