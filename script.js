document.addEventListener('DOMContentLoaded', () => {

  const servicesList = document.getElementById('servicesList');
  if (servicesList) {
    services.forEach((service) => {
      const card = document.createElement('div');
      card.className = "service-card bg-gray-800 p-6 rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer mb-4";

      card.innerHTML = `
        <h3 class="text-xl font-bold text-blue-400 mb-2">${service.title}</h3>
        <p class="text-sm text-gray-300">${service.short}</p>
        <div class="service-full text-sm text-white mt-3 hidden transition-all duration-300">${service.full}</div>
      `;

      card.addEventListener('click', () => {
        const fullText = card.querySelector('.service-full');
        fullText.classList.toggle('hidden');
        card.classList.toggle('bg-gray-700');
      });

      servicesList.appendChild(card);
    });
  }

  // ================= Firebase Contact Form =================
  const contactForm = document.getElementById("contactForm");
  const notification = document.getElementById("notification");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const emailid = document.getElementById("email").value.trim();
      const msgContent = document.getElementById("message").value.trim();

      if (!name || !emailid || !msgContent) {
        showNotification("Please fill all fields!", true);
        return;
      }

      saveMessages(name, emailid, msgContent);
    });
  }

  // Save form data to Firebase
  const contactFormDB = firebase.database().ref("contactForm");

  function saveMessages(name, emailid, msgContent) {
    const newContactForm = contactFormDB.push();

    newContactForm.set({
      name,
      emailid,
      msgContent
    }, (error) => {
      if (error) {
        showNotification("Oops! Something went wrong. Please try again.", true);
      } else {
        showNotification("✅ Your message has been sent successfully!");
        contactForm.reset();
      }
    });
  }

  // Notification popup
  function showNotification(message, isError = false) {
    notification.textContent = message;
    notification.style.backgroundColor = isError ? '#b00020' : '#004080';
    notification.style.display = 'block';
    notification.style.opacity = 1;

    // Fade out
    setTimeout(() => {
      let fadeEffect = setInterval(() => {
        if (!notification.style.opacity) {
          notification.style.opacity = 1;
        }
        if (notification.style.opacity > 0) {
          notification.style.opacity -= 0.05;
        } else {
          clearInterval(fadeEffect);
          notification.style.display = 'none';
        }
      }, 30);
    }, 3000);
  }
});
