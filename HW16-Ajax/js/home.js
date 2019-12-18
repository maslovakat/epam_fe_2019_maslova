let data;
const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (xhttp.readyState === 4 && xhttp.status === 200) {
    data = JSON.parse(xhttp.responseText);
  }
};
xhttp.open('GET', 'js/home.json', false);
xhttp.send();
function drawElement(tag, className, id) {
  const element = document.createElement(tag);
  className ? element.classList.add(className) : '';
  id ? element.setAttribute('id', id) : '';
  return element;
}
function makeAppendChild(parent) {
  for (let i = 1; i < arguments.length; i++) {
    parent.appendChild(arguments[i]);
  }
}
function showHeader(data) {
  return `<h2 class="header__ideas">${data.title}</h2>
        <p class="header__text">${data.text}</p>
        <div class="buttons">
        ${data.buttons.map((i) => showHeaderButton(i)).join('')}
        </div>`;
}
function showHeaderButton(data) {
  return `<button class="buttons__item buttons--${data.description}">${data.name}</button>`;
}
function showSectionHeader(data, section) {
  return `<h2 class="${section.className}__header">${data.title}</h2>
          <div class="${section.className}__header-underline"></div>
          <p class="${section.className}__text">${data.description}</p>`;
}
function showFolder(folder) {
  return `<section class="folder__${folder.name} folder--size">
            <svg class="folder__${folder.name}-icon">
              <use href="${folder.picture}"></use>
            </svg>
            <h4 class="folder__${folder.name}-header">${folder.title}</h4>
          </section>`;
}
function showVideo(video, section) {
  return `<video class="${section.className}__video-item" controls="controls" poster="${video.poster}" ><source src="${video.src}" type="video/mp4" /></video>`;
}
function showLatestPostsBlock(post, section) {
  return `<div class="${section.className}__block">
            <img class="${section.className}__block-picture" src="${post.img}" alt="${post.imgDescription}" />
                <a class="${section.className}__block-header" href="#">${post.title}</a>
                <p class="${section.className}__block-text">${post.text}</p>
                <div class="${section.className}__block-info">
                    <p class="${section.className}__block-info-date">${post.date}</p>
                    <p class="${section.className}__block-info-read">${post.read}</p>
                    <svg class="${section.className}__block-info-comments-icon">
                        <use href="${post.commentSign}"></use>
                    </svg>
                    <p class="${section.className}__block-info-comments">${post.commentQuantity}</p>
                </div>
            </div>
          </div >`;
}
function showLatestPortfolioCards(card, section) {
  return `<section class="${section.className}__block ${section.className}--${card.background}">
            <h3 class="${section.className}__block-header">${card.title}</h3>
            <p class="${section.className}__block-text">${card.text}</p>
          </section>`;
}
function showPortfolioButtons(data, section) {
  return `${arrowButton(data, section, 'left')} ${arrowButton(data, section, 'right')}`;
}
function showButtonSeeAllWorks(section) {
  return `<button class="${section.className}__button">${data[3].button}</button>`;
}
function showSectionHeaderTitle(data, section) {
  return `<h2 class="${section.className}__header">${data.title}</h2>
          <div class="${section.className}__header-underline"></div>`;
}
function showTestimonialsSlider(data, section) {
  return `${arrowButton(data, section, 'left')}
          <div class="${section.className}-slide">
            <div class="${section.className}-slide-quote">
              <h3 class="${section.className}-slide-quote-header">${data.quote}</h3>
              <p class="${section.className}-slide-quote-author">${data.author}</p>
              <p class="${section.className}-slide-quote-product">${data.position}</p>
            </div>
            <div class="${section.className}-slide-user">
                <img class="${section.className}-slide-user-photo" src="${data.photo}" alt="${data.photoDescription}" />
            </div>
          </div>${arrowButton(data, section, 'right')}`;
}
function arrowButton(data, section, side) {
  return `<div class="${section.className}-size">
            <svg class="${section.className}-${side}-arrow"><use href="${data.arrowSign}"></use></svg>
          </div>`;
}
function showCommunicateItem(section, item) {
  return `<a class="${section.className}__${item.name}" href="#">
            <svg class="${section.className}--${item.name}"><use href="${item.sign}"></use></svg>
          </a>`;
}
function showNextStepsHeader(data, section) {
  return `<h2 class="${section.className}__header">${data.title}</h2>`;
}
function showNextStepsListItem(data, section) {
  return `<li class="${section}-item">
            <h4 class="${section}-item-header">${data.title}</h4>
            <p class="${section}-item-text">${data.text}</p>
          </li>`;
}
function showWriteUsTop(data, section) {
  return `<svg class="${section}__icon"><use href="${data.mailSign}"></use></svg>
          <h4 class="${section}__header">${data.text}</h4>`;
}
function showWriteUsForm(data, section) {
  return `<form method="POST">
            <label class="${section}__header" for="userName">${data.name}</label>
            <input class="${section}__field" id="userName" type="text" name="user-name" />
            <label class="${section}__header" for="userMail">${data.email}</label>
            <input class="${section}__field" id="userMail" type="email" name="user-mail" />
            <label class="${section}__header ${section}--password-header" for="userPassword">${data.password}</label>
            <input class="${section}__field" id="userPassword" type="password" name="user-password" />
            <div class="${section}--show-pass">
              <input class="${section}--show-pass-check" id="showUnshow" type="checkbox" />
              <label for="showUnshow" class="${section}--show-pass-text">${data.show}</label>
            </div>
            <input type="submit" class="${section}__button" value="Send message" />
          </form>${showWriteUsTextInForm(data, section)}`;
}
function showWriteUsTextInForm(data, section) {
  return `<p class="${section}__text">${data.text}<a href="mailto:email@gmail.com" class="${section}--contact-email">${data.link}</a></p>`;
}
function showWriteUsMap(data, section) {
  return `<img class="${section}-picture" src="${data.map}" alt="map" />`;
}
const headerFragment = document.createDocumentFragment();
const headerContainer = document.querySelector('.header__block');
const wrapHeader = document.createElement('div');
wrapHeader.innerHTML = showHeader(data.find((b) => b.id === 'header'));
makeAppendChild(headerFragment, wrapHeader);
makeAppendChild(headerContainer, headerFragment);
const main = document.getElementById('main');
const fragment = document.createDocumentFragment();
const containerBeforeTestimonials = drawElement('div', 'container');
makeAppendChild(fragment, containerBeforeTestimonials);
const aboutUsDraw = function (aboutUsData) {
  const sectionAboutUs = drawElement('section', 'about-us', 'aboutUs');
  const wrapAboutUsFolders = drawElement('div', 'folder');
  const wrapAboutUsVideo = drawElement('div', `${sectionAboutUs.className}__video`);
  const wrapAboutUs = document.createElement('div');
  wrapAboutUsFolders.innerHTML = aboutUsData.folders.map((i) => showFolder(i)).join('');
  wrapAboutUsVideo.innerHTML = aboutUsData.video.map((i) => showVideo(i, sectionAboutUs)).join('');
  wrapAboutUs.innerHTML = showSectionHeader(aboutUsData, sectionAboutUs);
  makeAppendChild(sectionAboutUs, wrapAboutUs, wrapAboutUsFolders, wrapAboutUsVideo);
  makeAppendChild(containerBeforeTestimonials, sectionAboutUs);
};
const latestPostDraw = function (latestPostsData) {
  const latestPosts = drawElement('section', 'latest-posts');
  const wrapLatestPostsHeader = drawElement('div');
  wrapLatestPostsHeader.innerHTML = showSectionHeader(latestPostsData, latestPosts);
  const wrapLatestPostsBlocks = drawElement('div', `${latestPosts.className}__blocks`);
  wrapLatestPostsBlocks.innerHTML = latestPostsData.posts.map((i) => showLatestPostsBlock(i, latestPosts)).join('');
  makeAppendChild(latestPosts, wrapLatestPostsHeader, wrapLatestPostsBlocks);
  makeAppendChild(containerBeforeTestimonials, latestPosts);
};
const latestPortfolioDraw = function (latestPortfolioData) {
  const latestPortfolio = drawElement('section', 'latest-portfolio', 'latestPortfolio');
  const wrapLatestPortfolioHeader = drawElement('div');
  wrapLatestPortfolioHeader.innerHTML = showSectionHeader(latestPortfolioData, latestPortfolio);
  const wrapLatestPortfolioCards = drawElement('div', `${latestPortfolio.className}__blocks`);
  wrapLatestPortfolioCards.innerHTML = latestPortfolioData.cards.map((i) => showLatestPortfolioCards(i, latestPortfolio)).join('');
  const wrapPorfolioButtons = drawElement('div', `${latestPortfolio.className}__slider`);
  wrapPorfolioButtons.innerHTML = showPortfolioButtons(latestPortfolioData, wrapPorfolioButtons);
  const wrapProtfolioButtonSeeAllWorks = drawElement('div');
  wrapProtfolioButtonSeeAllWorks.innerHTML = showButtonSeeAllWorks(latestPortfolio);
  makeAppendChild(latestPortfolio, wrapLatestPortfolioHeader, wrapLatestPortfolioCards, wrapPorfolioButtons, wrapProtfolioButtonSeeAllWorks);
  makeAppendChild(containerBeforeTestimonials, latestPortfolio);
};
const testimonialsFragment = document.createDocumentFragment();
const testimonialsDraw = function (testimonialsData) {
  const testimonials = drawElement('section', 'testimonials');
  const containerTestimonials = drawElement('div', 'container');
  const wraptestimonialsHeader = drawElement('div');
  wraptestimonialsHeader.innerHTML = showSectionHeaderTitle(testimonialsData, testimonials);
  const sliderBlock = drawElement('div');
  const testimonialsSlider = drawElement('div', `${testimonials.className}__slider`);
  testimonialsSlider.innerHTML = showTestimonialsSlider(testimonialsData, testimonialsSlider);
  makeAppendChild(containerTestimonials, wraptestimonialsHeader, sliderBlock);
  makeAppendChild(testimonials, containerTestimonials);
  makeAppendChild(sliderBlock, testimonialsSlider);
  makeAppendChild(testimonialsFragment, testimonials);
};
const containerContactUs = drawElement('div', 'container');
const contactUsDraw = function (testimonialsData) {
  const contactUsFragment = document.createDocumentFragment();
  const contactUs = drawElement('section', 'contact-us', 'contactUs');
  const wrapContactUsHeader = drawElement('div');
  wrapContactUsHeader.innerHTML = showSectionHeader(testimonialsData, contactUs);
  const wrapContactUsCommunicate = drawElement('div', `${contactUs.className}__communicate-form`);
  const contactUsCommunicate = drawElement('div', 'communicate');
  contactUsCommunicate.innerHTML = testimonialsData.communicate.map((i) => showCommunicateItem(contactUsCommunicate, i)).join('');
  makeAppendChild(contactUs, wrapContactUsHeader, wrapContactUsCommunicate);
  makeAppendChild(wrapContactUsCommunicate, contactUsCommunicate);
  makeAppendChild(contactUsFragment, contactUs);
  makeAppendChild(containerContactUs, contactUsFragment);
};
const nextStepsFragment = document.createDocumentFragment();
const writeUsDraw = function (writeUsData) {
  const writeUs = drawElement('div', 'write-us');
  const writeUsTop = drawElement('section', `${writeUs.className}__top`);
  writeUsTop.innerHTML = showWriteUsTop(writeUsData.writeUs[0].top[0], writeUs.className);
  const writeUsForm = drawElement('div', 'form');
  writeUsForm.innerHTML = showWriteUsForm(writeUsData.writeUs[0].formField[0], writeUsForm.className);
  const writeUsMap = drawElement('div', `${writeUs.className}__map`);
  writeUsMap.innerHTML = showWriteUsMap(writeUsData.writeUs[0], writeUsMap.className);
  makeAppendChild(writeUs, writeUsTop, writeUsForm, writeUsMap);
  return writeUs;
};
const nextStepsDraw = function (nextStepsData) {
  const nextSteps = drawElement('section', 'next-steps');
  const containerNextSteps = drawElement('div', 'container');
  const nextStepsBlock = drawElement('div', `${nextSteps.className}__block`);
  const nextStepsHeader = drawElement('div');
  nextStepsHeader.innerHTML = showNextStepsHeader(nextStepsData, nextSteps);
  const nextStepsList = drawElement('ul', `${nextSteps.className}__list`);
  nextStepsList.innerHTML = nextStepsData.list.map((i) => showNextStepsListItem(i, nextStepsList.className)).join('');
  makeAppendChild(nextStepsBlock, nextStepsHeader, nextStepsList);
  makeAppendChild(containerNextSteps, nextStepsBlock, writeUsDraw(nextStepsData));
  makeAppendChild(nextSteps, containerNextSteps);
  makeAppendChild(nextStepsFragment, nextSteps);
};
aboutUsDraw(data.find((b) => b.id === 'aboutUs'));
latestPostDraw(data.find((b) => b.id === 'latestPost'));
latestPortfolioDraw(data.find((b) => b.id === 'latestPortfolio'));
testimonialsDraw(data.find((b) => b.id === 'testimonials'));
contactUsDraw(data.find((b) => b.id === 'contactUs'));
nextStepsDraw(data.find((b) => b.id === 'nextSteps'));
makeAppendChild(main, fragment, testimonialsFragment, containerContactUs, nextStepsFragment);
let selectedMenuItem = document.querySelector('.navigation--selected-menu-link');
const navigation = document.querySelector('.navigation__right-list');
navigation.addEventListener('click', (event) => {
  selectedMenuItem ? selectedMenuItem.classList.remove('navigation--selected-menu-link') : '';
  const link = event.target.closest('a');
  selectedMenuItem = link;
  selectedMenuItem.classList.add('navigation--selected-menu-link');
});
const toTop = document.querySelector('.to-top');
toTop.addEventListener('click', () => {
  selectedMenuItem ? selectedMenuItem.classList.remove('navigation--selected-menu-link') : '';
  const link = document.getElementById('homePage');
  link.classList.add('navigation--selected-menu-link');
  selectedMenuItem = link;
});
const latestPrortfolioSlide = Array.prototype.slice.call(document.querySelectorAll('.latest-portfolio__block'));
const latestPrortfolioSlideLeftPosition = [0];
const latestPortfolioSliderButton = document.querySelectorAll('.latest-portfolio__slider-size');
latestPrortfolioSlideLeftPosition[0] = 0;
for (let i = 1; i < latestPrortfolioSlide.length; i++) {
  latestPrortfolioSlideLeftPosition[i] = latestPrortfolioSlideLeftPosition[i - 1] + 34.5;
}
latestPrortfolioSlideLeftPosition[latestPrortfolioSlideLeftPosition.length - 1] = -34.5;
for (let i = 0; i < latestPrortfolioSlide.length; i++) {
  latestPrortfolioSlide[i].style.left = `${latestPrortfolioSlideLeftPosition[i]}%`;
}
latestPrortfolioSlide[latestPrortfolioSlide.length - 1].style.opacity = 0;
latestPrortfolioSlide[latestPrortfolioSlide.length - 2].style.opacity = 0;
latestPortfolioSliderButton[1].addEventListener('click', moveSlideToRight);
latestPortfolioSliderButton[0].addEventListener('click', moveSlideToLeft);
function moveSlide() {
  for (let i = 0; i < latestPrortfolioSlide.length; i++) {
    latestPrortfolioSlide[i].style.left = `${latestPrortfolioSlideLeftPosition[i]}%`;
    latestPrortfolioSlide[i].style.transition = 'left 0.7s, opacity 0.7s';
    (i < 3) ? latestPrortfolioSlide[i].style.opacity = 1 : latestPrortfolioSlide[i].style.opacity = 0;
  }
}
function moveSlideToRight() {
  latestPrortfolioSlide.push(latestPrortfolioSlide[0]);
  latestPrortfolioSlide.shift();
  moveSlide();
}
function moveSlideToLeft() {
  latestPrortfolioSlide.unshift(latestPrortfolioSlide[latestPrortfolioSlide.length - 1]);
  latestPrortfolioSlide.pop();
  moveSlide();
}
const stopSlider = () => clearInterval(autoSlider);
const autoSlider = setInterval(moveSlideToRight, 2000);
const latestPortfolioContainer = document.querySelector('.latest-portfolio__blocks');
latestPortfolioContainer.onmouseover = stopSlider;
latestPortfolioContainer.onmouseup = autoSlider;
latestPortfolioSliderButton.forEach((i) => i.addEventListener('mouseover', stopSlider));
// latestPortfolioSliderButton.forEach((i) => i.addEventListener('mouseout', autoSlider));
let startTouch = 0;
latestPortfolioContainer.addEventListener('touchstart', (e) => startTouch = e.changedTouches[0].pageX);
latestPortfolioContainer.addEventListener('touchend', makeSwipeSlider);
function makeSwipeSlider(e) {
  e.changedTouches[0].pageX - startTouch > 100 ? moveSlideToLeft() : moveSlideToRight();
}