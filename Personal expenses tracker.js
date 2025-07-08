// DOM Elements
const registerSection = document.getElementById("register-section");
const loginSection = document.getElementById("login-section");
const trackerSection = document.getElementById("tracker-section");
const savedSection = document.getElementById("saved-section");

const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("logout-btn");

const budgetForm = document.getElementById("budget-form");
const expenseForm = document.getElementById("expense-form");
const saveBtn = document.getElementById("save-btn");
const viewSavedBtn = document.getElementById("view-saved-btn");
const backBtn = document.getElementById("back-btn");

const welcomeUser = document.getElementById("welcome-user");
const displayBudget = document.getElementById("display-budget");
const totalExpenses = document.getElementById("total-expenses");
const balance = document.getElementById("balance");
const expensesList = document.getElementById("expenses-list");
const savedList = document.getElementById("saved-list");

const regError = document.getElementById("reg-error");
const loginError = document.getElementById("login-error");

let budget = 0;
let expenses = [];

// Initial view
if (!localStorage.getItem("userEmail") || !localStorage.getItem("userPassword")) {
    showSection("register");
} else {
    showSection("login");
}

// Section visibility
function showSection(section) {
    registerSection.style.display = section === "register" ? "block" : "none";
    loginSection.style.display = section === "login" ? "block" : "none";
    trackerSection.style.display = section === "tracker" ? "block" : "none";
    savedSection.style.display = section === "saved" ? "block" : "none";
}

// Registration
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    if (email && password.length >= 6) {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
        showSection("login");
    } else {
        regError.innerText = "Password must be at least 6 characters.";
    }
});

// Login
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");

    if (email === savedEmail && password === savedPassword) {
        showSection("tracker");
        welcomeUser.innerText = `Welcome, ${email}`;
    } else {
        loginError.innerText = "Incorrect email or password.";
    }
});

// Logout
logoutBtn.addEventListener("click", () => {
    showSection("login");
});

// Budget
budgetForm.addEventListener("submit", (e) => {
    e.preventDefault();
    budget = parseFloat(document.getElementById("budget").value);
    updateDisplay();
});

// Add expense
expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("expense-name").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);
    if (name && amount > 0) {
        expenses.push({
            name,
            amount
        });
        updateDisplay();
        expenseForm.reset();
    }
});

// Save expenses
saveBtn.addEventListener("click", () => {
    localStorage.setItem("savedExpenses", JSON.stringify(expenses));
    alert("Expenses saved!");
});

// View saved expenses
viewSavedBtn.addEventListener("click", () => {
    showSection("saved");
    const saved = JSON.parse(localStorage.getItem("savedExpenses")) || [];
    savedList.innerHTML = "";
    saved.forEach((exp) => {
        const li = document.createElement("li");
        li.textContent = `${exp.name}: ₹${exp.amount}`;
        savedList.appendChild(li);
    });
});

// Back to tracker
backBtn.addEventListener("click", () => {
    showSection("tracker");
});

// Update display
function updateDisplay() {
    displayBudget.innerText = budget.toFixed(2);
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    totalExpenses.innerText = total.toFixed(2);
    balance.innerText = (budget - total).toFixed(2);

    expensesList.innerHTML = "";
    expenses.forEach((exp, index) => {
        const li = document.createElement("li");
        li.textContent = `${exp.name}: ₹${exp.amount}`;
        expensesList.appendChild(li);
    });
}