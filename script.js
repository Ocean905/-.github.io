var userNumbers = [];
var winningNumbers = [];
var prizes = {
  first: { numbersMatched: 3, prizeAmount: 100 },
  second: { numbersMatched: 2, prizeAmount: 50 },
  third: { numbersMatched: 1, prizeAmount: 25 }
};

function startGame() {
  resetResult();
  resetAlert();

  // 获取用户输入的号码
  for (var i = 1; i <= 3; i++) {
    var userInput = parseInt(document.getElementById('number' + i).value);
    if (isNaN(userInput) || userInput < 1 || userInput > 10) {
      showError('請輸入有效數字 (範圍是 1~10)。');
      return;
    }
    if (userNumbers.indexOf(userInput) !== -1) {
      showError('請勿輸入重複的數字。');
      return;
    }
    userNumbers.push(userInput);
  }

  // 生成得獎號碼
  generateWinningNumbers();

  // 比对号码
  var numbersMatched = getNumbersMatched(userNumbers, winningNumbers);

  // 显示结果
  showResult(numbersMatched);
}

function generateWinningNumbers() {
  winningNumbers = [];
  while (winningNumbers.length < 3) {
    var randomNumber = Math.floor(Math.random() * 10) + 1;
    if (winningNumbers.indexOf(randomNumber) === -1) {
      winningNumbers.push(randomNumber);
    }
  }
}

function getNumbersMatched(userNumbers, winningNumbers) {
  var matched = 0;
  for (var i = 0; i < userNumbers.length; i++) {
    if (winningNumbers.indexOf(userNumbers[i]) !== -1) {
      matched++;
    }
  }
  return matched;
}

function showResult(numbersMatched) {
  var resultElement = document.getElementById('result');
  resultElement.innerHTML = '中獎號碼: ' + winningNumbers.join(', ');

  if (numbersMatched === prizes.first.numbersMatched) {
    showWinningResult('頭獎', prizes.first.prizeAmount);
  } else if (numbersMatched === prizes.second.numbersMatched) {
    showWinningResult('貳獎', prizes.second.prizeAmount);
  } else if (numbersMatched === prizes.third.numbersMatched) {
    showWinningResult('參獎', prizes.third.prizeAmount);
  } else {
    showNoWinningResult();
  }
}

function resetGame() {
  resetResult();
  resetInputs();
  resetNumbers();
}

function resetResult() {
  document.getElementById('result').innerHTML = '';
}

function resetInputs() {
  document.getElementById('number1').value = '';
  document.getElementById('number2').value = '';
  document.getElementById('number3').value = '';
}

function resetNumbers() {
  userNumbers = [];
  winningNumbers = [];
}

function showWinningResult(prize, amount) {
  var resultElement = document.getElementById('result');
  resultElement.innerHTML += '<br>恭喜您中' + prize + '! 獎金金額: ' + amount + '元';
}

function showNoWinningResult() {
  var resultElement = document.getElementById('result');
  resultElement.innerHTML += '<br>很遺憾，您沒有中獎。';
}

function showError(message) {
  var alertElement = document.createElement('div');
  alertElement.className = 'alert';
  alertElement.innerHTML = message;
  document.body.appendChild(alertElement);
  resetGame();
}

function resetAlert() {
  var alertElements = document.getElementsByClassName('alert');
  while (alertElements.length > 0) {
    alertElements[0].parentNode.removeChild(alertElements[0]);
  }
}