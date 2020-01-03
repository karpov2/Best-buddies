(function() {
  const paymentForm = document.querySelector(".payment__form");
  const paymentSum = document.querySelectorAll(".payment__sum");
  const paymentInput = document.querySelector(".payment__input-any-sum");
  const rubleSign = document.querySelector(".payment__label-any-sum");

  paymentForm.addEventListener("input", event => {
    if (
      event.target.classList.contains("payment__input-any-sum") &&
      event.target.value.length > 0
    ) {
      paymentSum.forEach(sum => {
        sum.checked = false;
      });
      paymentInput.style.border = "none";
      paymentInput.style.font = "normal bold 18px arial, helvetica";
      event.target.parentElement.style.border = "2px solid #FC691B";
      rubleSign.style.color = "#FC691B";
    } else if (
      event.target.classList.contains("payment__input-any-sum") &&
      event.target.value.length === 0
    ) {
      paymentInput.style.borderBottom = "1px solid #9397cb";
      paymentInput.style.font = "normal normal 14px helvetica";
    }
  });

  paymentForm.addEventListener("focusout", event => {
    if (
      event.target.classList.contains("payment__input-any-sum") &&
      event.target.value.length === 0
    ) {
      event.target.parentElement.style.border = "2px solid #9397CB";
      rubleSign.style.color = "#9397CB";
    }
  });
})();
