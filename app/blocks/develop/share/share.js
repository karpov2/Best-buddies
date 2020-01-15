const shareImage = document.querySelector('.share__image');
const smm = document.querySelector('.smm');

const shareSmm = () => {
    if (event.target.closest('.share__image')) {
        shareImage.classList.add('share__image_disabled');
        smm.classList.remove('smm_disabled');
    } else if(!event.target.closest('.share')) {
        shareImage.classList.remove('share__image_disabled');
        smm.classList.add('smm_disabled');
    }
};

document.addEventListener('click', shareSmm);