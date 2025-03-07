let values = [];
let isPaused = false;
const complexityELM = document.getElementById("complexityInfo"); // Ensure this matches the HTML ID
const container = document.getElementById("barContainer");

function generateArray() {
  isPaused = false; // Ensure sorting is not paused when generating a new array

  const arraySize = +document.getElementById("arraySize").value; // Read arraySize dynamically
  if (arraySize > 30 || arraySize < 5) {
    alert("Array size should be between 5 and 30");
    document.getElementById("arraySize").value = 30; // Reset the value to 30
    return;
  }

  values = Array.from(
    { length: arraySize }, 
    () => Math.floor(Math.random() * 250) + 10
  );

  container.innerHTML = ""; // Clear existing bars
  complexityELM.innerHTML = ""; // Clear complexity details
  complexityELM.style.display = "none"; // Hide complexity details
  createBars();
  disableButtons(false);
}

function createBars() {
  container.innerHTML = "";
  values.forEach((value) => {
    const bar = document.createElement("div");
    bar.style.height = `${value}px`;
    bar.classList.add("bar");
    container.appendChild(bar);
    bar.innerHTML = `${value}`;
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
  complexityELM.style.display = "block"; // Show complexity details
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
        [values[j], values[j + 1]] = [values[j + 1], values[j]];
        bars[j].style.height = `${values[j]}px`;
        bars[j + 1].style.height = `${values[j + 1]}px`;
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
      await new Promise((resolve) => setTimeout(resolve, 50));
      bars[j].style.backgroundColor = "steelblue";
      j--;
    }
    values[j + 1] = key;
    bars[j + 1].style.height = `${key}px`;

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
        if (minIndex !== i) bars[minIndex].style.backgroundColor = "steelblue"; // Reset previous min
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
    }
    bars[i].style.backgroundColor = "green";
  }
  disableButtons(false);
}

function resetArray() {
  isPaused = false; // Ensure sorting is not paused after reset
  generateArray(); // Reset array and complexity details
}

generateArray();
