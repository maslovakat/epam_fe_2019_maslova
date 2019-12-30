
const latestPortfolioContainer = document.querySelector('.latest-portfolio__blocks');
const latestPrortfolioSlide = document.querySelectorAll('.latest-portfolio__block');
const latestPortfolioSliderButtonList = document.querySelectorAll('.latest-portfolio__slider-size');

const testimonialsSliderButtonList = document.querySelectorAll('.testimonials__slider-size');
const testimonialsSlide = document.querySelectorAll('.testimonials__slider-slide');
const testimonialsTabs = document.querySelectorAll('.testimonials__tabs-item');
testimonialsTabs[0].checked = true;

function SliderBehavior(slideList, sliderContainer) {
  let startTouchForSwipe = 0;

  this.stopAutoSlider = function () {
    if (this.autoSlider) {
      clearInterval(this.autoSlider);
      this.autoSlider = null;
    }
  };
  this.startAutoSlider = function () {
    if (this.autoSlider === null) {
      this.autoSlider = setInterval(this.moveSlideToRight, 2000);
    }
  };
  const swipe = function (e) {
    if (startTouchForSwipe - e.changedTouches[0].pageX <= -100) {
      this.moveSlideToLeft();
    }
    if (startTouchForSwipe - e.changedTouches[0].pageX >= 100) {
      this.moveSlideToRight();
    }
  };
  if (sliderContainer) {
    sliderContainer.addEventListener('touchend', swipe);
    sliderContainer.addEventListener('touchstart', (e) => startTouchForSwipe = e.changedTouches[0].pageX);
  } else {
    slideList.forEach((e) => e.addEventListener('touchend', swipe));
    slideList.forEach((element) => element.addEventListener('touchstart', (e) => startTouchForSwipe = e.changedTouches[0].pageX));
  }
  this.autoSlider = null;
}
function LatestPortfolioSlider(latestPrortfolioSlide, latestPortfolioContainer) {
  SliderBehavior.apply(this, arguments);
  let currentSlide = 0;
  const latestPrortfolioSlideLeftPosition = [];
  const sliderButtonLeft = latestPortfolioSliderButtonList[0];
  const sliderButtonRight = latestPortfolioSliderButtonList[1];
  const defineCurrentSlide = function (direction) {
    if (direction === 'left') {
      ++currentSlide;
      currentSlide >= latestPrortfolioSlide.length ? currentSlide = 0 : currentSlide;
    } else if (direction === 'right') {
      --currentSlide;
      currentSlide === -1 ? currentSlide = latestPrortfolioSlide.length - 1 : currentSlide;
    }
    return currentSlide;
  };
  this.setPositionForEachElement = function () {
    const itemWidth = 100 / 2.9;
    let position = 0;
    for (let i = 0; i < latestPrortfolioSlide.length; i++) {
      latestPrortfolioSlideLeftPosition.push(position);
      position += itemWidth;
    }
    latestPrortfolioSlideLeftPosition[latestPrortfolioSlideLeftPosition.length - 1] = -(itemWidth);
    latestPrortfolioSlide.forEach((item, index) => item.style.left = `${latestPrortfolioSlideLeftPosition[index]}%`);
  };
  this.moveSlideToRight = function () {
    this.disabled = true;
    defineCurrentSlide('left');
    let currentItem = currentSlide;
    for (let i = 0; i < latestPrortfolioSlide.length; i++) {
      currentItem >= latestPrortfolioSlide.length ? currentItem = 0 : currentItem;
      (i <= 2 || i === latestPrortfolioSlide.length - 1) ? latestPrortfolioSlide[currentItem].style.opacity = 1 : latestPrortfolioSlide[currentItem].style.opacity = 0;
      latestPrortfolioSlide[currentItem].style.left = `${latestPrortfolioSlideLeftPosition[i]}%`;
      currentItem++;
    }
    setTimeout(() => {
      this.disabled = false;
    }, 700);
  };
  this.moveSlideToLeft = function () {
    this.disabled = true;
    defineCurrentSlide('right');
    let currentItem = currentSlide;
    for (let i = 0; i < latestPrortfolioSlide.length; i++) {
      currentItem >= latestPrortfolioSlide.length ? currentItem = 0 : currentItem;
      (i <= 3) ? latestPrortfolioSlide[currentItem].style.opacity = 1 : latestPrortfolioSlide[currentItem].style.opacity = 0;
      latestPrortfolioSlide[currentItem].style.left = `${latestPrortfolioSlideLeftPosition[i]}%`;
      currentItem++;
    }
    setTimeout(() => {
      this.disabled = false;
    }, 700);
  };
  sliderButtonLeft.addEventListener('click', this.moveSlideToLeft);
  sliderButtonRight.addEventListener('click', this.moveSlideToRight);
  [sliderButtonLeft, sliderButtonRight].forEach((e) => e.addEventListener('click', this.startAutoSlider));
  [sliderButtonRight, sliderButtonLeft, latestPortfolioContainer].forEach((e) => {
    e.addEventListener('mouseover', this.stopAutoSlider);
    e.addEventListener('mouseout', this.startAutoSlider);
  });
  this.autoSlider = setInterval(this.moveSlideToRight, 2000);
}
function TabSlider() {
  testimonialsTabs[0].addEventListener('click', this.getSlideFromTab);
  testimonialsTabs[1].addEventListener('click', this.getSlideFromTab);
  testimonialsTabs[2].addEventListener('click', this.getSlideFromTab);
  this.moveTestimonialsSlideFromTab = function (i) {
    testimonialsSlide.forEach((i) => i.style.opacity = 0);
    testimonialsSlide[i].style.opacity = 1;
  };
  this.getSlideFromTab = function (e) {
    if (e.target.id === 'tab-0') {
      this.moveTestimonialsSlideFromTab(0);
    }
    if (e.target.id === 'tab-1') {
      this.moveTestimonialsSlideFromTab(1);
    }
    if (e.target.id === 'tab-2') {
      this.moveTestimonialsSlideFromTab(2);
    }
  };
}
function TestimonialsSlider(testimonialsSlide) {
  SliderBehavior.apply(this, arguments);
  TabSlider.apply(this, arguments);
  let currentSlide = 0;
  const sliderButtonLeft = testimonialsSliderButtonList[0];
  const sliderButtonRight = testimonialsSliderButtonList[1];
  this.moveSlideToRight = function () {
    this.disabled = true;
    ++currentSlide;
    if (currentSlide === testimonialsSlide.length) {
      currentSlide = 0;
      testimonialsSlide[testimonialsSlide.length - 1].style.opacity = 0;
      testimonialsSlide[currentSlide].style.opacity = 1;
    } else {
      testimonialsSlide[currentSlide - 1].style.opacity = 0;
      testimonialsSlide[currentSlide].style.opacity = 1;
    }
    testimonialsTabs[currentSlide].checked = true;
    setTimeout(() => {
      this.disabled = false;
    }, 700);
  };
  this.moveSlideToLeft = function () {
    this.disabled = true;
    --currentSlide;
    if (currentSlide === -1) {
      currentSlide = testimonialsSlide.length - 1;
      testimonialsSlide[0].style.opacity = 0;
      testimonialsSlide[currentSlide].style.opacity = 1;
    } else {
      testimonialsSlide[currentSlide + 1].style.opacity = 0;
      testimonialsSlide[currentSlide].style.opacity = 1;
    }
    testimonialsTabs[currentSlide].checked = true;
    setTimeout(() => {
      this.disabled = false;
    }, 700);
  };

  sliderButtonLeft.addEventListener('click', this.moveSlideToLeft);
  sliderButtonRight.addEventListener('click', this.moveSlideToRight);
  [testimonialsTabs[0], testimonialsTabs[1], testimonialsTabs[2], sliderButtonRight, sliderButtonLeft].forEach((e) => {
    e.addEventListener('mouseover', this.stopAutoSlider);
    e.addEventListener('mouseout', this.startAutoSlider);
  });
  testimonialsSlide.forEach((e) => {
    e.addEventListener('mouseover', this.stopAutoSlider);
    e.addEventListener('mouseout', this.startAutoSlider);
  });
  [sliderButtonLeft, sliderButtonRight].forEach((e) => e.addEventListener('click', this.startAutoSlider));
  this.autoSlider = setInterval(this.moveSlideToRight, 2000);
}

LatestPortfolioSlider.prototype = Object.create(SliderBehavior.prototype);
LatestPortfolioSlider.prototype.constructor = LatestPortfolioSlider;

TestimonialsSlider.prototype = Object.create(SliderBehavior.prototype);
TestimonialsSlider.prototype.constructor = TestimonialsSlider;

TestimonialsSlider.prototype = Object.create(TabSlider.prototype);
TestimonialsSlider.prototype.constructor = TestimonialsSlider;

const testimonialsSlider = new TestimonialsSlider(testimonialsSlide);
testimonialsSlider;
const latestPortfolioSlider = new LatestPortfolioSlider(latestPrortfolioSlide, latestPortfolioContainer);
latestPortfolioSlider.setPositionForEachElement();
