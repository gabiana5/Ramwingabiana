// Calculate age from date of birth
function getAge(dobValue) {
  var birth = new Date(dobValue);
  var today = new Date();
  var age = today.getFullYear() - birth.getFullYear();
  var month = today.getMonth() - birth.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
    age = age - 1;
  }
  return age;
}

// Block future dates in the date picker
var today = new Date().toISOString().split("T")[0];
document.getElementById("dob").max = today;
document.getElementById("dob").min = "1940-01-01";

// Show age automatically
document.getElementById("dob").addEventListener("change", function () {
  var dob = document.getElementById("dob").value;
  if (dob !== "") {
    document.getElementById("ageText").textContent = "Age: " + getAge(dob);
  }
});

// When the Submit button is clicked
document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();

  var errors = [];

  // Get the values
  var fullName = document.getElementById("fullName").value.trim();
  var lrn = document.getElementById("lrn").value.trim();
  var schoolEmail = document.getElementById("schoolEmail").value.trim();
  var personalEmail = document.getElementById("personalEmail").value.trim();
  var mobile = document.getElementById("mobile").value.trim();
  var password = document.getElementById("password").value;
  var dob = document.getElementById("dob").value;
  var program = document.getElementById("program").value;
  var year = document.querySelector('input[name="year"]:checked');
  var status = document.querySelector('input[name="status"]:checked');
  var units = document.getElementById("units").value;
  var gwa = document.getElementById("gwa").value;
  var labs = document.querySelectorAll('input[name="lab"]:checked');
  var ecName = document.getElementById("ecName").value.trim();
  var file = document.getElementById("file").files[0];
  var essay = document.getElementById("essay").value.trim();
  var terms = document.getElementById("terms").checked;

  // Full name
  if (fullName === "") {
    errors.push("Full name is required.");
  }

  // LRN: exactly 12 digits
  if (!/^[0-9]{12}$/.test(lrn)) {
    errors.push("LRN must be exactly 12 digits.");
  }

  // Emails
  if (!/^[^ @]+@[^ @]+\.[^ @]+$/.test(schoolEmail)) {
    errors.push("Institutional email is not valid.");
  }
  if (!/^[^ @]+@[^ @]+\.[^ @]+$/.test(personalEmail)) {
    errors.push("Personal email is not valid.");
  }

  // Mobile: 11 digits
  if (!/^[0-9]{11}$/.test(mobile)) {
    errors.push("Mobile number must be exactly 11 digits.");
  }

  // Password: at least 8 characters with letters and numbers
  if (password.length < 8 || !/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    errors.push("Password must be at least 8 characters with letters and numbers.");
  }

  // Date of birth and age (must be at least 16)
  if (dob === "") {
    errors.push("Date of birth is required.");
  } else if (getAge(dob) < 16) {
    errors.push("You must be at least 16 years old to enroll.");
  }

  // Select and radio buttons
  if (program === "") {
    errors.push("Please select a degree program.");
  }
  if (year === null) {
    errors.push("Please select a year level.");
  }
  if (status === null) {
    errors.push("Please select an enrollment status.");
  }

  // Units: 3 to 24
  if (units === "" || units < 3 || units > 24) {
    errors.push("Units must be between 3 and 24.");
  }

  // GWA: 1 to 5
  if (gwa === "" || gwa < 1 || gwa > 5) {
    errors.push("GWA must be between 1.00 and 5.00.");
  }

  // Checkbox: at least 1 lab course
  if (labs.length === 0) {
    errors.push("Select at least 1 laboratory course.");
  }

  // Emergency contact
  if (ecName === "") {
    errors.push("Emergency contact name is required.");
  }

  // File: extension and size (max 2MB)
  if (!file) {
    errors.push("Please upload a file.");
  } else {
    var fileName = file.name.toLowerCase();
    var okType = fileName.endsWith(".png") || fileName.endsWith(".jpg") ||
                 fileName.endsWith(".jpeg") || fileName.endsWith(".pdf");
    if (!okType) {
      errors.push("File must be PNG, JPG or PDF.");
    }
    if (file.size > 2 * 1024 * 1024) {
      errors.push("File is too big. Maximum size is 2MB.");
    }
  }

  // Textarea: at least 30 characters
  if (essay.length < 30) {
    errors.push("Statement must be at least 30 characters.");
  }

  // Terms checkbox
  if (!terms) {
    errors.push("You must agree to the terms and honor code.");
  }

  // Show errors OR show the modal
  var errorBox = document.getElementById("errorBox");

  if (errors.length > 0) {
    errorBox.innerHTML = "<b>Please fix the following:</b><br>" + errors.join("<br>");
    errorBox.style.display = "block";
    window.scrollTo(0, 0);
  } else {
    errorBox.style.display = "none";

    var labList = [];
    for (var i = 0; i < labs.length; i++) {
      labList.push(labs[i].value);
    }

    var summary = "";
    summary += "<p><b>Full Name:</b> " + fullName + "</p>";
    summary += "<p><b>LRN:</b> " + lrn + "</p>";
    summary += "<p><b>Institutional Email:</b> " + schoolEmail + "</p>";
    summary += "<p><b>Personal Email:</b> " + personalEmail + "</p>";
    summary += "<p><b>Mobile:</b> " + mobile + "</p>";
    summary += "<p><b>Password:</b> ********</p>";
    summary += "<p><b>Date of Birth:</b> " + dob + " (Age " + getAge(dob) + ")</p>";
    summary += "<p><b>Program:</b> " + program + "</p>";
    summary += "<p><b>Year Level:</b> " + year.value + "</p>";
    summary += "<p><b>Status:</b> " + status.value + "</p>";
    summary += "<p><b>Units:</b> " + units + "</p>";
    summary += "<p><b>GWA:</b> " + gwa + "</p>";
    summary += "<p><b>Lab Courses:</b> " + labList.join(", ") + "</p>";
    summary += "<p><b>Emergency Contact:</b> " + ecName + "</p>";
    summary += "<p><b>File:</b> " + file.name + "</p>";
    summary += "<p><b>Statement:</b> " + essay + "</p>";

    document.getElementById("summary").innerHTML = summary;
    document.getElementById("modal").style.display = "block";
  }
});

// Close the modal
document.getElementById("closeBtn").addEventListener("click", function () {
  document.getElementById("modal").style.display = "none";
});