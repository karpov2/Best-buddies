var header = document.querySelector('.header');
var estimate = document.querySelector('.estimate');

var sticky = function sticky() {
  if (event.target.defaultView.scrollY >= estimate.offsetTop) {
    header.classList.add('header_no-sticky');
  } else {
    header.classList.remove('header_no-sticky');
  }
};

document.addEventListener('scroll', sticky);
var slideIndex = 1;
showSlides(slideIndex); // Next/previous controls

function plusSlides(n) {
  showSlides(slideIndex += n);
} // Thumbnail image controls


function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var slides = document.querySelectorAll(".slideshow__slide"),
      dots = document.querySelectorAll(".slideshow__dot");
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;
  slides.forEach(function (slide) {
    return slide.style.display = "none";
  });
  dots.forEach(function (dot) {
    return dot.classList.add("inactive");
  });
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.remove("inactive");
  dots[slideIndex - 1].classList.add("active");
}
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//ошибки
var errors = {
  ru: {
    emptyInput: "Это обязательное поле",
    outOfRange: "Должно быть от 2 до 30 символов",
    invalidLink: "Здесь должна быть почта",
    correctInput: ""
  }
}; //Апи для прогресс бара

var Api =
/*#__PURE__*/
function () {
  "use strict";

  function Api(options) {
    _classCallCheck(this, Api);

    this.url = options.url;
  }

  _createClass(Api, [{
    key: "get",
    value: function get(path) {
      return fetch("".concat(this.url, "/").concat(path));
    }
  }, {
    key: "post",
    value: function post(path, body) {
      console.log(this.api.url);
      return fetch("".concat(this.api.url, "/").concat(path), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
    }
  }]);

  return Api;
}(); //форма оплаты


var PaymentForm =
/*#__PURE__*/
function () {
  "use strict";

  function PaymentForm(form, widget, api) {
    _classCallCheck(this, PaymentForm);

    this.widget = widget;
    this.form = form;
    this.api = api;
    this.paymentSum = this.form.querySelectorAll(".payment__sum");
    this.paymentInput = this.form.querySelector(".payment__input-any-sum");
    this.rubleSign = this.form.querySelector(".payment__label-any-sum");
    this.name = this.form.querySelector(".payment__name");
    this.email = this.form.querySelector(".payment__email");
    this.buttons = this.form.querySelector(".payment__button-pay-container");
    this.buttonMonthly = this.form.querySelector(".payment__monthly");
    this.buttonOnes = this.form.querySelector(".payment__ones");
    this.progressBar = this.form.querySelector(".payment__how-much");
    this.progressText = this.form.querySelector(".payment__progress-text");
    this.progressSum = this.form.querySelector("#payment__progress-sum");
    this.progressTotalSum = this.form.querySelector("#payment__progress-total-sum");
  }

  _createClass(PaymentForm, [{
    key: "clearDefaultSum",
    value: function clearDefaultSum(event) {
      if (event.target.classList.contains("payment__input-any-sum") && event.target.value.length > 0) {
        this.paymentSum.forEach(function (sum) {
          sum.checked = false;
        });
        this.paymentInput.style.border = "none";
        this.paymentInput.style.font = "normal bold 18px arial, helvetica";
        this.rubleSign.style.color = "#FC691B";
        event.target.parentElement.style.border = "2px solid #FC691B";
      }
    }
  }, {
    key: "clearInputSum",
    value: function clearInputSum(event) {
      if (event.target.classList.contains("payment__input-any-sum") && event.target.value.length === 0) {
        this.paymentInput.style.borderBottom = "1px solid #9397cb";
        this.paymentInput.style.font = "normal normal 14px helvetica";
      }
    }
  }, {
    key: "setDefaultInput",
    value: function setDefaultInput(event) {
      if (event.target.classList.contains("payment__input-any-sum") && event.target.value.length === 0) {
        this.paymentInput.parentElement.style.border = "2px solid #9397CB";
        this.rubleSign.style.color = "#9397CB";
      }
    }
  }, {
    key: "activateNameOrEmailInput",
    value: function activateNameOrEmailInput(event) {
      if (event.target.classList.contains("payment__name") || event.target.classList.contains("payment__email")) {
        event.target.style.border = "2px solid #FC691B";
      }
    }
  }, {
    key: "setDefaultNameOrEmailInput",
    value: function setDefaultNameOrEmailInput(event) {
      if (event.target.classList.contains("payment__name") && event.target.value.length === 0 || event.target.classList.contains("payment__email") && event.target.value.length === 0) {
        event.target.style.border = "2px solid #9397CB";
      }
    }
  }, {
    key: "checkInputs",
    value: function checkInputs(event) {
      var checkboxSum = event.currentTarget.elements.payment__sum,
          inputSum = event.currentTarget.elements.payment__suminput,
          name = event.currentTarget.elements.name,
          email = event.currentTarget.elements.email,
          agree = event.currentTarget.elements.payment__agree;

      function checkCheckboxSum() {
        var result = Array.from(checkboxSum).find(function (sum) {
          return sum.checked === true;
        });
        return !!result;
      }

      function checkInputSum() {
        return inputSum.value > 0;
      }

      function checkName() {
        return name.validity.valid;
      }

      function checkEmail() {
        return email.validity.valid;
      }

      function checkAgree() {
        return agree.checked;
      }

      if ((checkCheckboxSum() || checkInputSum()) && checkName() && checkEmail() && checkAgree()) {
        this.activateButtons();
      } else {
        this.disableButtons();
      }
    }
  }, {
    key: "openPaymentForm",
    value: function openPaymentForm(event, form, post, name, email, sum) {
      event.preventDefault();

      if (event.target.classList.contains("payment__monthly_active") || event.target.classList.contains("payment__ones_active")) {
        this.widget.charge({
          // options
          publicId: "test_api_00000000000000000000001",
          description: "Пример оплаты (деньги сниматься не будут)",
          amount: this.getAmount(),
          currency: "RUB",
          invoiceId: "1234567",
          accountId: "".concat(this.getEmail()),
          skin: "mini",
          data: {
            myProp: "myProp value"
          }
        }, function (options) {
          post.call(form, "infos", {
            info: {
              name: name.apply(form),
              email: email.apply(form),
              sum: sum.apply(form)
            }
          });
        }, function (reason, options) {
          console.log("Оплата не прошла");
        });
      }
    }
  }, {
    key: "activateButtons",
    value: function activateButtons() {
      this.buttonMonthly.removeAttribute("disabled");
      this.buttonMonthly.classList.add("payment__monthly_active");
      this.buttonOnes.removeAttribute("disabled");
      this.buttonOnes.classList.add("payment__ones_active");
    }
  }, {
    key: "disableButtons",
    value: function disableButtons() {
      this.buttonMonthly.setAttribute("disabled", true);
      this.buttonMonthly.classList.remove("payment__monthly_active");
      this.buttonOnes.removeAttribute("disabled");
      this.buttonOnes.classList.remove("payment__ones_active");
    }
  }, {
    key: "getEmail",
    value: function getEmail() {
      return this.email.value;
    }
  }, {
    key: "getAmount",
    value: function getAmount() {
      var checkboxSum = Array.from(this.paymentSum).find(function (sum) {
        return sum.checked === true;
      });
      checkboxSum = checkboxSum ? Number(checkboxSum.value) : 0;
      var inputSum = this.paymentInput.value ? Number(this.paymentInput.value) : 0;
      return checkboxSum + inputSum;
    }
  }, {
    key: "getName",
    value: function getName() {
      return this.name.value;
    }
  }, {
    key: "countProgress",
    value: function countProgress(sum) {
      return (sum / parseInt(this.progressTotalSum.textContent.replace(/\s+/g, ""), 10) * 100).toFixed(3);
    }
  }]);

  return PaymentForm;
}();

var api = new Api({
  url: "https://v2-api.sheety.co/a5ef5d923274b26c584a4e108ade8c58/payment"
});
var payForm = new PaymentForm(document.querySelector(".payment__form"), new cp.CloudPayments(), api);
payForm.api.get("infos").then(function (res) {
  return res.json();
}).then(function (res) {
  return res.infos;
}).then(function (res) {
  res = res.reduce(function (res, sum) {
    return res + Number(sum.sum);
  }, 0);
  payForm.progressSum.textContent = res;
  payForm.progressBar.style.width = "".concat(payForm.countProgress(res), "%");
});
payForm.form.addEventListener("input", function (event) {
  payForm.clearDefaultSum(event);
  payForm.clearInputSum(event);
  payForm.activateNameOrEmailInput(event);
  payForm.checkInputs(event);
});
payForm.form.addEventListener("focusout", function (event) {
  payForm.setDefaultInput(event);
  payForm.setDefaultNameOrEmailInput(event);
});
payForm.buttons.addEventListener("click", function (event) {
  payForm.openPaymentForm(event, payForm, payForm.api.post, payForm.getName, payForm.getEmail, payForm.getAmount);
});
function myFunction() {
  /* Get the text field */
  var copyText = document.querySelector(".help__input");
  console.log(copyText);
  /* Select the text field */

  copyText.select();
  console.log(copyText);
  copyText.setSelectionRange(0, 99999);
  /*For mobile devices*/

  /* Copy the text inside the text field */

  document.execCommand("copy");
  console.dir(window);
  /* Alert the copied text */
  // alert("Copied the text: " + copyText.value);
}
var shareImage = document.querySelector('.share__image');
var smm = document.querySelector('.smm');

var shareSmm = function shareSmm() {
  if (event.target.closest('.share__image')) {
    shareImage.classList.add('share__image_disabled');
    smm.classList.remove('smm_disabled');
  } else if (!event.target.closest('.share')) {
    shareImage.classList.remove('share__image_disabled');
    smm.classList.add('smm_disabled');
  }
};

document.addEventListener('click', shareSmm);