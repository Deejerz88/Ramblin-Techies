const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    if (window.location.pathname.includes("/dashboard")) {
      window.location.replace("/");
    } else {
      document.location.reload();
    }
  } else {
    $('.toast-body').text("Failed to log out")
    $('.toast').toast('show');
  }
};

document.querySelector("#logout").addEventListener("click", logout);
