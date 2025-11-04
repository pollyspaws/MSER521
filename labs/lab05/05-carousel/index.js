// this means the starting position for the image carousel is set to 0 but the position can be reassigned
let currentPosition = 0;
// this means that the gap between the 2 images shown on the carousel at any given time will always be 10px
const gap = 10;
// this means that the width of each image or slide whatever you want to cal it is 400px always
const slideWidth = 400;

// this means that the element called items will always refer to anything in the html with the class carousel-item
const items = document.querySelectorAll('.carousel-item');
// this means that the element called totalSlides refers to the integer value representing the number of items in a NodeList, the nodelist being the element items in this case which is all the slides in the carousel
const totalSlides = items.length;

// this creates a function called moveForward
function moveForward() {
  // This says that if the current position of the carousel images is greater than or equal to the value of total slides (which is the total number of carousel slides) minus 2 then it will set the current position to 0
  if (currentPosition >= totalSlides - 2) {
    currentPosition = 0;
  // this says that if the current position is not greater than or equal to totalSlides minus 2 then it adds one to the currrent position
  } else {
    currentPosition++;
  }
  // this is telling it to run the function updateCarouselPosition based on whichever condition above is met 
  updateCarouselPosition();
}

// this creates a function called moveBackward
function moveBackward() {
  // this says that if the current position is greater than or equal to 0 then the position will move to totalSlides minus 2
  if (currentPosition <= 0) {
    currentPosition = totalSlides - 2;
  // this says that if the current position is not greater than or equal to 0 then the position will move minus one
  } else {
    currentPosition--;
  }
  // this is telling it to run the function updateCarouselPosition based on whichever condition above is met
  updateCarouselPosition();
}

// this creates a function called updateCarouselPosition
function updateCarouselPosition() {
  // this is repeating an above command saying that that the element called items will always refer to anything in the html with the class carousel-item
  const items = document.querySelectorAll('.carousel-item');
  // this is saying that the element called offset calculates how far to move based on the current position, it is saying that offset means the slideWidth value plus the gap value multiplied by the element currentPosition
  const offset = (slideWidth + gap) * currentPosition;

  // this is saying that for all the items (carousel slides) inside the element called items will be using the style property called transform will be applying translateX to the negative calculated value of the element offset. meaning that the slides in the carousel will move their width plus the gap size times whatever position number (whatever all that adds up to in pixels)
  for (const item of items) {
    item.style.transform = `translateX(-${offset}px)`;
  }
}
