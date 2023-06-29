const carousel = document.querySelector(".carousel");
const slideContainer = document.querySelector(".carousel-inner");
const slides = document.querySelectorAll(".carousel-slide");
const prevBtn = document.querySelector(".carousel-control.prev");
const nextBtn = document.querySelector(".carousel-control.next");

let currentIndex = 0;
const slideWidth = slides[0].offsetWidth;

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    slideContainer.style.transform = `translateX(-${
      currentIndex * slideWidth
    }px)`;
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    slideContainer.style.transform = `translateX(-${
      currentIndex * slideWidth
    }px)`;
  }
});