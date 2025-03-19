document.addEventListener("DOMContentLoaded", () => {
      const themechangerbtn = document.getElementById("theme-changer");
      const currentTheme = localStorage.getItem("theme");
  
      if (currentTheme === "dark") {
          document.body.classList.add("dark-mode");
      }
  
      themechangerbtn.addEventListener("click", () => {
          document.body.classList.toggle("dark-mode");
  
          if (document.body.classList.contains("dark-mode")) {
              localStorage.setItem("theme", "dark");
          } else {
              localStorage.setItem("theme", "light");
          }
      });
  
      const form = document.getElementById("contact-form");
  
      form.addEventListener("submit", (event) => {
          let isValid = true;
          const inputs = form.querySelectorAll("input");
  
          inputs.forEach((input) => {
              const errorMsg = input.nextElementSibling;
              if (!input.checkValidity()) {
                  errorMsg.textContent = `Invalid ${input.name}`;
                  errorMsg.style.display = "block";
                  isValid = false;
              } else {
                  errorMsg.style.display = "none";
              }
          });
  
          if (!isValid) {
              event.preventDefault(); 
          }
      });
  });

