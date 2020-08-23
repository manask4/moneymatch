var conversionRate = 74.93;
var richIps = 185475;
var intervalIds = [];
var myTimer = new easytimer.Timer();
var startTimerButton = document.getElementById("start-timer");
var stopTimerButton = document.getElementById("stop-timer");
var pauseTimerButton = document.getElementById("pause-timer");
var userIncomeInput = document.getElementById("user-income");
var contenderRows = document.getElementsByClassName("contender-row");

function isTimerResuming() {
  var richMoney = Number(
    document.getElementById("rich-money").innerHTML.replace(/\,/g, "")
  );
  return richMoney > 0;
}

function start(userIncome) {
  var timerResuming = isTimerResuming();
  userIncome = (userIncome / 365 / 24 / 3600).toFixed(3);
  startTimer(timerResuming);

  var startMs = new Date().getTime();
  if (timerResuming) {
    startMs = Number(startMs - myTimer.getTotalTimeValues().seconds * 1000);
  }

  var moneyIntervalId = setInterval(function () {
    var currMs = new Date().getTime();
    var secondsElapsed = (currMs - startMs) / 1000;

    var richDudeNewAmount = (secondsElapsed * richIps).toFixed(2);
    richDudeNewAmount = formatNumber(richDudeNewAmount);
    document.getElementById("rich-money").innerHTML = richDudeNewAmount;

    var userNewAmount = (secondsElapsed * userIncome).toFixed(2);
    userNewAmount = formatNumber(userNewAmount);
    document.getElementById("poor-money").innerHTML = userNewAmount;
  }, 100);
  intervalIds.push(moneyIntervalId);
}

function startTimer(timerResuming) {
  if (timerResuming) {
    myTimer.start();
  } else {
    myTimer.reset();
    myTimer.start({
      precision: "seconds",
      countdown: false,
      startValues: 0,
    });
  }
  var timerIntervalId = setInterval(function () {
    var timeValues = myTimer.getTimeValues();
    var timerData =
      timeValues.hours +
      "h " +
      timeValues.minutes +
      "m " +
      timeValues.seconds +
      "s";
    document.getElementById("timer").innerHTML = timerData;
  }, 1000);
  intervalIds.push(timerIntervalId);
}

function formatNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function resetAll() {
  document.getElementById("timer").innerHTML = "0h 0m 0s";
  document.getElementById("rich-money").innerHTML = "0.00";
  document.getElementById("poor-money").innerHTML = "0.00";
}

function closeIncomeModal() {
  if (validateUserInput()) {
    document
      .getElementById("income-modal")
      .classList.remove("is-active", "is-clipped");
  } else {
    userIncomeInput.classList.add("is-danger");
    document.getElementById("error-text").classList.remove("is-hidden");
  }
}

function closeContendersModal() {
  document
    .getElementById("contenders-modal")
    .classList.remove("is-active", "is-clipped");
}

function openModal() {
  document
    .getElementById("income-modal")
    .classList.add("is-active", "is-clipped");
}

function openContendersModal() {
  document
    .getElementById("contenders-modal")
    .classList.add("is-active", "is-clipped");
}

function validateUserInput() {
  value = userIncomeInput.value;
  if (value.length == 0 || value < 70000) {
    return false;
  }
  return true;
}

function clearAllIntervals() {
  for (var i = 0; i < intervalIds.length; i++) {
    window.clearInterval(intervalIds[i]);
  }
}

function removeSelectedRow() {
  for (var i = 0; i < contenderRows.length; i++) {
    contenderRows[i].classList.remove("is-selected");
  }
}

function convertToBillionDollars(rupees) {
  return (rupees / conversionRate / 1000000000).toFixed(8);
}

function convertToRupees(dollars) {
  return dollars * 1000000000 * conversionRate;
}

document.getElementById("trigger-income-modal").onclick = openModal;
document.getElementById(
  "trigger-contenders-modal"
).onclick = openContendersModal;
document.getElementById("income-modal-close").onclick = closeIncomeModal;
document.getElementById(
  "contenders-modal-close"
).onclick = closeContendersModal;

document.getElementById("set-income").onclick = function setIncome() {
  if (!validateUserInput()) {
    userIncomeInput.classList.add("is-danger");
    document.getElementById("error-text").classList.remove("is-hidden");
  } else {
    document.getElementById("error-text").classList.add("is-hidden");
    document.getElementById("poor-tag").innerHTML =
      "Rs " + formatNumber(userIncomeInput.value);
    closeIncomeModal();
  }
};

startTimerButton.onclick = function startDepression() {
  userIncome = userIncomeInput.value;
  this.classList.add("is-hidden");
  pauseTimerButton.classList.remove("is-hidden");
  stopTimerButton.classList.remove("is-hidden");
  start(userIncome);
};

pauseTimerButton.onclick = function pauseDepression() {
  this.classList.add("is-hidden");
  startTimerButton.classList.remove("is-hidden");
  myTimer.pause();
  var timeValues = myTimer.getTimeValues();
  var timerData =
    timeValues.hours +
    "h " +
    timeValues.minutes +
    "m " +
    timeValues.seconds +
    "s";
  document.getElementById("timer").innerHTML = timerData;
  clearAllIntervals();
};

stopTimerButton.onclick = function stopDepression() {
  myTimer.stop();
  myTimer.reset();
  clearAllIntervals();
  startTimerButton.classList.remove("is-hidden");
  pauseTimerButton.classList.add("is-hidden");
  this.classList.add("is-hidden");
  resetAll();
};

window.onload = function onPageLoad() {
  openModal();
};

userIncomeInput.oninput = function onIncomeInput(e) {
  this.value = this.value.slice(0, this.maxLength);
  // seventy thousand - one.five lac
  if (this.value >= 70000 && this.value <= 150000) {
    document.getElementById("set-income").innerHTML = "I'm an intern";
  }
  // one.five lac - ten lac
  else if (this.value > 150000 && this.value <= 1000000) {
    document.getElementById("set-income").innerHTML = "I'm in the middle";
  }
  // ten lac - one crore
  else if (this.value > 1000000 && this.value <= 10000000) {
    document.getElementById("set-income").innerHTML = "I'm feeling rich";
  }
  // above one crore
  else if (this.value > 10000000 && this.value <= 100000000) {
    document.getElementById("set-income").innerHTML = "I am rich";
  }
  // above ten crore
  else if (this.value > 100000000) {
    document.getElementById("set-income").innerHTML =
      "Bow down to me, peasants";
  }
};

for (var i = 0; i < contenderRows.length; i++) {
  contenderRows[i].onclick = function rowSelected() {
    removeSelectedRow();
    this.classList.add("is-selected");
  };
}

document.getElementById("set-contender").onclick = function setContender() {
  var selectedRow = document.getElementsByClassName("is-selected")[0];
  var imgElement = selectedRow.getElementsByTagName("img")[0];
  var richDude = document.getElementById("rich-dude");
  richDude.src = imgElement.src;
  richDude.alt = imgElement.alt;

  var moneyElement = selectedRow.getElementsByClassName("contender-nw")[0];
  var money = moneyElement.innerHTML.match(/\d+/g);

  var moneyInRupees = convertToRupees(money[0]).toFixed(0);
  document.getElementById("rich-tag").innerHTML =
    "Rs " + formatNumber(moneyInRupees);

  money = Number(money[0] + "000000000"); // 9zeros in a billion
  var ipsDollars = (money / 365 / 24 / 3600).toFixed(3);
  richIps = (ipsDollars * conversionRate).toFixed(0);

  myTimer.stop();
  myTimer.reset();
  clearAllIntervals();
  startTimerButton.classList.remove("is-hidden");
  pauseTimerButton.classList.add("is-hidden");
  stopTimerButton.classList.add("is-hidden");
  resetAll();
  closeContendersModal();
};
