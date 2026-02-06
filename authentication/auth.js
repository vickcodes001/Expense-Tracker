// Get all users from localStorage
function getAllUsers() {
  const users = localStorage.getItem("expenseTrackerUsers");
  return users ? JSON.parse(users) : [];
}

// Save all users to localStorage
function saveAllUsers(users) {
  localStorage.setItem("expenseTrackerUsers", JSON.stringify(users));
}

// Find user by email
function findUserByEmail(email) {
  const users = getAllUsers();
  return users.find((user) => user.email === email);
}

// Check if user is already logged in and redirect
if (localStorage.getItem("isLoggedIn") === "true") {
  window.location.href = "index.html";
}

// ========== SIGNUP PAGE LOGIC ==========
const signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("signup-name").value.trim();
    const email = document
      .getElementById("signup-email")
      .value.trim()
      .toLowerCase();
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById(
      "signup-confirm-password",
    ).value;
    const errorDiv = document.getElementById("signup-error");

    // Hide previous errors
    errorDiv.style.display = "none";

    // Validation
    if (!name) {
      errorDiv.textContent = "Please enter your name!";
      errorDiv.style.display = "block";
      return;
    }

    if (password !== confirmPassword) {
      errorDiv.textContent = "Passwords do not match!";
      errorDiv.style.display = "block";
      return;
    }

    if (password.length < 6) {
      errorDiv.textContent = "Password must be at least 6 characters!";
      errorDiv.style.display = "block";
      return;
    }

    // Check if user already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      errorDiv.textContent = "An account with this email already exists!";
      errorDiv.style.display = "block";
      return;
    }

    // Get all users and add new user
    const users = getAllUsers();
    const newUser = {
      name: name,
      email: email,
      password: password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveAllUsers(users);

    // Save email to pass to login page
    localStorage.setItem("tempEmail", email);

    // Redirect to login page
    window.location.href = "login.html";
  });
}

// ========== LOGIN PAGE LOGIC ==========
const loginForm = document.getElementById("login-form");

if (loginForm) {
  // Check if user just signed up
  const tempEmail = localStorage.getItem("tempEmail");
  const loginSuccess = document.getElementById("login-success");

  if (tempEmail) {
    // Auto-fill email
    document.getElementById("login-email").value = tempEmail;

    // Show success message
    if (loginSuccess) {
      loginSuccess.textContent = "Account created successfully! Please log in.";
      loginSuccess.style.display = "block";

      setTimeout(() => {
        loginSuccess.style.display = "none";
      }, 5000);
    }

    // Clear temp email
    localStorage.removeItem("tempEmail");
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document
      .getElementById("login-email")
      .value.trim()
      .toLowerCase();
    const password = document.getElementById("login-password").value;
    const errorDiv = document.getElementById("login-error");

    // Hide previous errors
    errorDiv.style.display = "none";

    // Find user
    const user = findUserByEmail(email);

    if (!user) {
      errorDiv.textContent = "No account found with this email!";
      errorDiv.style.display = "block";
      return;
    }

    // Check password
    if (user.password !== password) {
      errorDiv.textContent = "Incorrect password!";
      errorDiv.style.display = "block";
      return;
    }

    // Successful login - save login state
    localStorage.setItem("loginName", user.name);
    localStorage.setItem("loginEmail", user.email);
    localStorage.setItem("isLoggedIn", "true");

    // Redirect to main page
    window.location.href = "../index.html";
  });
}

// ========== UNIVERSAL SHOW / HIDE PASSWORD ==========
const toggleButtons = document.querySelectorAll(".toggle-password");

toggleButtons.forEach((icon) => {
  const input = icon.previousElementSibling;

  // Create open eye image dynamically
  const openEye = document.createElement("img");
  openEye.src = "/icon-eye.png";
  openEye.alt = "Hide password";
  openEye.classList.add("toggle-password");
  openEye.style.display = "none";

  icon.parentElement.appendChild(openEye);

  icon.addEventListener("click", () => {
    input.type = "text";
    icon.style.display = "none";
    openEye.style.display = "block";
  });

  openEye.addEventListener("click", () => {
    input.type = "password";
    openEye.style.display = "none";
    icon.style.display = "block";
  });
});
