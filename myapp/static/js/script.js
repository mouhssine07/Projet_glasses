function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", function () {
  // Change header background on scroll
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Fade-in effect
  const faders = document.querySelectorAll(".fade-in");

  const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -100px 0px",
  };

  const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
  ) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("visible");
        appearOnScroll.unobserve(entry.target);
      }
    });
  },
  appearOptions);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });
});
function showSunglasses() {
  document.getElementById("sunglasses-btn").classList.add("active");
  document.getElementById("glasses-btn").classList.remove("active");
  document.querySelectorAll(".glasses").forEach(function (item) {
    item.classList.add("hidden");
  });
  document.querySelectorAll(".sunglasses").forEach(function (item) {
    item.classList.remove("hidden");
  });
}

function showGlasses() {
  document.getElementById("glasses-btn").classList.add("active");
  document.getElementById("sunglasses-btn").classList.remove("active");
  document.querySelectorAll(".sunglasses").forEach(function (item) {
    item.classList.add("hidden");
  });
  document.querySelectorAll(".glasses").forEach(function (item) {
    item.classList.remove("hidden");
  });
}

// Function to show description and button on hover
function showDescriptionAndButton(event) {
  const description = event.target.nextElementSibling;

  if (description && description.classList.contains("description")) {
    description.style.opacity = "1";
    description.style.transform = "translateY(0)";
  }

  // Function to remove the description and button
  function removeDescription() {
    if (description) {
      description.style.opacity = "0";
      description.style.transform = "translateY(20px)";
    }
  }

  // Add mouseout event listener to the image to remove description and button
  event.target.addEventListener("mouseout", function () {
    removeDescription();
  });

  // Add mouseover event listener to clear the timeout if hovering back over the image
  event.target.addEventListener("mouseover", function () {
    clearTimeout(description.timeoutId);
  });

  // Add mouseout event listener to the description to remove it
  description.addEventListener("mouseout", function () {
    description.timeoutId = setTimeout(removeDescription, 300);
  });

  // Add mouseover event listener to clear the timeout if hovering back over the description
  description.addEventListener("mouseover", function () {
    clearTimeout(description.timeoutId);
  });
}

// Select all the image elements
const images = document.querySelectorAll(".service-item img");

// Add mouseover event listener to each image
images.forEach((image) => {
  image.addEventListener("mouseover", showDescriptionAndButton);
});

// let sunglassesBtn = document.getElementById("sunGlassesBtn");
// let seenGlassesBtn = document.getElementById("seenGlassesBtn");

// sunglassesBtn.addEventListener("click", function () {
//   window.location.href = "{% url 'sun-glasses' %}";
// });
// seenGlassesBtn.addEventListener("click", function () {
//   window.location.href = "{% url 'seen-glasses' %}";
// });

// function toggleForms() {
//   var loginForm = document.querySelector(".login-form");
//   var signupForm = document.querySelector(".signup-form");

//   if (loginForm.style.display === "none") {
//     loginForm.style.display = "block";
//     signupForm.style.display = "none";
//   } else {
//     loginForm.style.display = "none";
//     signupForm.style.display = "block";
//   }

//   // Scroll down to the login or sign-up section
//   var sectionToScrollTo =
//     loginForm.style.display === "none" ? signupForm : loginForm;
//   sectionToScrollTo.scrollIntoView({ behavior: "smooth" });
// }
// Function to toggle sign-up form visibility
function toggleSignupForm() {
  var signupForm = document.querySelector(".signup-form");
  signupForm.style.display = "block";

  var loginForm = document.querySelector(".login-form");
  loginForm.style.display = "none";

  // Scroll down to the sign-up section
  signupForm.scrollIntoView({ behavior: "smooth" });

  // Show prompt
  var username = document.getElementById("signup-username").value;
  if (username) {
    alert("Welcome " + username);
  }
}

// Function to toggle login form visibility
function toggleLoginForm() {
  var loginForm = document.querySelector(".login-form");
  loginForm.style.display = "block";

  var signupForm = document.querySelector(".signup-form");
  signupForm.style.display = "none";

  // Scroll down to the login section
  loginForm.scrollIntoView({ behavior: "smooth" });

  // Show prompt
  var username = document.getElementById("login-username").value;
  if (username) {
    alert("Welcome " + username);
  }
}

// Submit event listener for login form
document.addEventListener("DOMContentLoaded", function () {
  const buyButtons = document.querySelectorAll(".buy-button");

  buyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const parent = this.closest(".gallery-item");
      const description = parent.querySelector(".description").innerText;
      const productId = parent.id.split("-")[1]; // Extract the product ID

      fetch("/store_product/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({
          description: description,
          product_id: productId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            alert(data.message); // Notify success
          } else {
            console.error("Failed to store product");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  });

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var urlParams = new URLSearchParams(window.location.search);
  var scrollToId = urlParams.get("scrollTo");
  if (scrollToId) {
    var element = document.getElementById(scrollToId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
});
