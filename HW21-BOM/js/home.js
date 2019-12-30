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
function getHeaderTemplate(data) {
  return `<h2 class="header__ideas">${data.title}</h2>
        <p class="header__text">${data.text}</p>
        <div class="buttons">
        ${data.buttons.map((i) => getHeaderButtonTemplate(i)).join('')}
        <button class="header__item header--add-new-post" id="addNewPost">Add New Post</button>
        </div>`;
}
function getHeaderButtonTemplate(data) {
  return `<button class="buttons__item buttons--${data.description}">${data.name}</button>`;
}
function getSectionHeaderTemplate(data, section) {
  return `<h2 class="${section.className}__header">${data.title}</h2>
          <div class="${section.className}__header-underline"></div>
          <p class="${section.className}__text">${data.description}</p>`;
}
function getFolderTemplate(folder) {
  return `<section class="folder__${folder.name} folder--size">
            <svg class="folder__${folder.name}-icon">
              <use href="${folder.picture}"></use>
            </svg>
            <h4 class="folder__${folder.name}-header">${folder.title}</h4>
          </section>`;
}
function getVideoTemplate(video, section) {
  return `<video class="${section.className}__video-item" controls="controls" poster="${video.poster}" ><source src="${video.src}" type="video/mp4" /></video>`;
}
function getLatestPostsBlockTemplate(post, section) {
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
function getLatestPortfolioCardsTemplate(card, section) {
  return `<section class="${section.className}__block ${section.className}--${card.background}">
            <h3 class="${section.className}__block-header">${card.title}</h3>
            <p class="${section.className}__block-text">${card.text}</p>
          </section>`;
}
function getButtonSeeAllWorksTemplate(section) {
  return `<button class="${section.className}__button">${data[3].button}</button>`;
}
function getSectionHeaderTitleTemplate(data, section) {
  return `<h2 class="${section.className}__header">${data.title}</h2>
          <div class="${section.className}__header-underline"></div>`;
}
function getTestimonialsSliderTemplate(data, section) {
  return `<div class="${section.className}-slide">
            <div class="${section.className}-slide-quote">
              <h3 class="${section.className}-slide-quote-header">${data.quote}</h3>
              <p class="${section.className}-slide-quote-author">${data.author}</p>
              <p class="${section.className}-slide-quote-product">${data.position}</p>
            </div>
            <div class="${section.className}-slide-user">
                <img class="${section.className}-slide-user-photo" src="${data.photo}" alt="${data.photoDescription}" />
            </div>
          </div>`;
}
function getButtonsForTestimonialsSlider(testimonialsData, testimonialsSlider, side) {
  const sliderButton = drawElement('button', `${testimonialsSlider.className}-size`);
  sliderButton.innerHTML = getArrowButtonTemplate(testimonialsData, testimonialsSlider, side);
  return sliderButton;
}
function getSliderTabsTemplate(section, tabNumber) {
  return `<input type="radio" id="tab-${tabNumber}" class="${section.className}__tabs-item" name="testimonials-slide" />`;
}
function getArrowButtonTemplate(data, section, side) {
  return `<svg class="${section.className}-${side}-arrow"><use href="${data.arrowSign}"></use></svg>`;
}
function getCommunicateItemTemplate(section, item) {
  return `<a class="${section.className}__${item.name}" href="#">
            <svg class="${section.className}--${item.name}"><use href="${item.sign}"></use></svg>
          </a>`;
}
function getNextStepsHeaderTemplate(data, section) {
  return `<h2 class="${section.className}__header">${data.title}</h2>`;
}
function getNextStepsListItemTemplate(data, section) {
  return `<li class="${section}-item">
            <h4 class="${section}-item-header">${data.title}</h4>
            <p class="${section}-item-text">${data.text}</p>
          </li>`;
}
function getWriteUsTopTemplate(data, section) {
  return `<svg class="${section}__icon"><use href="${data.mailSign}"></use></svg>
          <h4 class="${section}__header">${data.text}</h4>`;
}
function getWriteUsFormTemplate(data, section) {
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
          </form>${getWriteUsTextInFormTemplate(data, section)}`;
}
function getWriteUsTextInFormTemplate(data, section) {
  return `<p class="${section}__text">${data.text}<a href="mailto:email@gmail.com" class="${section}--contact-email">${data.link}</a></p>`;
}
function getWriteUsMapTemplate(data, section) {
  return `<img class="${section}-picture" src="${data.map}" alt="map" />`;
}
const headerFragment = document.createDocumentFragment();
const headerContainer = document.querySelector('.header__block');
const wrapHeader = document.createElement('div');
wrapHeader.innerHTML = getHeaderTemplate(data.find((b) => b.id === 'header'));
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
  wrapAboutUsFolders.innerHTML = aboutUsData.folders.map((i) => getFolderTemplate(i)).join('');
  wrapAboutUsVideo.innerHTML = aboutUsData.video.map((i) => getVideoTemplate(i, sectionAboutUs)).join('');
  wrapAboutUs.innerHTML = getSectionHeaderTemplate(aboutUsData, sectionAboutUs);
  makeAppendChild(sectionAboutUs, wrapAboutUs, wrapAboutUsFolders, wrapAboutUsVideo);
  makeAppendChild(containerBeforeTestimonials, sectionAboutUs);
};
const latestPostDraw = function (latestPostsData) {
  const latestPosts = drawElement('section', 'latest-posts');
  const wrapLatestPostsHeader = drawElement('div');
  wrapLatestPostsHeader.innerHTML = getSectionHeaderTemplate(latestPostsData, latestPosts);
  const wrapLatestPostsBlocks = drawElement('div', `${latestPosts.className}__blocks`);
  wrapLatestPostsBlocks.innerHTML = latestPostsData.posts.map((i) => getLatestPostsBlockTemplate(i, latestPosts)).join('');
  makeAppendChild(latestPosts, wrapLatestPostsHeader, wrapLatestPostsBlocks);
  makeAppendChild(containerBeforeTestimonials, latestPosts);
};
const latestPortfolioDraw = function (latestPortfolioData) {
  const latestPortfolio = drawElement('section', 'latest-portfolio', 'latestPortfolio');
  const wrapLatestPortfolioHeader = drawElement('div');
  wrapLatestPortfolioHeader.innerHTML = getSectionHeaderTemplate(latestPortfolioData, latestPortfolio);
  const wrapLatestPortfolioCards = drawElement('div', `${latestPortfolio.className}__blocks`);
  wrapLatestPortfolioCards.innerHTML = latestPortfolioData.cards.map((i) => getLatestPortfolioCardsTemplate(i, latestPortfolio)).join('');
  const wrapPorfolioButtons = drawElement('div', `${latestPortfolio.className}__slider`);
  const leftButton = getButtonsForTestimonialsSlider(latestPortfolioData, wrapPorfolioButtons, 'left');
  const rightButton = getButtonsForTestimonialsSlider(latestPortfolioData, wrapPorfolioButtons, 'right');
  const wrapProtfolioButtonSeeAllWorks = drawElement('div');
  wrapProtfolioButtonSeeAllWorks.innerHTML = getButtonSeeAllWorksTemplate(latestPortfolio);
  makeAppendChild(wrapPorfolioButtons, leftButton, rightButton);
  makeAppendChild(latestPortfolio, wrapLatestPortfolioHeader, wrapLatestPortfolioCards, wrapPorfolioButtons, wrapProtfolioButtonSeeAllWorks);
  makeAppendChild(containerBeforeTestimonials, latestPortfolio);
};

const testimonialsFragment = document.createDocumentFragment();
const testimonialsDraw = function (testimonialsData) {
  const testimonials = drawElement('section', 'testimonials');
  const containerTestimonials = drawElement('div', 'container');
  const wraptestimonialsHeader = drawElement('div');
  wraptestimonialsHeader.innerHTML = getSectionHeaderTitleTemplate(testimonialsData, testimonials);
  const testimonialsSlider = drawElement('div', `${testimonials.className}__slider`);

  const leftButton = getButtonsForTestimonialsSlider(testimonialsData, testimonialsSlider, 'left');
  const rightButton = getButtonsForTestimonialsSlider(testimonialsData, testimonialsSlider, 'right');

  const slideList = drawElement('div');
  slideList.innerHTML = testimonialsData.slider.map((i) => getTestimonialsSliderTemplate(i, testimonialsSlider)).join('');

  const wrapSliderTabs = drawElement('div', `${testimonials.className}__tabs`);
  wrapSliderTabs.innerHTML = [getSliderTabsTemplate(testimonials, 0), getSliderTabsTemplate(testimonials, 1), getSliderTabsTemplate(testimonials, 2)].join('');

  makeAppendChild(testimonialsSlider, leftButton, slideList, rightButton);
  makeAppendChild(containerTestimonials, wraptestimonialsHeader, testimonialsSlider, wrapSliderTabs);
  makeAppendChild(testimonials, containerTestimonials);
  makeAppendChild(testimonialsFragment, testimonials);
};

const containerContactUs = drawElement('div', 'container');
const contactUsDraw = function (testimonialsData) {
  const contactUsFragment = document.createDocumentFragment();
  const contactUs = drawElement('section', 'contact-us', 'contactUs');
  const wrapContactUsHeader = drawElement('div');
  wrapContactUsHeader.innerHTML = getSectionHeaderTemplate(testimonialsData, contactUs);
  const wrapContactUsCommunicate = drawElement('div', `${contactUs.className}__communicate-form`);
  const contactUsCommunicate = drawElement('div', 'communicate');
  contactUsCommunicate.innerHTML = testimonialsData.communicate.map((i) => getCommunicateItemTemplate(contactUsCommunicate, i)).join('');
  makeAppendChild(contactUs, wrapContactUsHeader, wrapContactUsCommunicate);
  makeAppendChild(wrapContactUsCommunicate, contactUsCommunicate);
  makeAppendChild(contactUsFragment, contactUs);
  makeAppendChild(containerContactUs, contactUsFragment);
};
const nextStepsFragment = document.createDocumentFragment();
const getWriteUsDrawTemplate = function (writeUsData) {
  const writeUs = drawElement('div', 'write-us');
  const writeUsTop = drawElement('section', `${writeUs.className}__top`);
  writeUsTop.innerHTML = getWriteUsTopTemplate(writeUsData.writeUs[0].top[0], writeUs.className);
  const writeUsForm = drawElement('div', 'form-contact');
  writeUsForm.innerHTML = getWriteUsFormTemplate(writeUsData.writeUs[0].formField[0], writeUsForm.className);
  const writeUsMap = drawElement('div', `${writeUs.className}__map`);
  writeUsMap.innerHTML = getWriteUsMapTemplate(writeUsData.writeUs[0], writeUsMap.className);
  makeAppendChild(writeUs, writeUsTop, writeUsForm, writeUsMap);
  return writeUs;
};
const nextStepsDraw = function (nextStepsData) {
  const nextSteps = drawElement('section', 'next-steps');
  const containerNextSteps = drawElement('div', 'container');
  const nextStepsBlock = drawElement('div', `${nextSteps.className}__block`);
  const nextStepsHeader = drawElement('div');
  nextStepsHeader.innerHTML = getNextStepsHeaderTemplate(nextStepsData, nextSteps);
  const nextStepsList = drawElement('ul', `${nextSteps.className}__list`);
  nextStepsList.innerHTML = nextStepsData.list.map((i) => getNextStepsListItemTemplate(i, nextStepsList.className)).join('');
  makeAppendChild(nextStepsBlock, nextStepsHeader, nextStepsList);
  makeAppendChild(containerNextSteps, nextStepsBlock, getWriteUsDrawTemplate(nextStepsData));
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

