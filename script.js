// Show welcome message with animation
window.onload = function () {
  setTimeout(() => {
    const welcome = document.getElementById("welcome-box");
    if (welcome) {
      welcome.style.display = "none";
    }
  }, 4000);
};

let lastAns = "";

function appendValue(val) {
  const display = document.getElementById("display");
  if (val === "Ans") {
    display.value += lastAns;
  } else {
    display.value += val;
  }
}

function clearDisplay() {
  document.getElementById("display").value = "";
  document.getElementById("history").innerText = "";
}

function deleteChar() {
  const display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}

function calculate() {
  let input = document.getElementById("display").value;

  try {
    document.getElementById("history").innerText = input;

    // Replace math constants
    input = input.replace(/π/g, "Math.PI");
    input = input.replace(/e/g, "Math.E");

    // Trigonometric functions (convert degrees to radians)
    input = input.replace(/sin\(([^)]+)\)/g, (_, val) => `Math.sin((${val} * Math.PI / 180))`);
    input = input.replace(/cos\(([^)]+)\)/g, (_, val) => `Math.cos((${val} * Math.PI / 180))`);
    input = input.replace(/tan\(([^)]+)\)/g, (_, val) => `Math.tan((${val} * Math.PI / 180))`);

    // Log, ln, sqrt
    input = input.replace(/log\(/g, "Math.log10(");
    input = input.replace(/ln\(/g, "Math.log(");
    input = input.replace(/√\(/g, "Math.sqrt(");
    input = input.replace(/\^/g, "**");

    // Evaluate
    let result = eval(input);
    result = Math.round(result * 1e10) / 1e10;

    document.getElementById("display").value = result;
    lastAns = result;
  } catch (e) {
    document.getElementById("display").value = "Error";
  }
}
