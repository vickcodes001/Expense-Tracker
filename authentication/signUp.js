const userName = document.getElementById("user-name");
const signInBtn = document.getElementById("sign-in-btn");

signInBtn.addEventListener("click", () => {
    const email = document.getElementById("user-email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message")

    errorMessage.style.color = "red"

    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailFormat.test(email)) {
        errorMessage.textContent = "please put in a valid email"
        return
    }

    const userSignIn = {
    email,
    password,
  };

  console.log(userSignIn);
  

  localStorage.setItem("userData", userSignIn);
  alert("sign in successful")
  window.location.href = "login.html";
});

