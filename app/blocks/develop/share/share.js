const share = document.querySelector('.share');
const shareImage = document.querySelector('.share__image');
const smm = document.querySelector('.smm');

const shareSmm = () => {
    // console.log(event.target.classList.contains('share'));
    console.dir(event.target);
    console.dir(shareImage);

    if (event.target.classList.contains('share__image')) {
        shareImage.classList.add('share__image_disabled');
        smm.classList.remove('smm_disabled');
    } else {
        shareImage.classList.remove('share__image_disabled');
        smm.classList.add('smm_disabled');
    }
};

share.addEventListener('click', shareSmm);
// document.addEventListener('click', shareSmm);