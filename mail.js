const firebaseConfig = { 
  apiKey: "AIzaSyBfe7VGLuEA04SZPX3JEKK6dXCZ8gLYrlc",
  authDomain: "contact-form---webgenics.firebaseapp.com",
  databaseURL: "https://contact-form---webgenics-default-rtdb.firebaseio.com",
  projectId: "contact-form---webgenics",
  storageBucket: "contact-form---webgenics.firebasestorage.app",
  messagingSenderId: "18751507785",
  appId: "1:18751507785:web:5d17a94a757c9d91111e98",
  measurementId: "G-BT8HFMLNE9"
};

firebase.initializeApp(firebaseConfig);

// Reference your database
var contactFormDB = firebase.database().ref("contactForm");

// Get notification element
const notification = document.getElementById('notification');

// Form submit listener
document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var emailid = getElementVal("email");
  var msgContent = getElementVal("message");

  saveMessages(name, emailid, msgContent);
}

const saveMessages = (name, emailid, msgContent) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
      name: name,
      emailid: emailid,
      msgContent: msgContent,
  }, (error) => {
    if (error) {
      showNotification("Oops! Something went wrong. Please try again.", true);
    } else {
      showNotification("Your message has been sent successfully!");
      document.getElementById("contactForm").reset();
    }
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

function showNotification(message, isError = false) {
  notification.textContent = message;
  notification.style.backgroundColor = isError ? '#b00020' : '#004080'; // Red for error, dark blue for success
  notification.style.display = 'block';

  setTimeout(() => {
    notification.style.display = 'none';
  }, 4000);
}