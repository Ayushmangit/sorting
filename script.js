let values = [];
let isSorting;

const container = document.getElementById("barContainer");
const info = document.querySelector(".info");

// todo SLIDER Component

const sliderElm = document.getElementById("myRange");
const speedValue = document.getElementById("speedValue");
let speed = +sliderElm.value;
speedValue.innerHTML = `${speed / 1000}sec`;

sliderElm.addEventListener("input", () => {
  speed = +sliderElm.value;
  speedValue.innerHTML = `${(speed / 1000).toFixed(1)}sec`;
});

//todo Array Creation
//will be using a local db to populate with an Array later on

function generateArray() {
  stopSorting();

  const arraySize = document.getElementById("arraySize").value;

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
  isSorting = false;

  createBars(); //Creating the Bars
  disableButtons(false);
}

//FUNCTION TO CREATE THE BARS

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
//Function to Disable the Buttons
function disableButtons(disable = true) {
  const buttons = document.querySelectorAll(
    "button:not(#generateArray):not(#reset)"
  );
  buttons.forEach((button) => {
    button.disabled = disable;
  });
}

//BUBBLE SORT LOGIC

async function bubbleSort() {
  info.innerHTML = `<ul> 
   <li>
  Comparisons are in <span style="color:Orange" >Orange</span>
  </li>
</ul>`;

  if (isSorting) return; // Prevent multiple sorts
  isSorting = true;
  disableButtons(true);

  let bars = document.querySelectorAll(".bar");
  for (let i = 0; i < values.length - 1; i++) {
    if (!isSorting) break; // Stop if sorting is canceled

    for (let j = 0; j < values.length - i - 1; j++) {
      if (!isSorting) break; // Stop if sorting is canceled

      //Setting the (comparing) Bars as Orange

      bars[j].style.backgroundColor = "orange";
      bars[j + 1].style.backgroundColor = "orange";

      // await is used to return a new Promise that will be slowing down the comparison process we use AWAIT inside of ASYNC Functions
      await new Promise((resolve) => setTimeout(resolve, speed));

      if (values[j] > values[j + 1]) {
        //using array destructuring to swap the values
        [values[j], values[j + 1]] = [values[j + 1], values[j]];

        // Swapping the bar height and color Visually not logically
        bars[j].style.height = `${values[j]}px`;
        bars[j + 1].style.height = `${values[j + 1]}px`;

        bars[j].querySelector(".bar-number").textContent = values[j];
        bars[j + 1].querySelector(".bar-number").textContent = values[j + 1];

        swapped = true;
      }
      //IF we do not enter the the if block resetting the bars color.
      bars[j].style.backgroundColor = "steelblue";
      bars[j + 1].style.backgroundColor = "steelblue";
    }
    // changing the correct position Bar to green
    bars[values.length - i - 1].style.backgroundColor = "green";
    bars[0].style.backgroundColor = "green";
  }

  isSorting = false; // Reset the flag
  disableButtons(false); // now  other buttons can be clicked
}

async function insertionSort() {
  info.innerHTML = `<ul>
    <li>
    Key is <span style="color:red;">red</span>
    </li>  
     <li>
    Iterator is <span style="color:Orange" >Orange</span>
    </li>
  </ul>`;

  if (isSorting) return; // Prevent multiple sorts
  isSorting = true;
  disableButtons(true);

  let bars = document.querySelectorAll(".bar");
  for (let i = 1; i < values.length; i++) {
    if (!isSorting) break; // Stop if sorting is canceled

    let key = values[i];
    let j = i - 1;
    bars[i].style.backgroundColor = "red";
    await new Promise((resolve) => setTimeout(resolve, `${speed}`));

    while (j >= 0 && values[j] > key) {
      if (!isSorting) break; // Stop if sorting is canceled

      bars[j].style.backgroundColor = "orange";
      values[j + 1] = values[j];

      bars[j + 1].style.height = `${values[j]}px`;
      bars[j + 1].querySelector(".bar-number").textContent = values[j];

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

const body = document.body;

async function selectionSort() {
  info.innerHTML = `<ul>
    <li>
    New minimun is <span style="color:red;">red</span>.
    </li>  
    <li>
    Minimun index is <span style="color:yellow"  >YELLOW</span>
    </li>
     <li>
    Iterator is <span style="color:Orange"  >Orange</span>
    </li>
  </ul>`;

  if (isSorting) return; // Prevent multiple sorts
  isSorting = true;
  disableButtons(true);

  let bars = document.querySelectorAll(".bar");
  for (let i = 0; i < values.length - 1; i++) {
    if (!isSorting) break; // Stop if sorting is canceled

    let minIndex = i;
    bars[minIndex].style.backgroundColor = "yellow";
    for (let j = i + 1; j < values.length; j++) {
      if (!isSorting) break; // Stop if sorting is canceled

      bars[j].style.backgroundColor = "orange";
      await new Promise((resolve) => setTimeout(resolve, `${speed}`));

      if (values[j] < values[minIndex]) {
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

async function quickSort(start = 0, end = values.length - 1) {
  if (!isSorting) return; // Stop if sorting is canceled
  if (start >= end) {
    if (start >= 0 && start < values.length)
      document.querySelectorAll(".bar")[start].style.backgroundColor = "green";
    return;
  }

  let index = await partition(start, end);
  await Promise.all([quickSort(start, index - 1), quickSort(index + 1, end)]);
}

async function partition(start, end) {
  let bars = document.querySelectorAll(".bar");
  let pivotValue = values[end];
  let pivotIndex = start;

  // Mark the pivot
  bars[end].style.backgroundColor = "red";

  for (let i = start; i < end; i++) {
    if (!isSorting) return;

    // Comparing current with pivot
    bars[i].style.backgroundColor = "orange";
    await new Promise((resolve) => setTimeout(resolve, speed));

    if (values[i] < pivotValue) {
      [values[i], values[pivotIndex]] = [values[pivotIndex], values[i]];

      bars[i].style.height = `${values[i]}px`;
      bars[pivotIndex].style.height = `${values[pivotIndex]}px`;

      bars[i].querySelector(".bar-number").textContent = values[i];
      bars[pivotIndex].querySelector(".bar-number").textContent =
        values[pivotIndex];

      pivotIndex++;
    }

    bars[i].style.backgroundColor = "steelblue";
  }

  // Swap pivot to correct place
  [values[pivotIndex], values[end]] = [values[end], values[pivotIndex]];

  bars[pivotIndex].style.height = `${values[pivotIndex]}px`;
  bars[end].style.height = `${values[end]}px`;

  bars[pivotIndex].querySelector(".bar-number").textContent =
    values[pivotIndex];
  bars[end].querySelector(".bar-number").textContent = values[end];

  bars[end].style.backgroundColor = "steelblue";
  bars[pivotIndex].style.backgroundColor = "green";

  return pivotIndex;
}

document.getElementById("quickSort").addEventListener("click", async () => {
  if (isSorting) return;
  isSorting = true;
  disableButtons(true);
  await quickSort();
  isSorting = false;
  disableButtons(false);
});

//HEAP SORT
async function heapSort() {
  if (isSorting) return; // Prevent multiple sorts
  isSorting = true;
  disableButtons(true);

  let n = values.length;
  let bars = document.querySelectorAll(".bar");

  info.innerHTML = "Building max heap...";

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i);
  }

  info.innerHTML = "Extracting elements and re-heapifying...";

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    if (!isSorting) break;

    info.innerHTML = `Swapping root (${values[0]}) with end element (${values[i]})`;

    [values[0], values[i]] = [values[i], values[0]];
    bars[0].style.height = `${values[0]}px`;
    bars[i].style.height = `${values[i]}px`;
    bars[0].querySelector(".bar-number").textContent = values[0];
    bars[i].querySelector(".bar-number").textContent = values[i];

    bars[i].style.backgroundColor = "green";

    await heapify(i, 0);
  }

  if (isSorting) {
    bars[0].style.backgroundColor = "green";
    info.innerHTML = "Array sorted successfully!";
  }

  isSorting = false;
  disableButtons(false);
}

async function heapify(n, i) {
  let bars = document.querySelectorAll(".bar");
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n) {
    bars[left].style.backgroundColor = "orange";
    info.innerHTML = `Comparing parent ${values[i]} with left child ${values[left]}`;
    await new Promise((resolve) => setTimeout(resolve, speed));
    if (values[left] > values[largest]) largest = left;
    bars[left].style.backgroundColor = "steelblue";
  }

  if (right < n) {
    bars[right].style.backgroundColor = "orange";
    info.innerHTML = `Comparing parent ${values[i]} with right child ${values[right]}`;
    await new Promise((resolve) => setTimeout(resolve, speed));
    if (values[right] > values[largest]) largest = right;
    bars[right].style.backgroundColor = "steelblue";
  }

  if (largest !== i) {
    info.innerHTML = `Swapping ${values[i]} with ${values[largest]}`;
    [values[i], values[largest]] = [values[largest], values[i]];
    bars[i].style.height = `${values[i]}px`;
    bars[largest].style.height = `${values[largest]}px`;
    bars[i].querySelector(".bar-number").textContent = values[i];
    bars[largest].querySelector(".bar-number").textContent = values[largest];

    await heapify(n, largest);
  } else {
    info.innerHTML = `No swap needed for ${values[i]}`;
  }
}

document.getElementById("heapSort").addEventListener("click", () => {
  heapSort();
});

function resetArray() {
  generateArray();
  info.innerHTML = "";
}

generateArray();

function stopSorting() {
  isSorting = false;
}
