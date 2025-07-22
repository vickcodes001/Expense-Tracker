// get the button that will show the modal
const modalBtn = document.getElementById("modal-btn");

// show modal
const modalContainer = document.getElementById("modal-container");
const remove = document.getElementById("cancel-modal");

modalBtn.addEventListener("click", showModal);
remove.addEventListener("click", removeModal);

function showModal() {
  console.log("this was clicked");
  modalContainer.classList.remove("d-none");
}

// close modal
function removeModal() {
  console.log("this is to close the modal");
  modalContainer.classList.add("d-none");
}

// adding new expense to the category dropdown
const inputValue = document.getElementById("new-expense-input");
const addExpenseBtn = document.getElementById("add-expense"); //stored the value of add button
const category = document.getElementById("category-select"); //stored the value of category
const amountInput = document.getElementById("amount-input"); //stored the value of amount
const dateInput = document.getElementById("date-input"); //stored the value of date

// THIS IS THE ADD EXPENSE BTN CATEGORY
addExpenseBtn.addEventListener("click", () => {
  const newCategory = document.createElement("option");

  newCategory.textContent = inputValue.value;

  const newValue = inputValue.value;

  if (newValue === "") {
    alert("put in a value");
    return
  }

  for (let option of category.options) {
    if (option.text === newValue) {
      alert("This category already exists!");
      return;
    }
  }

  category.appendChild(newCategory);
  modalContainer.classList.add("d-none");

  inputValue.value = "";
});

// send selected category to category table head
const addBtn = document.getElementById("add-btn");
categoryValue = category.value;

addBtn.addEventListener("click", () => {
  const tableBody = document.getElementById("expense-table-body");
  const selectedIndex = category.selectedIndex; // Get the selected index (e.g., 0 or 1)
  const selectedOption = category.options[selectedIndex]; // Get the <option> element at that index
  const selectedAmount = amountInput.value; //Got the value of amount input
  const selectedText = selectedOption.text; // Get the visible text of that option
  const selectedDate = dateInput.value; // Got the value of date stored in a variable

  // if nothing was selected, return nothing
  if (!selectedText) return;
  if (!selectedAmount) return;
  if (!selectedDate) return;

  const row = document.createElement("tr");
  const categoryCell = document.createElement("td"); // cell becomes the new table data created
  categoryCell.textContent = selectedText; //food was selected
  const amountCell = document.createElement("td"); // new cell was created for amount input
  amountCell.textContent = selectedAmount; // the value of amount input was stored in the cell
  const dateCell = document.createElement("td"); // new cell was created for amount input
  dateCell.textContent = selectedDate; // the value of amount input was stored in the cell

  const deleteCell = document.createElement("td");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.backgroundColor = "red";
  deleteBtn.style.color = "white";
  deleteBtn.style.border = "none";
  deleteBtn.style.padding = "4px 10px";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.style.borderRadius = "10px";

  deleteBtn.addEventListener("click", () => {
    row.remove();
    updateTotal();
  });

  deleteCell.appendChild(deleteBtn);
  // console.log(deleteValue);
  // console.log(deleteCell);

  row.appendChild(categoryCell);
  row.appendChild(amountCell); // the cellTwo that had the value of amount input was appended to row
  row.appendChild(dateCell);
  row.appendChild(deleteCell);

  tableBody.appendChild(row);

  // clearing off the values after clicking add btn
  amountInput.value = "";
  dateInput.value = "";
  category.selectedIndex = 0;

  updateTotal();
});

// get the total amount updated anytime a new row is added
function updateTotal() {
  const rows = document.querySelectorAll("#expense-table-body tr");
  let total = 0;

  rows.forEach((row) => {
    const amountCell = row.cells[1];
    if (amountCell) {
      const value = parseFloat(amountCell.textContent);
      if (!isNaN(value)) {
        total += value;
      }
    }
  });

  document.getElementById("total-amount").textContent = total.toFixed(2);
}


//  AUTHENTICATION

const userNameParagraph = document.getElementById("user-name-paragraph")
const savedUserName = localStorage.getItem("loginName")

if (savedUserName) {
  userNameParagraph.textContent = `Welcome, ${savedUserName}`
} else {
  userNameParagraph.textContent = "Welcome, guest!"
}