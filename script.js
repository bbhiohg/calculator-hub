// ====== Global Currency ======
let currency = '$';

// ====== Utility Functions ======
function popChip(id) {
    const chip = document.getElementById(id);
    chip.classList.add('pop');
    setTimeout(() => chip.classList.remove('pop'), 300);
}

// Save to localStorage history
function saveHistory(tool, result) {
    let history = JSON.parse(localStorage.getItem(tool + '_history')) || [];
    history.unshift(result); // add latest to front
    if(history.length > 5) history.pop(); // keep max 5
    localStorage.setItem(tool + '_history', JSON.stringify(history));
}

// Display history
function showHistory(tool, containerId) {
    const container = document.getElementById(containerId);
    if(!container) return;
    let history = JSON.parse(localStorage.getItem(tool + '_history')) || [];
    container.innerHTML = history.map(r => `<div class="chip">${r}</div>`).join('');
}

// ====== Tip Calculator ======
function calculateTip() {
    let bill = parseFloat(document.getElementById('bill').value) || 0;
    let tipPercent = parseFloat(document.getElementById('tip').value) || 0;
    let people = parseInt(document.getElementById('people').value) || 1;

    let tipAmount = bill * (tipPercent/100);
    let total = bill + tipAmount;
    let perPerson = total / people;

    document.getElementById('tipAmount').innerText = currency + tipAmount.toFixed(2);
    document.getElementById('totalAmount').innerText = currency + total.toFixed(2);
    document.getElementById('perPerson').innerText = currency + perPerson.toFixed(2);

    popChip('tipAmount'); popChip('totalAmount'); popChip('perPerson');

    saveHistory('tip', `Tip: ${currency}${tipAmount.toFixed(2)} | Total: ${currency}${total.toFixed(2)} | Per Person: ${currency}${perPerson.toFixed(2)}`);
    showHistory('tip', 'tipHistory');
}

// ====== Split Bill ======
function calculateSplit() {
    let totalBill = parseFloat(document.getElementById('totalBill').value) || 0;
    let numPeople = parseInt(document.getElementById('numPeople').value) || 1;
    let perPerson = totalBill / numPeople;

    document.getElementById('perPersonBill').innerText = currency + perPerson.toFixed(2);
    popChip('perPersonBill');

    saveHistory('split', `Per Person: ${currency}${perPerson.toFixed(2)}`);
    showHistory('split', 'splitHistory');
}

// ====== Budget Calculator ======
function calculateBudget() {
    let income = parseFloat(document.getElementById('income').value) || 0;
    let needs = income * 0.5;
    let wants = income * 0.3;
    let savings = income * 0.2;

    document.getElementById('needs').innerText = currency + needs.toFixed(2);
    document.getElementById('wants').innerText = currency + wants.toFixed(2);
    document.getElementById('savings').innerText = currency + savings.toFixed(2);

    popChip('needs'); popChip('wants'); popChip('savings');

    saveHistory('budget', `Needs: ${currency}${needs.toFixed(2)} | Wants: ${currency}${wants.toFixed(2)} | Savings: ${currency}${savings.toFixed(2)}`);
    showHistory('budget', 'budgetHistory');

    // Placeholder for chart (use Chart.js)
    if(window.drawBudgetChart) drawBudgetChart(needs, wants, savings);
}

// ====== Savings Calculator ======
function calculateSavings() {
    let goal = parseFloat(document.getElementById('goal').value) || 0;
    let monthly = parseFloat(document.getElementById('monthly').value) || 0;
    let monthsNeeded = monthly > 0 ? Math.ceil(goal / monthly) : 0;

    document.getElementById('monthsNeeded').innerText = monthsNeeded;
    popChip('monthsNeeded');

    saveHistory('savings', `Goal: ${currency}${goal} | Monthly: ${currency}${monthly} | Months: ${monthsNeeded}`);
    showHistory('savings', 'savingsHistory');

    if(window.drawSavingsChart) drawSavingsChart(goal, monthly);
}

// ====== Debt Payoff ======
function calculateDebt() {
    let debt = parseFloat(document.getElementById('debt').value) || 0;
    let payment = parseFloat(document.getElementById('payment').value) || 0;
    let interest = parseFloat(document.getElementById('interest').value) || 0;

    let monthsNeeded = 0;
    let balance = debt;

    while(balance > 0 && monthsNeeded < 600) {
        balance = balance + (balance*(interest/100)) - payment;
        monthsNeeded++;
        if(balance <=0) break;
    }

    document.getElementById('debtMonths').innerText = monthsNeeded;
    popChip('debtMonths');

    saveHistory('debt', `Debt: ${currency}${debt} | Payment: ${currency}${payment} | Months: ${monthsNeeded}`);
    showHistory('debt', 'debtHistory');

    if(window.drawDebtChart) drawDebtChart(debt, payment, interest, monthsNeeded);
}

// ====== Subscription Calculator ======
function calculateSubscription() {
    let monthlySub = parseFloat(document.getElementById('monthlySub').value) || 0;
    let monthsSub = parseInt(document.getElementById('monthsSub').value) || 0;
    let total = monthlySub * monthsSub;

    document.getElementById('totalSub').innerText = currency + total.toFixed(2);
    popChip('totalSub');

    saveHistory('subscription', `Monthly: ${currency}${monthlySub} | Months: ${monthsSub} | Total: ${currency}${total.toFixed(2)}`);
    showHistory('subscription', 'subscriptionHistory');
}

// ====== Currency Selector ======
function setCurrency(newCurrency){
    currency = newCurrency;
    // Optionally recalc all visible results
}

// ====== Tip Presets ======
function setTipPreset(percent) {
    document.getElementById('tip').value = percent;
    calculateTip();
}

// ====== Sliders ======
// Attach event listeners for any slider inputs (optional)