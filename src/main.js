var ambani = 26666;
var intervalIds = [];
var myTimer = new easytimer.Timer();
var startTimerButton = document.getElementById("start-timer");
var stopTimerButton = document.getElementById("stop-timer");
var userIncomeInput = document.getElementById("user-income");

function start(userIncome) {
  userIncome = (userIncome / 365 / 24 / 3600).toFixed(3);
  console.log(userIncome)
  startTimer();
  var startMs = new Date().getTime();
  var moneyIntervalId = setInterval(function () {
    var currMs = new Date().getTime();
    var secondsElapsed = (currMs - startMs) / 1000;

    var ambaniNewAmount = secondsElapsed * ambani;
    ambaniNewAmount = ambaniNewAmount.toFixed(2);
    ambaniNewAmount = formatNumber(ambaniNewAmount);
    document.getElementById("rich-money").innerHTML = ambaniNewAmount;

    var userNewAmount = secondsElapsed * userIncome;
    userNewAmount = userNewAmount.toFixed(2);
    userNewAmount = formatNumber(userNewAmount);
    document.getElementById("poor-money").innerHTML = userNewAmount;
  }, 100);
  intervalIds.push(moneyIntervalId);
}

function startTimer() {
  myTimer.reset();
  myTimer.start({
    precision: "seconds",
    countdown: false,
    startValues: 0,
  });
  var timerIntervalId = setInterval(function () {
    var timeValues = myTimer.getTimeValues();
    var timerData = timeValues.hours+'h ' + timeValues.minutes+'m ' + timeValues.seconds+'s';
    document.getElementById("timer").innerHTML = timerData;
  }, 1000);
  intervalIds.push(timerIntervalId);
}

function formatNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function resetAll() {
  document.getElementById("timer").innerHTML = '0h 0m 0s';
  document.getElementById("rich-money").innerHTML = '0.00';
  document.getElementById("poor-money").innerHTML = '0.00';
}

function closeModal() {
  if (validateUserInput()) {
    document
    .getElementsByClassName("modal")[0]
    .classList.remove("is-active", "is-clipped");
  }
  else {
    userIncomeInput.classList.add("is-danger");
    document.getElementById('error-text').classList.remove('is-hidden');
  }
}

function openModal() {
  document
    .getElementsByClassName("modal")[0]
    .classList.add("is-active", "is-clipped");
}

document.getElementById("trigger-income-modal").onclick = openModal;
document.getElementsByClassName("modal-close")[0].onclick = closeModal;

document.getElementById("set-income").onclick = function setIncome() {
  if (!validateUserInput()) {
    userIncomeInput.classList.add("is-danger");
    document.getElementById('error-text').classList.remove('is-hidden');
  } else {
    document.getElementById('error-text').classList.add('is-hidden');
    closeModal();
  }
};

startTimerButton.onclick = function startDepression() {
  userIncome = userIncomeInput.value;
  this.classList.add("is-hidden");
  stopTimerButton.classList.remove("is-hidden");
  start(userIncome);
}

stopTimerButton.onclick = function stopDepression() {
  myTimer.stop();
  myTimer.reset();
  for (var i = 0; i < intervalIds.length; i++) {  
    window.clearInterval(intervalIds[i]);
  }
  startTimerButton.classList.remove("is-hidden");
  this.classList.add("is-hidden");
  resetAll();
}

window.onload = function onPageLoad() {
  openModal();
};

userIncomeInput.oninput = function onIncomeInput(e) {
  this.value = this.value.slice(0,this.maxLength);
  // seventy thousand - one.five lac
  if (this.value >= 70000 && this.value <= 150000) {
    document.getElementById("set-income").innerHTML = 'I\'m an intern';
  }
  // one.five lac - ten lac
  else if (this.value > 150000 && this.value <= 1000000) {
    document.getElementById("set-income").innerHTML = 'I\'m in the middle';
  }
  // ten lac - one crore
  else if (this.value > 1000000 && this.value <= 10000000) {
    document.getElementById("set-income").innerHTML = 'I\'m feeling rich';
  }
  // above one crore
  else if (this.value > 10000000 && this.value <= 100000000) {
    document.getElementById("set-income").innerHTML = 'I am rich';
  }
  // above ten crore
  else if (this.value > 100000000) {
    document.getElementById("set-income").innerHTML = 'Bow down to me, peasants';
  }
}

function validateUserInput() {
  value = userIncomeInput.value;
  if (value.length == 0 || value < 70000) {
    return false;
  }
  return true;
}