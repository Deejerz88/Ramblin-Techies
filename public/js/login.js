const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      const data = await response.json();
      const id = data.user.id;
      const blogId = window.location.search.split("=")[1] || null;
      if (blogId) {
        document.location.replace(`/blog/${blogId}`);
      } else {
        document.location.replace(`/dashboard/${id}`);
      }
    } else {
      $('.toast-body').text("Incorrect email or password. Please try again!")
      $('.toast').toast('show');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (name && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      const id = data.id;
      document.location.replace(`/dashboard/${id}`);
    } else {
      $('.toast-body').text("User already exists. Please try again!")
      $('.toast').toast('show');
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
