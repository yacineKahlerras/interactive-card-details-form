/**   Fill in the form and see the card details update in real-time
    - Receive error messages when the form is submitted if:
        - Any input field is empty
        - The card number, expiry date, or CVC fields are in the wrong format
    - View the optimal layout depending on their device's screen size
    - See hover, active, and focus states for interactive elements on the page
 */
const button = document.querySelector(".button");
let inputFields = [...document.getElementsByTagName("input")];
const allErrorElements = [...document.querySelectorAll(".error")];
let errorFlag = false;

/**checks the format of fields then submits them */
const submitInfo = () => {
  resetErrorFlags();
  checkFormat();
  checkIfEmpty();
  if (errorFlag) return;
};

/** checks if any of the fields are emptyand throxs an error glag */
const checkIfEmpty = () => {
  inputFields.forEach((input) => {
    if (input.value.length == 0) {
      if (input.id == "month" || input.id == "year")
        input = input.parentElement;
      const errorElement = input.parentElement.lastElementChild;
      errorElement.textContent = "Can't be blank";
      errorElement.classList.add("show");
      errorFlag = true;
    }
  });
};

/** resets all error flags */
const resetErrorFlags = () => {
  errorFlag = false;
  allErrorElements.forEach((element) => {
    element.classList.remove("show");
  });
};

/** checks fields if they have numbers only */
const checkFormat = () => {
  for (let index = 1; index < inputFields.length; index++) {
    let input = inputFields[index];
    let isNum = /^\d+$/.test(input.value);
    if (!isNum) {
      if (input.id == "month" || input.id == "year")
        input = input.parentElement;
      const errorElement = input.parentElement.lastElementChild;
      errorElement.textContent = "Wrong format, numbers only";
      errorElement.classList.add("show");
      errorFlag = true;
    }
  }
};

button.addEventListener("click", submitInfo);
