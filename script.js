let values = [];
let isPaused = false;
const complexityELM = document.getElementById("complexityInfo");
const container = document.getElementById("barContainer");

function generateArray() {
  isPaused = false; 

  const arraySize = +document.getElementById("arraySize").value;
  if (arraySize > 30 || arraySize < 5) {
    alert("Array size should be between 5 and 30");
    document.getElementById("arraySize").value = 30; 
    return;
  }

  values = Array.from(
    { length: arraySize }, 
    () => Math.floor(Math.random() * 250) + 10
  );

  container.innerHTML = ""; 
  complexityELM.innerHTML = ""; 
  complexityELM.style.display = "none"; 
  createBars();
  disableButtons(false);
}

function createBars() {
  container.innerHTML = "";
  values.forEach((value) => {
    const bar = document.createElement("div");
    bar.style.height = `${value}px`;
    bar.classList.add("bar");

    // Create a span element for the number
    const number = document.createElement("span");
    number.textContent = value;
    number.classList.add("bar-number");

    bar.appendChild(number);
    container.appendChild(bar);
  });
}

function disableButtons(disable = true) {
  const buttons = document.querySelectorAll(
    "button:not(#generateArray):not(#reset)"
  );
  buttons.forEach((button) => {
    button.disabled = disable;
  });
}

function togglePause() {
  isPaused = !isPaused;
}

async function waitWhilePaused() {
  while (isPaused) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

function showComplexity(algorithm) {
  const complexityText = {
    bubble:
      "<strong>Bubble Sort:</strong> Best: O(n), Average: O(n²), Worst: O(n²), Space: O(1)",
    insertion:
      "<strong>Insertion Sort:</strong> Best: O(n), Average: O(n²), Worst: O(n²), Space: O(1)",
    selection:
      "<strong>Selection Sort:</strong> Best: O(n²), Average: O(n²), Worst: O(n²), Space: O(1)",
  };
  complexityELM.innerHTML = complexityText[algorithm];
  complexityELM.style.display = "block";
}

async function bubbleSort() {
  disableButtons(true);
  showComplexity("bubble");

  let bars = document.querySelectorAll(".bar");
  for (let i = 0; i < values.length - 1; i++) {
    for (let j = 0; j < values.length - i - 1; j++) {
      await waitWhilePaused();
      bars[j].style.backgroundColor = "orange";
      bars[j + 1].style.backgroundColor = "orange";

      await new Promise((resolve) => setTimeout(resolve, 50));

      if (values[j] > values[j + 1]) {
        await waitWhilePaused();
        bars[j].style.backgroundColor = "red";
        bars[j + 1].style.backgroundColor = "red";

        // Swap values
        [values[j], values[j + 1]] = [values[j + 1], values[j]];

        // Update heights
        bars[j].style.height = `${values[j]}px`;
        bars[j + 1].style.height = `${values[j + 1]}px`;

        // Update numbers inside bars
        bars[j].querySelector(".bar-number").textContent = values[j];
        bars[j + 1].querySelector(".bar-number").textContent = values[j + 1];
      }

      bars[j].style.backgroundColor = "steelblue";
      bars[j + 1].style.backgroundColor = "steelblue";
    }
    bars[values.length - i - 1].style.backgroundColor = "green";
  }
  disableButtons(false);
}

async function insertionSort() {
  disableButtons(true);
  showComplexity("insertion");

  let bars = document.querySelectorAll(".bar");
  for (let i = 1; i < values.length; i++) {
    let key = values[i];
    let j = i - 1;
    bars[i].style.backgroundColor = "orange";
    await new Promise((resolve) => setTimeout(resolve, 50));

    while (j >= 0 && values[j] > key) {
      await waitWhilePaused();
      bars[j].style.backgroundColor = "red";
      values[j + 1] = values[j];

      bars[j + 1].style.height = `${values[j]}px`;
      bars[j + 1].querySelector(".bar-number").textContent = values[j];

      await new Promise((resolve) => setTimeout(resolve, 50));
      bars[j].style.backgroundColor = "steelblue";
      j--;
    }
    values[j + 1] = key;
    bars[j + 1].style.height = `${key}px`;
    bars[j + 1].querySelector(".bar-number").textContent = key;

    for (let k = 0; k <= i; k++) {
      bars[k].style.backgroundColor = "green";
    }
  }
  disableButtons(false);
}

async function selectionSort() {
  disableButtons(true);
  showComplexity("selection");

  let bars = document.querySelectorAll(".bar");
  for (let i = 0; i < values.length - 1; i++) {
    let minIndex = i;
    bars[minIndex].style.backgroundColor = "black";
    for (let j = i + 1; j < values.length; j++) {
      await waitWhilePaused();
      bars[j].style.backgroundColor = "orange";
      await new Promise((resolve) => setTimeout(resolve, 50));
      if (values[j] < values[minIndex]) {
        await waitWhilePaused();
        if (minIndex !== i) bars[minIndex].style.backgroundColor = "steelblue";
        minIndex = j;
        bars[minIndex].style.backgroundColor = "red";
      } else {
        bars[j].style.backgroundColor = "steelblue";
      }
    }
    if (minIndex !== i) {
      bars[minIndex].style.backgroundColor = "steelblue";
      [values[i], values[minIndex]] = [values[minIndex], values[i]];
      bars[i].style.height = `${values[i]}px`;
      bars[minIndex].style.height = `${values[minIndex]}px`;

      // Update numbers inside bars
      bars[i].querySelector(".bar-number").textContent = values[i];
      bars[minIndex].querySelector(".bar-number").textContent = values[minIndex];
    }
    bars[i].style.backgroundColor = "green";
  }
  disableButtons(false);
}

function resetArray() {
  isPaused = false;
  generateArray();
}

generateArray();