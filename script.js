// ---------------- CATEGORY CUSTOM SELECT ----------------
const customSelect = document.getElementById("custom-category-select");
const trigger = customSelect.querySelector(".custom-select-trigger");
const triggerText = trigger.querySelector("span");
const hiddenInput = document.getElementById("category-select");
const optionsContainer = customSelect.querySelector(".custom-options");

["Food", "Rent", "Transport", "Relaxing"].forEach(createCategory);

trigger.addEventListener("click", (e) => {
  e.stopPropagation();
  customSelect.classList.toggle("open");
});

document.addEventListener("click", () => {
  customSelect.classList.remove("open");
  dateSelect.classList.remove("open");
});

function createCategory(value) {
  const opt = document.createElement("div");
  opt.className = "custom-option";
  opt.dataset.value = value;
  opt.textContent = value;

  opt.addEventListener("click", () => {
    triggerText.textContent = value;
    hiddenInput.value = value;
    customSelect.classList.remove("open");
  });

  optionsContainer.appendChild(opt);
}

// ---------------- DATE CUSTOM SELECT ----------------
const dateSelect = document.getElementById("custom-date-select");
const dateTrigger = dateSelect.querySelector(".custom-select-trigger");
const dateTriggerText = dateTrigger.querySelector("span");
const dateOptions = document.getElementById("date-options");
const dateInput = document.getElementById("date-input");

dateTrigger.addEventListener("click", (e) => {
  e.stopPropagation();
  dateSelect.classList.toggle("open");
});

for (let i = 0; i < 100; i++) {
  const d = new Date();
  d.setDate(d.getDate() - i);
  const formatted = d.toISOString().split("T")[0];

  const opt = document.createElement("div");
  opt.className = "custom-option";
  opt.dataset.value = formatted;
  opt.textContent = formatted;

  opt.addEventListener("click", () => {
    dateOptions
      .querySelectorAll(".custom-option")
      .forEach((o) => o.classList.remove("selected"));

    opt.classList.add("selected");
    dateTriggerText.textContent = formatted;
    dateInput.value = formatted;
    dateSelect.classList.remove("open");
  });

  dateOptions.appendChild(opt);
}

// ---------------- MODAL ----------------
const modalBtn = document.getElementById("modal-btn");
const modalContainer = document.getElementById("modal-container");
const cancelModal = document.getElementById("cancel-modal");

modalBtn.onclick = () => modalContainer.classList.remove("d-none");
cancelModal.onclick = () => modalContainer.classList.add("d-none");

// ---------------- ADD CATEGORY ----------------
const inputValue = document.getElementById("new-expense-input");
const addExpenseBtn = document.getElementById("add-expense");

addExpenseBtn.addEventListener("click", () => {
  const value = inputValue.value.trim();
  if (!value) return alert("Enter category name");

  const exists = [...optionsContainer.children].some(
    (opt) => opt.dataset.value === value
  );

  if (exists) return alert("Category already exists");

  createCategory(value);
  inputValue.value = "";
  modalContainer.classList.add("d-none");
});

// ---------------- ADD EXPENSE ----------------
const addBtn = document.getElementById("add-btn");
const amountInput = document.getElementById("amount-input");

addBtn.addEventListener("click", () => {
  const category = hiddenInput.value;
  const amount = amountInput.value;
  const date = dateInput.value;

  if (!category || !amount || !date) return;

  const row = document.createElement("tr");

  row.innerHTML = `
          <td data-label="Category">${category}</td>
          <td data-label="Amount">${amount}</td>
          <td data-label="Date">${date}</td>
        `;

  const deleteCell = document.createElement("td");
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "Delete";
  deleteBtn.className = "btn-delete";

  deleteBtn.onclick = () => {
    row.remove();
    updateTotal();
  };

  deleteCell.appendChild(deleteBtn);
  row.appendChild(deleteCell);

  document.getElementById("expense-table-body").appendChild(row);

  amountInput.value = "";
  hiddenInput.value = "";
  dateInput.value = "";
  triggerText.textContent = "Select a category";
  dateTriggerText.textContent = "Select a date";

  updateTotal();
});

// ---------------- TOTAL ----------------
function updateTotal() {
  let total = 0;
  document.querySelectorAll("#expense-table-body tr").forEach((row) => {
    total += parseFloat(row.cells[1].textContent);
  });

  document.getElementById("total-amount").textContent = total.toFixed(2);
}

// ---------------- AUTH NAME ----------------
const userNameParagraph = document.getElementById("user-name-paragraph");
const savedUserName = localStorage.getItem("loginName");

userNameParagraph.textContent = savedUserName
  ? `Welcome, ${savedUserName}`
  : "Welcome, guest!";
