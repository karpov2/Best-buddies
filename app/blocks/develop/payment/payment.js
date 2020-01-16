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
  constructor(form, widget) {
    this.widget = widget;
    this.form = form;
    this.paymentSum = this.form.querySelectorAll(".payment__sum");
    this.paymentInput = this.form.querySelector(".payment__input-any-sum");
    this.rubleSign = this.form.querySelector(".payment__label-any-sum");
    this.name = this.form.querySelector(".payment__name");
    this.email = this.form.querySelector(".payment__email");
    this.buttonMonthly = this.form.querySelector(".payment__monthly");
    this.buttonOnes = this.form.querySelector(".payment__ones");
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

  checkInputs(event) {
    const checkboxSum = event.currentTarget.elements.payment__sum,
      inputSum = event.currentTarget.elements.payment__suminput,
      name = event.currentTarget.elements.name,
      email = event.currentTarget.elements.email,
      agree = event.currentTarget.elements.payment__agree;

    function checkCheckboxSum() {
      const result = Array.from(checkboxSum).find(sum => sum.checked === true);
      return result ? result.value : false;
    }

    function checkInputSum() {
      return inputSum.value > 0 ? inputSum.value : false;
    }

    function checkName() {
      return name.validity.valid ? name.value : false;
    }

    function checkEmail() {
      return email.validity.valid ? email.value : false;
    }

    function checkAgree() {
      return agree.checked;
    }

    if (
      (checkCheckboxSum() || checkInputSum()) &&
      checkName() &&
      checkEmail() &&
      checkAgree()
    ) {
      this.buttonMonthly.removeAttribute("disabled");
      this.buttonMonthly.classList.add("payment__monthly_active");

      this.buttonOnes.removeAttribute("disabled");
      this.buttonOnes.classList.add("payment__ones_active");
    } else {
      this.buttonMonthly.setAttribute("disabled", true);
      this.buttonMonthly.classList.remove("payment__monthly_active");

      this.buttonOnes.removeAttribute("disabled");
      this.buttonOnes.classList.remove("payment__ones_active");
    }
  }

  openPaymentForm(event) {
    event.preventDefault();

    const widget = () => {
      this.widget.charge(
        {
          // options
          publicId: "test_api_00000000000000000000001", //id из личного кабинета
          description: "Пример оплаты (деньги сниматься не будут)", //назначение
          amount: 10, //сумма
          currency: "RUB", //валюта
          invoiceId: "1234567", //номер заказа  (необязательно)
          accountId: "user@example.com", //идентификатор плательщика (необязательно)
          skin: "mini", //дизайн виджета
          data: {
            myProp: "myProp value" //произвольный набор параметров
          }
        },
        function(options) {
          // success
          //действие при успешной оплате
        },
        function(reason, options) {
          // fail
          //действие при неуспешной оплате
        }
      );
    };

    if (event.target.classList.contains("payment__monthly")) {
      console.log("payment__monthly");
      widget();
    } else if(event.target.classList.contains("payment__ones")) {
      console.log("payment__ones");
      widget();
    }

    console.dir(this);
    console.dir(event.target);
    const {buttonMonthly, buttonOnes} = this.form.elements;
    console.log(buttonMonthly);
    console.log(buttonOnes);
  }
}

const payForm = new PaymentForm(
  document.querySelector(".payment__form"),
  new cp.CloudPayments()
);

payForm.form.addEventListener("input", event => {
  payForm.clearDefaultSum(event);
  payForm.clearInputSum(event);
  payForm.activateNameOrEmailInput(event);
  payForm.checkInputs(event);
});

payForm.form.addEventListener("focusout", event => {
  payForm.setDefaultInput(event);
  payForm.setDefaultNameOrEmailInput(event);
});

// payForm.form.addEventListener("submit", event => {
//   payForm.openPaymentForm(event);
// });

document.querySelector(".payment__form").addEventListener("click", event => {
  payForm.openPaymentForm(event);
});

// document.querySelector(".button-pay").addEventListener("submit", event => {
//   payForm.openPaymentForm(event);
// });
