const header = document.querySelector('.header');
const estimate = document.querySelector('.estimate');

const sticky = () => {
    if(event.target.defaultView.scrollY >= estimate.offsetTop) {
        header.classList.add('header_no-sticky');
    } else {
        header.classList.remove('header_no-sticky');
    }
};

document.addEventListener('scroll', sticky);