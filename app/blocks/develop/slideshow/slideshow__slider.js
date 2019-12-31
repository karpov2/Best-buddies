let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let slides = document.querySelectorAll(".slideshow__slide"),
    dots = document.querySelectorAll(".slideshow__dot");

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  slides.forEach(slide => (slide.style.display = "none"));
  dots.forEach(dot => dot.classList.add("inactive"));

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.remove("inactive");
  dots[slideIndex - 1].classList.add("active");
}
