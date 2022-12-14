/**   Fill in the form and see the card details update in real-time
    - Receive error messages when the form is submitted if:
        - Any input field is empty
        - The card number, expiry date, or CVC fields are in the wrong format
    - View the optimal layout depending on their device's screen size
    - See hover, active, and focus states for interactive elements on the page
 */
const button = document.querySelector(".confirm-btn");
const completedButton = document.querySelector(".completed-button");
let inputFields = [...document.getElementsByTagName("input")];
const allErrorElements = [...document.querySelectorAll(".error")];
const cardName = document.querySelector(".front-card-name");
const cardNumber = document.querySelector(".front-card-number");
const cardMonth = document.querySelector(".front-card-month");
const cardYear = document.querySelector(".front-card-year");
const cardCvc = document.querySelector(".back-card-cvc");
const forms = document.querySelector(".forms");
const completed = document.querySelector(".completed");
let errorFlag = false;

/**checks the format of fields then submits them */
const submitInfo = () => {
  resetErrorFlags();
  checkNumbersOnly();
  nameCheck();
  checkEmpty();
  if (errorFlag) return;
  completedCorrectInfo();
};

/** checks if any of the fields are emptyand throxs an error glag */
const checkEmpty = () => {
  inputFields.forEach((input) => {
    if (input.value.length == 0) {
      showError(input, "Can't be blank");
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
  inputFields.forEach((input) => {
    input.classList.remove("input-error");
  });
};

/** checks the name if it has 2 words and doesn't contain numbers */
const nameCheck = () => {
  const hasLettersOnly = /^[a-zA-Z ]+$/.test(inputFields[0].value);
  if (!hasLettersOnly) {
    showError(inputFields[0], "must only contain letters");
    errorFlag = true;
    return;
  }
  const has2WordsMinimum = /^((\b[a-zA-Z]{1,}\b)\s*){2,}$/.test(
    inputFields[0].value
  );
  if (!has2WordsMinimum) {
    showError(inputFields[0], "must contain first and last name");
    errorFlag = true;
  }
};

/** checks fields if they have numbers only */
const checkNumbersOnly = () => {
  for (let index = 1; index < inputFields.length; index++) {
    let input = inputFields[index];
    let isNum = /^[\d ]*$/.test(input.value);
    if (!isNum) {
      showError(input, "Wrong format, numbers only");
      errorFlag = true;
    }
  }
};

/** shows error message */
const showError = (input, errorMessage) => {
  input.classList.add("input-error");
  if (input.id == "month" || input.id == "year") input = input.parentElement;
  const errorElement = input.parentElement.lastElementChild;
  errorElement.textContent = errorMessage;
  errorElement.classList.add("show");
  errorFlag = true;
};

/** handles the format of the value of the fields */
const formatInputHandler = (input, e) => {
  // card name
  if (input.id == "name") {
    if (e.inputType == "deleteContentBackward") {
      if (input.value.length == 0) cardName.textContent = "FELICIA LEIRE";
      return;
    }
    cardName.textContent = input.value;
  }

  // card number
  if (input.id == "cardnumber") {
    if (e.inputType == "deleteContentBackward") {
      if (input.value.length == 0)
        cardNumber.textContent = "9591 6489 6389 101E";
      return;
    }
    if (
      input.value.length == 4 ||
      input.value.length == 9 ||
      input.value.length == 14
    ) {
      input.value += " ";
    }
    cardNumber.textContent = input.value;
    if (input.value.length == 19) document.getElementById("month").focus();
  }

  // month
  if (input.id == "month") {
    if (e.inputType == "deleteContentBackward") {
      if (input.value.length == 0) cardMonth.textContent = "09";
      return;
    }
    let isFormated = /^(0[1-9])$|^(1[0-2]?)$|^(\d{1})$/.test(input.value);
    if (isFormated) {
      let value = input.value;
      if (value.length == 1) value = `0${value}`;
      cardMonth.textContent = value;
    } else input.value = "";
    if (input.value.length == 2) document.getElementById("year").focus();
  }

  // year
  if (input.id == "year") {
    if (e.inputType == "deleteContentBackward") {
      if (input.value.length == 0) cardYear.textContent = "00";
      return;
    }
    let value = input.value;
    if (value.length == 1) value = `0${value}`;
    cardYear.textContent = value;
    if (input.value.length == 2) document.getElementById("cvc").focus();
  }

  // cvc
  if (input.id == "cvc") {
    if (e.inputType == "deleteContentBackward") {
      if (input.value.length == 0) cardCvc.textContent = "000";
      return;
    }
    cardCvc.textContent = input.value;
  }
};

/** when everything is in order then say thank you */
const completedCorrectInfo = () => {
  forms.classList.add("hide");
  completed.classList.add("show");
};

/** reset everything like it was in start */
const resetEverything = () => {
  forms.classList.remove("hide");
  completed.classList.remove("show");
  inputFields.forEach((input) => {
    input.value = "";
  });
};

button.addEventListener("click", submitInfo);
completedButton.addEventListener("click", resetEverything);
inputFields.forEach((input) => {
  input.addEventListener("input", (e) => formatInputHandler(input, e));
});
