function calcTip(){
let bill=parseFloat(document.getElementById("bill").value);
let tip=parseFloat(document.getElementById("tip").value);

let tipAmount=bill*(tip/100);
let total=bill+tipAmount;

document.getElementById("result").innerHTML=
"Tip: $"+tipAmount.toFixed(2)+" | Total: $"+total.toFixed(2);
}

function splitBill(){
let bill=parseFloat(document.getElementById("bill").value);
let people=parseFloat(document.getElementById("people").value);

let each=bill/people;

document.getElementById("result").innerHTML=
"Each person pays: $"+each.toFixed(2);
}

function calcBudget(){
let income=parseFloat(document.getElementById("income").value);
let expenses=parseFloat(document.getElementById("expenses").value);

let remaining=income-expenses;

document.getElementById("result").innerHTML=
"Remaining money: $"+remaining.toFixed(2);
}

function calcSavings(){
let goal=parseFloat(document.getElementById("goal").value);
let monthly=parseFloat(document.getElementById("monthly").value);

let months=goal/monthly;

document.getElementById("result").innerHTML=
"Months needed: "+Math.ceil(months);
}

function calcDebt(){
let debt=parseFloat(document.getElementById("debt").value);
let payment=parseFloat(document.getElementById("payment").value);

let months=debt/payment;

document.getElementById("result").innerHTML=
"Months to pay off: "+Math.ceil(months);
}

function calcSubs(){
let total=0;
document.querySelectorAll(".sub").forEach(i=>{
total+=parseFloat(i.value)||0;
});

document.getElementById("result").innerHTML=
"Monthly subscriptions: $"+total.toFixed(2);
}
