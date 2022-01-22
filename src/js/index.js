const buttons = {
  ac: { node: document.querySelector(".ac") },
  plusMinus: { node: document.querySelector(".plus-minus") },
  percent: { node: document.querySelector(".percent"), operation: "%" },
  division: { node: document.querySelector(".division"), operation: "/" },
  seven: { node: document.querySelector(".seven"), operation: 7 },
  eight: { node: document.querySelector(".eight"), operation: 8 },
  nine: { node: document.querySelector(".nine"), operation: 9 },
  multiply: { node: document.querySelector(".multiply"), operation: "*" },
  five: { node: document.querySelector(".five"), operation: 5 },
  six: { node: document.querySelector(".six"), operation: 6 },
  minus: { node: document.querySelector(".minus"), operation: "-" },
  one: { node: document.querySelector(".one"), operation: 1 },
  two: { node: document.querySelector(".two"), operation: 2 },
  three: { node: document.querySelector(".three"), operation: 3 },
  four: { node: document.querySelector(".four"), operation: 4 },
  plus: { node: document.querySelector(".plus"), operation: "+" },
  zero: { node: document.querySelector(".zero"), operation: 0 },
  dot: { node: document.querySelector(".dot"), operation: "." },
  equal: { node: document.querySelector(".equal") },
};
const screen = document.querySelector(".screen > p");
for (let btnName in buttons) {
  console.log(btnName);
  buttons[btnName].node.addEventListener("click", (event) => {
    if ("operation" in buttons[btnName]) {
      render(buttons[btnName].operation);
    } else if (btnName === "equal") {
      enter();
    } else if (btnName === "ac") {
      clear();
    } else if (btnName === "plusMinus") {
      plusMinus();
    }
  });
}

/**
 * Вычисляет результат и выводит на дисплей.
 */
function enter() {
  let percentFind = screen.textContent.match(/([0-9|\.]+%[0-9|\.]+)/g);
  if (percentFind) {
    for (let index = 0; index < percentFind.length; index++) {
      let numArr = percentFind[index].split("%");
      let percent = (numArr[0] * numArr[1]) / 100;
      screen.textContent = screen.textContent.replace(
        percentFind[index],
        percent
      );
    }
  }
  screen.textContent = eval(screen.textContent);
}

/**
 * Обновляет информацию на экране
 * @param {number} result - число для вывода на экран
 * @returns true
 */
function render(result) {
  if (result === "." && screen.textContent.match(/\./)) {
    return true;
  }
  if (screen.textContent[0] === "0") {
    screen.textContent = result;
  } else {
    screen.textContent += result;
  }
  return true;
}

/**
 * Очищает калькулятор
 * @returns true
 */
function clear() {
  screen.textContent = 0;
  return true;
}

/**
 * Выполняет функцию превращения числа в противоположное
 */
function plusMinus() {
  let str = screen.textContent;
  let found = false;
  for (let index = str.length - 1; index >= 0; index--) {
    let symbol = str[index];
    if (
      symbol === "-" ||
      symbol === "+" ||
      symbol === "/" ||
      symbol === "*" ||
      symbol === "%"
    ) {
      found = true;
      if (symbol === "-") {
        if (index === 0) {
          str = str.substring(1);
        } else {
          str = str.replaceAt(index, "+");
        }
        screen.textContent = str;
      } else {
        screen.textContent =
          str.substring(0, index) + "-" + str.substring(index + 1);
      }
    }
  }
  if (!found) {
    screen.textContent = "-" + screen.textContent;
  }
}

String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substring(0, index) +
    replacement +
    this.substring(index + replacement.length)
  );
};
