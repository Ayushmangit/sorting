let values = [];
const complexityELM = document.getElementById("complexityInfo");
const container = document.getElementById("barContainer");
let isSorting;
function generateArray() {
  complexityELM.style.display = "none";
  stopSorting();
  resetComparisonsAndSwaps();
  const arraySize = +document.getElementById("arraySize").value;
  if (arraySize > 30 || arraySize < 5) {
    alert("Array size should be between 5 and 30");
    document.getElementById("arraySize").value = 30;
    return;
  }

  values = Array.from(
    { length: arraySize },
    () => Math.floor(Math.random() * 250) + 1
  );

  container.innerHTML = "";
  complexityELM.innerHTML = "";

  // Reset comparisons and swaps
  comparisons = 0;
  swaps = 0;
  compELM.innerHTML = `Comparisons: ${comparisons}, Swaps: ${swaps}`;

  isSorting = false;

  createBars();
  disableButtons(false);
}

let sliderElm = document.getElementById("myRange");
let outputElm = document.getElementById("speedValue");

let speed = +sliderElm.value;
outputElm.innerHTML = `${speed}ms`;

sliderElm.addEventListener("input", () => {
  speed = +sliderElm.value;
  outputElm.innerHTML = `${speed}ms`;
});

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

const compELM = document.getElementById("comparisonsAndSwaps");

function resetComparisonsAndSwaps() {
  comparisons = 0;
  swaps = 0;
  compELM.innerHTML = `Comparisons: ${comparisons}, Swaps: ${swaps}`;
}

function showComplexity(algorithm, comparisons, swaps) {
  const complexityText = {
    bubble: `<strong>Bubble Sort:</strong> Best: O(n), Average: O(n²), Worst: O(n²), Space: O(1) ${comparisons} ${swaps}`,
    insertion: `<strong>Insertion Sort:</strong> Best: O(n), Average: O(n²), Worst: O(n²), Space: O(1) ${comparisons} ${swaps}`,
    selection: `<strong>Selection Sort:</strong> Best: O(n²), Average: O(n²), Worst: O(n²), Space: O(1) ${comparisons} ${swaps}`,
  };
  complexityELM.innerHTML = complexityText[algorithm];
  complexityELM.style.display = "block";
}

async function bubbleSort() {
  resetComparisonsAndSwaps();
  if (isSorting) return; // Prevent multiple sorts
  isSorting = true;
  disableButtons(true);
  compELM.innerHTML = `Comparisons: ${comparisons}, Swaps: ${swaps}`;

  let bars = document.querySelectorAll(".bar");
  for (let i = 0; i < values.length - 1; i++) {
    if (!isSorting) break; // Stop if sorting is canceled

    for (let j = 0; j < values.length - i - 1; j++) {
      if (!isSorting) break; // Stop if sorting is canceled

      bars[j].style.backgroundColor = "orange";
      bars[j + 1].style.backgroundColor = "orange";

      await new Promise((resolve) => setTimeout(resolve, `${speed}`));
      comparisons++;

      if (values[j] > values[j + 1]) {
        [values[j], values[j + 1]] = [values[j + 1], values[j]];
        swaps++;

        bars[j].style.height = `${values[j]}px`;
        bars[j + 1].style.height = `${values[j + 1]}px`;

        bars[j].querySelector(".bar-number").textContent = values[j];
        bars[j + 1].querySelector(".bar-number").textContent = values[j + 1];
      }

      bars[j].style.backgroundColor = "steelblue";
      bars[j + 1].style.backgroundColor = "steelblue";
    }

    bars[values.length - i - 1].style.backgroundColor = "green";
    bars[0].style.backgroundColor = "green";
    showComplexity("bubble", comparisons, swaps);
  }

  isSorting = false; // Reset the flag
  disableButtons(false);
}

async function insertionSort() {
  resetComparisonsAndSwaps();
  if (isSorting) return; // Prevent multiple sorts
  isSorting = true;
  disableButtons(true);

  let bars = document.querySelectorAll(".bar");
  for (let i = 1; i < values.length; i++) {
    if (!isSorting) break; // Stop if sorting is canceled

    let key = values[i];
    let j = i - 1;
    bars[i].style.backgroundColor = "orange";
    await new Promise((resolve) => setTimeout(resolve, `${speed}`));

      comparisons++;
      while (j >= 0 && values[j] > key) {
      if (!isSorting) break; // Stop if sorting is canceled
      bars[j].style.backgroundColor = "red";
      values[j + 1] = values[j];
      swaps++;
      bars[j + 1].style.height = `${values[j]}px`;
      bars[j + 1].querySelector(".bar-number").textContent = values[j];

  showComplexity("insertion", comparisons, swaps);
      await new Promise((resolve) => setTimeout(resolve, `${speed}`));
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

  isSorting = false; // Reset the flag
  disableButtons(false);
}

async function selectionSort() {
  resetComparisonsAndSwaps();
  if (isSorting) return; // Prevent multiple sorts
  isSorting = true;
  disableButtons(true);

  let bars = document.querySelectorAll(".bar");
  for (let i = 0; i < values.length - 1; i++) {
    if (!isSorting) break; // Stop if sorting is canceled

    let minIndex = i;
    bars[minIndex].style.backgroundColor = "black";
    for (let j = i + 1; j < values.length; j++) {
      if (!isSorting) break; // Stop if sorting is canceled
  showComplexity("selection", comparisons, swaps);

      bars[j].style.backgroundColor = "orange";
      await new Promise((resolve) => setTimeout(resolve, `${speed}`));

      if (values[j] < values[minIndex]) {
        comparisons++;
        if (minIndex !== i) bars[minIndex].style.backgroundColor = "steelblue";
        minIndex = j;
        bars[minIndex].style.backgroundColor = "red";
      } else {
        bars[j].style.backgroundColor = "steelblue";
      }
    }

    if (minIndex !== i) {
      swaps++;
      bars[minIndex].style.backgroundColor = "steelblue";
      [values[i], values[minIndex]] = [values[minIndex], values[i]];
      bars[i].style.height = `${values[i]}px`;
      bars[minIndex].style.height = `${values[minIndex]}px`;

      bars[i].querySelector(".bar-number").textContent = values[i];
      bars[minIndex].querySelector(".bar-number").textContent =
        values[minIndex];
    }

    bars[i].style.backgroundColor = "green";
  }

  bars[values.length - 1].style.backgroundColor = "green";
  isSorting = false; // Reset the flag
  disableButtons(false);
}
function resetArray() {
  generateArray();
   complexityELM.style.display = "none";
    comparison = 0;
  swap = 0;
}

generateArray();

function stopSorting() {
  isSorting = false;
}
