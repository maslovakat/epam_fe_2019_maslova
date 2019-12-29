
const latestPortfolioContainer = document.querySelector('.latest-portfolio__blocks');
const latestPrortfolioSlide = document.querySelectorAll('.latest-portfolio__block');
const latestPortfolioSliderButton = document.querySelectorAll('.latest-portfolio__slider-size');
let startTouchForSwipe = 0;
let currentSlide = 0;
const latestPrortfolioSlideLeftPosition = [];

function setPositionForEachElement() {
  const itemWidth = 100 / 2.9;
  let position = 0;
  for (let i = 0; i < latestPrortfolioSlide.length; i++) {
    latestPrortfolioSlideLeftPosition.push(position);
    position += itemWidth;
  }
  latestPrortfolioSlideLeftPosition[latestPrortfolioSlideLeftPosition.length - 1] = -(itemWidth);
  latestPrortfolioSlide.forEach((item, index) => item.style.left = `${latestPrortfolioSlideLeftPosition[index]}%`);
}
setPositionForEachElement();

latestPortfolioSliderButton[0].addEventListener('click', moveSlideToLeft);
latestPortfolioSliderButton[1].addEventListener('click', moveSlideToRight);
latestPortfolioSliderButton[1].addEventListener('mouseover', stopAutoSlider);
latestPortfolioSliderButton[1].addEventListener('mouseout', startAutoSlider);
latestPortfolioSliderButton[0].addEventListener('mouseover', stopAutoSlider);
latestPortfolioSliderButton[0].addEventListener('mouseout', startAutoSlider);
latestPortfolioContainer.addEventListener('mouseover', stopAutoSlider);
latestPortfolioContainer.addEventListener('mouseout', startAutoSlider);
latestPortfolioContainer.addEventListener('touchend', swipeSlider);
latestPortfolioContainer.addEventListener('touchstart', (e) => startTouchForSwipe = e.changedTouches[0].pageX);

latestPortfolioSliderButton[0].addEventListener('click', startAutoSlider);
latestPortfolioSliderButton[1].addEventListener('click', startAutoSlider);

function defineCurrentSlide(direction) {
  if (direction === 'left') {
    ++currentSlide;
    currentSlide >= 6 ? currentSlide = 0 : currentSlide;
  } else if (direction === 'right') {
    --currentSlide;
    currentSlide === -1 ? currentSlide = 5 : currentSlide;
  }
}
function moveSlideToRight() {
  this.disabled = true;
  defineCurrentSlide('left');
  let currentItem = currentSlide;
  for (let i = 0; i < latestPrortfolioSlide.length; i++) {
    currentItem >= 6 ? currentItem = 0 : currentItem;
    (i <= 2 || i === 5) ? latestPrortfolioSlide[currentItem].style.opacity = 1 : latestPrortfolioSlide[currentItem].style.opacity = 0;
    latestPrortfolioSlide[currentItem].style.left = `${latestPrortfolioSlideLeftPosition[i]}%`;
    currentItem++;
  }
  setTimeout(() => {
    this.disabled = false;
  }, 700);
}
function moveSlideToLeft() {
  this.disabled = true;
  defineCurrentSlide('right');
  let currentItem = currentSlide;
  for (let i = 0; i < latestPrortfolioSlide.length; i++) {
    currentItem >= 6 ? currentItem = 0 : currentItem;
    (i <= 3) ? latestPrortfolioSlide[currentItem].style.opacity = 1 : latestPrortfolioSlide[currentItem].style.opacity = 0;
    latestPrortfolioSlide[currentItem].style.left = `${latestPrortfolioSlideLeftPosition[i]}%`;
    currentItem++;
  }
  setTimeout(() => {
    this.disabled = false;
  }, 700);
}

let autoSlider;
function stopAutoSlider() {
  if (autoSlider) {
    clearInterval(autoSlider);
    autoSlider = null;
  }
}
function startAutoSlider() {
  if (autoSlider === null) {
    autoSlider = setInterval(moveSlideToRight, 2000);
  }
}
function swipeSlider(e) {
  startTouchForSwipe - e.changedTouches[0].pageX <= -100 ? moveSlideToLeft() : null;
  startTouchForSwipe - e.changedTouches[0].pageX >= 100 ? moveSlideToRight() : null;
}

// testimonials slider

const testimonialsSliderButton = document.querySelectorAll('.testimonials__slider-size');
let currentTestimonialsSlide = 0;

const testimonialsSlide = document.querySelectorAll('.testimonials__slider-slide');

const testimonialsTabs = document.querySelectorAll('.testimonials__tabs-item');

testimonialsSliderButton[0].addEventListener('click', moveTestimonialsSlideToLeft);
testimonialsSliderButton[1].addEventListener('click', moveTestimonialsSlideToRight);
testimonialsTabs[currentTestimonialsSlide].checked = true;
testimonialsSlide[0].style.opacity = 1;

function moveTestimonialsSlideToLeft() {
  this.disabled = true;
  --currentTestimonialsSlide;

  if (currentTestimonialsSlide === -1) {
    currentTestimonialsSlide = testimonialsSlide.length - 1;
    testimonialsSlide[0].style.opacity = 0;
    testimonialsSlide[currentTestimonialsSlide].style.opacity = 1;
  } else {
    testimonialsSlide[currentTestimonialsSlide + 1].style.opacity = 0;
    testimonialsSlide[currentTestimonialsSlide].style.opacity = 1;
  }

  testimonialsTabs[currentTestimonialsSlide].checked = true;
  setTimeout(() => {
    this.disabled = false;
  }, 700);
}

function moveTestimonialsSlideToRight() {
  this.disabled = true;
  ++currentTestimonialsSlide;
  if (currentTestimonialsSlide === testimonialsSlide.length) {
    currentTestimonialsSlide = 0;
    testimonialsSlide[testimonialsSlide.length - 1].style.opacity = 0;
    testimonialsSlide[currentTestimonialsSlide].style.opacity = 1;
  } else {
    testimonialsSlide[currentTestimonialsSlide - 1].style.opacity = 0;
    testimonialsSlide[currentTestimonialsSlide].style.opacity = 1;
  }

  testimonialsTabs[currentTestimonialsSlide].checked = true;
  setTimeout(() => {
    this.disabled = false;
  }, 700);
}
testimonialsSliderButton[1].addEventListener('mouseover', stopAutoTestimonialsSlider);
testimonialsSliderButton[1].addEventListener('mouseout', startAutoTestimonialsSlider);
testimonialsSliderButton[0].addEventListener('mouseover', stopAutoTestimonialsSlider);
testimonialsSliderButton[0].addEventListener('mouseout', startAutoTestimonialsSlider);
testimonialsSlide.forEach((i) => i.addEventListener('mouseover', stopAutoTestimonialsSlider));
testimonialsSlide.forEach((i) => i.addEventListener('mouseout', startAutoTestimonialsSlider));
testimonialsTabs[0].addEventListener('mouseover', stopAutoTestimonialsSlider);
testimonialsTabs[0].addEventListener('mouseout', startAutoTestimonialsSlider);
testimonialsTabs[1].addEventListener('mouseover', stopAutoTestimonialsSlider);
testimonialsTabs[1].addEventListener('mouseout', startAutoTestimonialsSlider);
testimonialsTabs[2].addEventListener('mouseover', stopAutoTestimonialsSlider);
testimonialsTabs[2].addEventListener('mouseout', startAutoTestimonialsSlider);
let autoTestimonialsSlider;
function stopAutoTestimonialsSlider() {
  if (autoTestimonialsSlider) {
    clearInterval(autoTestimonialsSlider);
    autoTestimonialsSlider = null;
  }
}
function startAutoTestimonialsSlider() {
  if (autoTestimonialsSlider === null) {
    autoTestimonialsSlider = setInterval(moveTestimonialsSlideToRight, 2000);
  }
}
testimonialsTabs[0].addEventListener('click', getSlideFromTab);
testimonialsTabs[1].addEventListener('click', getSlideFromTab);
testimonialsTabs[2].addEventListener('click', getSlideFromTab);
function getSlideFromTab(e) {
  if (e.target.id === 'tab-0') {
    moveTestimonialsSlideFromTab(0);
  }
  if (e.target.id === 'tab-1') {
    moveTestimonialsSlideFromTab(1);
  }
  if (e.target.id === 'tab-2') {
    moveTestimonialsSlideFromTab(2);
  }
}
function moveTestimonialsSlideFromTab(i) {
  currentTestimonialsSlide = i;
  testimonialsSlide.forEach((i) => i.style.opacity = 0);
  testimonialsSlide[currentTestimonialsSlide].style.opacity = 1;
}
window.onload = function () {
  autoSlider = setInterval(moveSlideToRight, 2000);
  autoTestimonialsSlider = setInterval(moveTestimonialsSlideToRight, 2000);
};
