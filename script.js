const display = document.getElementById("display");
const historyText = document.getElementById("history");

function appendValue(value) {
  if (display.value === "Error") {
    display.value = "";
  }

  const lastChar = display.value.slice(-1);
  const operators = ["+", "-", "*", "/", "%"];

  if (operators.includes(value) && operators.includes(lastChar)) {
    display.value = display.value.slice(0, -1) + value;
    return;
  }

  display.value += value;
}

function clearDisplay() {
  display.value = "";
  historyText.innerText = "";
}

function deleteLast() {
  if (display.value === "Error") {
    display.value = "";
    return;
  }

  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  try {
    if (display.value.trim() === "") {
      return;
    }

    const expression = display.value;
    const result = Function("return " + expression)();

    if (!isFinite(result)) {
      display.value = "Error";
      historyText.innerText = "";
      return;
    }

    historyText.innerText = expression + " =";
    display.value = result;
  } catch (error) {
    display.value = "Error";
    historyText.innerText = "";
  }
}

// Keyboard support
document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (
    (key >= "0" && key <= "9") ||
    key === "+" ||
    key === "-" ||
    key === "*" ||
    key === "/" ||
    key === "." ||
    key === "%"
  ) {
    appendValue(key);
  }

  if (key === "Enter") {
    calculateResult();
  }

  if (key === "Backspace") {
    deleteLast();
  }

  if (key === "Escape") {
    clearDisplay();
  }
});