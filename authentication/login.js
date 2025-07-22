const loginBtn = document.getElementById("login-btn")
const userName = document.getElementById("user-name")

loginBtn.addEventListener("click", () => {
  const storedData = localStorage.getItem("userData")

  if (!storedData) {
    alert("user not registered")
    return
  }
  
  const userData = JSON.parse(storedData)
  const enteredName = userData.value.trim()

  if (userData.name !== enteredName) {
    alert("No matching user found")
  }

  localStorage.setItem("loginName", user)
  
  window.location.href = "/"
})


