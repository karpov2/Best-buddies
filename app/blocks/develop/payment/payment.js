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
	constructor(form, widget, api) {
		this.widget = widget;
		this.form = form;
		this.api = api;
		this.paymentSum = this.form.querySelectorAll(".payment__sum");
		this.paymentInput = this.form.querySelector(".payment__input-any-sum");
		this.rubleSign = this.form.querySelector(".payment__label-any-sum");
		this.name = this.form.querySelector(".payment__name");
		this.email = this.form.querySelector(".payment__email");
		this.buttons = this.form.querySelector(
			".payment__button-pay-container"
		);
		this.buttonMonthly = this.form.querySelector(".payment__monthly");
		this.buttonOnes = this.form.querySelector(".payment__ones");
		this.progressBar = this.form.querySelector(".payment__how-much");
        this.progressText = this.form.querySelector(".payment__progress-text");
        this.progressSum = this.form.querySelector("#payment__progress-sum");
        this.progressTotalSum = this.form.querySelector("#payment__progress-total-sum");
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
			const result = Array.from(checkboxSum).find(
				sum => sum.checked === true
			);
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

		if (
			(checkCheckboxSum() || checkInputSum()) &&
			checkName() &&
			checkEmail() &&
			checkAgree()
		) {
			this.activateButtons();
		} else {
			this.disableButtons();
		}
	}

	openPaymentForm(event) {
		event.preventDefault();

		if (
			event.target.classList.contains("payment__monthly_active") ||
			event.target.classList.contains("payment__ones_active")
		) {
			this.widget.charge(
				{
					// options
					publicId: "test_api_00000000000000000000001",
					description: "Пример оплаты (деньги сниматься не будут)",
					amount: this.getAmount(),
					currency: "RUB",
					invoiceId: "1234567",
					accountId: `${this.getEmail()}`,
					skin: "mini",
					data: {
						myProp: "myProp value"
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
        }
        
        this.api
            .post({
                name: "test",
                email: this.getEmail(),
                sum: this.getAmount()
            });
	}

	activateButtons() {
		this.buttonMonthly.removeAttribute("disabled");
		this.buttonMonthly.classList.add("payment__monthly_active");

		this.buttonOnes.removeAttribute("disabled");
		this.buttonOnes.classList.add("payment__ones_active");
	}

	disableButtons() {
		this.buttonMonthly.setAttribute("disabled", true);
		this.buttonMonthly.classList.remove("payment__monthly_active");

		this.buttonOnes.removeAttribute("disabled");
		this.buttonOnes.classList.remove("payment__ones_active");
	}

	getEmail() {
		return this.email.value;
	}

	getAmount() {
		let checkboxSum = Array.from(this.paymentSum).find(
			sum => sum.checked === true
		);

		checkboxSum = checkboxSum ? Number(checkboxSum.value) : 0;

		let inputSum = this.paymentInput.value
			? Number(this.paymentInput.value)
			: 0;

		return checkboxSum + inputSum;
	}

	getName() {
		return "Test";
	}

	countProgress(sum) {
		return ((sum / parseInt(this.progressTotalSum.textContent.replace(/\s+/g, ''),10)) * 100).toFixed(3);
	}
}

//Апи для прогресс бара
class Api {
	constructor(options) {
		this.url = options.url;
	}

	get(path) {
		return fetch(`${this.url}/${path}`);
    }
    
    post(path, body) {
        return fetch(`${this.url}/${path}`, {
            method: 'POST',
            headers: {
                // authorization: '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
    }
}

const api = new Api({
	url: "https://v2-api.sheety.co/a5ef5d923274b26c584a4e108ade8c58/payment"
});

const payForm = new PaymentForm(
	document.querySelector(".payment__form"),
	new cp.CloudPayments(),
	api
);

payForm.api
	.get('info')
	.then(res => res.json())
	.then(res => res.info)
	.then(res => {
        console.log(res);
        res = res.reduce((res, sum) => res + Number(sum.sum), 0);
		payForm.progressSum.textContent = res;
		payForm.progressBar.style.width = `${payForm.countProgress(res)}%`;
	});

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

payForm.buttons.addEventListener("click", event => {
	payForm.openPaymentForm(event);
});
