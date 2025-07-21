// Get DOM elements
const balanceEl = document.getElementById("balance");
const incomeEl = document.querySelector(".money-plus p");
const expenseEl = document.querySelector(".money-minus p");
const transactionList = document.querySelector("ul");
const nameInput = document.querySelector(
  "input[placeholder='ENTER NAME OF TRANSACTION']"
);
const amountInput = document.querySelector("input[placeholder='ENTER AMOUNT']");
const addBtn = document.querySelector(".btn-add");

// Array to hold all transactions
let transactions = [];

// Handle add button click
addBtn.addEventListener("click", function (e) {
  e.preventDefault(); // Prevent form from reloading the page

  const name = nameInput.value.trim(); // Get transaction name
  const amount = parseFloat(amountInput.value.trim()); // Convert amount input to a number

  // Validate input
  if (name === "" || isNaN(amount)) {
    alert("ENTER BOTH NAME AND VALID AMOUNT");
    return;
  }

  // Create transaction object with unique ID
  const transaction = {
    id: Date.now(), // unique ID using current timestamp
    name,
    amount,
  };

  // Add to the transactions array
  transactions.push(transaction);

  // Update the display
  updateUI();

  // Clear input fields
  nameInput.value = "";
  amountInput.value = "";
});

// Function to update the UI with current transactions
function updateUI() {
  // Clear the list before re-rendering
  transactionList.innerHTML = "";

  // Loop through all transactions and create list items
  transactions.forEach((transaction) => {
    const li = document.createElement("li"); // Create a new list item

    // Determine sign and color based on amount
    const sign = transaction.amount > 0 ? '+' : '-';
    const color = transaction.amount > 0 ? 'green' : 'red';

    // Add name and amount using spans for spacing and color
    li.innerHTML = `
      <span>${transaction.name}</span>
      <span style="color: ${color};">${sign}$${Math.abs(transaction.amount)}</span>
    `;
    // Add the list item to the UL
    transactionList.appendChild(li);
  });

  // Create array of only the amounts
  const amounts = transactions.map((t) => t.amount);

  // Calculate total balance
  const total = amounts.reduce((acc, item) => acc + item, 0);

  // Calculate total income
  const income = amounts
    .filter((a) => a > 0) // Filter only positive values
    .reduce((acc, val) => acc + val, 0); // Sum them

  // Calculate total expense
  const expense = amounts
    .filter((a) => a < 0) // Filter only negative values
    .reduce((acc, val) => acc + val, 0); // Sum them

  // Update UI text values
  balanceEl.textContent = `$${total.toFixed(2)}`;
  incomeEl.textContent = `+$${income.toFixed(2)}`;
  expenseEl.textContent = `-$${Math.abs(expense).toFixed(2)}`;
}
