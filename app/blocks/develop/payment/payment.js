const paymentInputSumAny = document.querySelector('.payment__input-any-sum');
const paymentSum = document.querySelectorAll('.payment__sum');
const paymentSumAny = document.querySelectorAll('.payment__sum-any');

console.dir(paymentInputSumAny);
console.dir(paymentSum);

const paymentCheckSumAny = () => {
    console.dir(paymentInputSumAny);
};

paymentInputSumAny.addEventListener('input', paymentCheckSumAny);