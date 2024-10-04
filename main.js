let income = 0;
let expenses = [];
let balance = 0;

document.getElementById("income-btn").addEventListener("click", addIncome);
document.getElementById("expense-btn").addEventListener("click", addExpense);

function addIncome() {
    const incomeInput = document.getElementById("income-input");
    const incomeAmount = parseFloat(incomeInput.value);
    if (incomeAmount > 0) {
        income += incomeAmount;
        updateBalance();
        incomeInput.value = "";
    }
}

function addExpense() {
    const expenseNameInput = document.getElementById("expense-name-input");
    const expenseAmountInput = document.getElementById("expense-amount-input");
    const expenseName = expenseNameInput.value;
    const expenseAmount = parseFloat(expenseAmountInput.value);
    if (expenseName && expenseAmount > 0) {
        expenses.push({ name: expenseName, amount: expenseAmount });
        updateBalance();
        updateExpenseList();
        expenseNameInput.value = "";
        expenseAmountInput.value = "";
    }
}

function updateBalance() {
    balance = income - expenses.reduce((total, expense) => total + expense.amount, 0);
    document.getElementById("balance-amount").textContent = `Balance: $${balance.toFixed(2)}`;
}

function updateExpenseList() {
    const expenseList = document.getElementById("expense-list");
    expenseList.innerHTML = "";
    expenses.forEach((expense, index) => {
        const expenseListItem = document.createElement("li");
        expenseListItem.textContent = `${expense.name}: $${expense.amount.toFixed(2)}`;
        expenseList.appendChild(expenseListItem);
    });
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    updateBalance();
    updateExpenseList();
}

document.getElementById("expense-list").addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        const index = Array.prototype.indexOf.call(e.target.parentNode.children, e.target);
        deleteExpense(index);
    }
});