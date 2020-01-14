//ошибки
const errors = {
  ru: {
    emptyInput: "Это обязательное поле",
    outOfRange: "Должно быть от 2 до 30 символов",
    invalidLink: "Здесь должна быть почта",
    correctInput: ""
  }
};

//форма оплаты
class PaymentForm {
  constructor(form, validation) {
    this.validation = validation;
    this.form = form;
    this.paymentSum = this.form.querySelectorAll(".payment__sum");
    this.paymentInput = this.form.querySelector(".payment__input-any-sum");
    this.rubleSign = this.form.querySelector(".payment__label-any-sum");
    this.name = this.form.querySelector(".payment__name");
    this.email = this.form.querySelector(".payment__email");
  }

  clearDefaultSum(event) {
    if (
      event.target.classList.contains("payment__input-any-sum") &&
      event.target.value.length > 0
    ) {
      this.paymentSum.forEach(sum => {
        sum.checked = false;
      });

      this.paymentInput.style.border = "none";
      this.paymentInput.style.font = "normal bold 18px arial, helvetica";
      this.rubleSign.style.color = "#FC691B";
      event.target.parentElement.style.border = "2px solid #FC691B";
    }
  }

  clearInputSum(event) {
    if (
      event.target.classList.contains("payment__input-any-sum") &&
      event.target.value.length === 0
    ) {
      this.paymentInput.style.borderBottom = "1px solid #9397cb";
      this.paymentInput.style.font = "normal normal 14px helvetica";
    }
  }

  setDefaultInput(event) {
    if (
      event.target.classList.contains("payment__input-any-sum") &&
      event.target.value.length === 0
    ) {
      this.paymentInput.parentElement.style.border = "2px solid #9397CB";
      this.rubleSign.style.color = "#9397CB";
    }
  }

  activateNameOrEmailInput(event) {
    if (
      event.target.classList.contains("payment__name") ||
      event.target.classList.contains("payment__email")
    ) {
      event.target.style.border = "2px solid #FC691B";
    }
  }

  setDefaultNameOrEmailInput(event) {
    if (
      (event.target.classList.contains("payment__name") &&
        event.target.value.length === 0) ||
      (event.target.classList.contains("payment__email") &&
        event.target.value.length === 0)
    ) {
      event.target.style.border = "2px solid #9397CB";
    }
  }
}

//валидация
//Класс для валидации
class Validation {
  constructor(errors) {
    this.errors = errors;
  }

  validate(event) {
    const [
      input0,
      input1,
      input2,
      input3,
      input4,
      input5,
      input6,
      input7,
      input8
    ] = event.currentTarget.elements;
    console.log(event.currentTarget.elements);

    if (!input7.validity.valid || !input8.validity.valid) {
      this.checkEmptyInput(event, input7, input8);
      this.checkRange(event, input7, input8);
      this.checkCorrectInput(event, input7, input8);
      this.checkLink(event, input7, input8);
      this.disableButton(event);
    } else {
      this.removeErrors(event);
      this.activateButton(event);
    }
  }

  //Проверка на пустое поле ввода
  checkEmptyInput(event, ...inputs) {
    if (event.target.value.length === 0) {
      inputs.forEach(input => {
        if (event.target.name === input.name) {
          document.querySelector(
            `#${input.name}`
          ).textContent = this.errors.emptyInput;
        }
      });
    }
  }

  //Проверка диапазона поля ввода
  checkRange(event, ...inputs) {
    if (event.target.value.length === 1 || event.target.value.length > 30) {
      inputs.forEach(input => {
        if (event.target.name === input.name) {
          document.querySelector(
            `#${input.name}`
          ).textContent = this.errors.outOfRange;
        }
      });
    }
  }

  //Проверка корректного значения в поле ввода
  checkCorrectInput(event, ...inputs) {
    if (event.target.validity.valid) {
      inputs.forEach(input => {
        if (event.target.name === input.name) {
          document.querySelector(
            `#${input.name}`
          ).textContent = this.errors.correctInput;
        }
      });
    }
  }

  //Проверка ссылки
  checkLink(event, ...inputs) {
    if (!event.target.validity.valid && event.target.value.length === 0) {
      inputs.forEach(input => {
        if (event.target.name === input.name) {
          document.querySelector(
            `#${input.name}`
          ).textContent = this.errors.emptyInput;
        }
      });
    } else if (
      !event.target.validity.valid &&
      (event.target.name === "email" || event.target.name === "avatar")
    ) {
      inputs.forEach(input => {
        if (event.target.name === input.name) {
          document.querySelector(
            `#${input.name}`
          ).textContent = this.errors.invalidLink;
        }
      });
    }
  }

  //Удаление ошибок
  removeErrors(event) {
    event.currentTarget.querySelectorAll(".error").forEach(error => {
      error.textContent = "";
    });
  }

  //Отключение кнопки формы
  disableButton() {
    const buttons = document.querySelectorAll(".button-pay");
    console.log(buttons);
    buttons.forEach(button => {
      button.setAttribute("disabled", true);
      button.classList.add("button-pay_disabled");
      button.classList.remove("button-pay_active");
    });
  }

  //Включение кнопки формы
  activateButton() {
    const buttons = document.querySelectorAll(".button-pay");
    buttons.forEach(button => {
      button.removeAttribute("disabled");
      button.classList.remove("button-pay_disabled");
      button.classList.add("button-pay_active");
    });
  }
}

const validation = new Validation(errors.ru);

const payForm = new PaymentForm(
  document.querySelector(".payment__form"),
  validation
);

payForm.form.addEventListener("input", event => {
  payForm.validation.validate(event);
  payForm.clearDefaultSum(event);
  payForm.clearInputSum(event);
  payForm.activateNameOrEmailInput(event);
});

payForm.form.addEventListener("focusout", event => {
  payForm.setDefaultInput(event);
  payForm.setDefaultNameOrEmailInput(event);
});
