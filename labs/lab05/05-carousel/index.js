let currentPosition = 0;
const gap = 10;
const slideWidth = 400;

const items = document.querySelectorAll('.carousel-item');
const totalSlides = items.length;

function moveForward() {
  if (currentPosition >= totalSlides - 2) {
    currentPosition = 0;
  } else {
    currentPosition++;
  }
  updateCarouselPosition();
}

function moveBackward() {
  if (currentPosition <= 0) {
    currentPosition = totalSlides - 2;
  } else {
    currentPosition--;
  }
  updateCarouselPosition();
}

function updateCarouselPosition() {
  const items = document.querySelectorAll('.carousel-item');
  const offset = (slideWidth + gap) * currentPosition;

  for (const item of items) {
    item.style.transform = `translateX(-${offset}px)`;
  }
}
