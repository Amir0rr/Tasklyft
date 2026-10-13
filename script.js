const openCloseBtn = document.querySelectorAll(".open-close-popup");
const answer = document.querySelectorAll(".faq-answer");
const icon = document.querySelectorAll(".icon");
const signInBtn = document.querySelectorAll(".open-signup");
const signInModal = document.querySelector("#signupOverlay");
const modalClose = document.querySelector("#modalClose");
const modalName = document.querySelector("#modal-name");
const modalEmail = document.querySelector("#modal-email");
const modalPassword = document.querySelector("#modal-password");
const formEL = document.querySelector(".signup-form");
let allValid = true;
let percentEL = document.querySelector(".process-percent");
let percentNumber = 0;
let timerPercent;

//FAQ
openCloseBtn.forEach((btn, index) => {
  btn.addEventListener("click", (event) => {
    answer[index].classList.toggle("faq-answer-show");

    if (answer[index].classList.contains("faq-answer-show")) {
      icon[index].textContent = "-";
    } else {
      icon[index].textContent = "+";
    }
  });
});

//Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});

//signIn Modal
signInBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    signInModal.classList.add("active");
  });
});

modalClose.addEventListener("click", (event) => {
  signInModal.classList.remove("active");
});

signInModal.addEventListener("click", (event) => {
  if (event.target === signInModal) {
    signInModal.classList.remove("active");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    signInModal.classList.remove("active");
  }
});

function validateField(input, isValid) {
  input.classList.add(isValid ? "valid" : "invalid");
  setTimeout(() => {
    input.classList.remove(isValid ? "valid" : "invalid");
  }, 900);
}

formEL.addEventListener("submit", (event) => {
  event.preventDefault();

  const isNameValid = modalName.value.length >= 5;
  const isEmailValid =
    modalEmail.value.includes("@") && modalEmail.value.length >= 10;
  const isPasswordValid = modalPassword.value.length >= 8;

  let errorMessage = "";
  if (!isNameValid) errorMessage += "نام باید حداقل ۵ کاراکتر باشد.\n";
  if (!isEmailValid) errorMessage += "ایمیل معتبر نیست.\n";
  if (!isPasswordValid) errorMessage += "رمز عبور باید حداقل ۸ کاراکتر باشد.\n";

  allValid = isNameValid && isEmailValid && isPasswordValid;

  if (allValid) {
    alert("ثبت نام شما با موفقیت انجام شد!");
    signInModal.classList.remove("active");
    formEL.reset();
  } else {
    alert(errorMessage);
    validateField(modalName, isNameValid);
    validateField(modalEmail, isEmailValid);
    validateField(modalPassword, isPasswordValid);
  }
});

//process percent

const timerhandler = () => {
  percentNumber += 1;
  percentEL.textContent = percentNumber + "%";

  if (percentNumber === 75) {
    clearInterval(timerPercent);
  }
};

let timerFunction = () => {
  timerPercent = setInterval(timerhandler, 20);
};

setTimeout(timerFunction, 500);
