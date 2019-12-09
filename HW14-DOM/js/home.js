let data;
function loadJSON(callback) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      callback(xhttp.responseText);
    }
  };
  xhttp.open('GET', 'js/home.json', false);
  xhttp.send();
}
loadJSON((response) => {
  data = JSON.parse(response);
});
function drawElement(tag, createClass, createId) {
  const element = document.createElement(tag);
  if (createClass) {
    element.classList.add(createClass);
  }
  if (createId) {
    element.setAttribute('id', createId);
  }
  return element;
}
function makeAppendChild(parent) {
  for (let i = 1; i < arguments.length; i++) {
    parent.appendChild(arguments[i]);
  }
}
const headerFragment = document.createDocumentFragment();
const headerContainer = document.querySelector('.header--container');
const wrapHeader = document.createElement('div');
wrapHeader.innerHTML = showHeader(data[0]);
makeAppendChild(headerFragment, wrapHeader);
makeAppendChild(headerContainer, headerFragment);
function showHeader(data) {
  return `
        <h2 class="header__ideas">${data.title}</h2>
        <p class="header__text">${data.text}</p>
        <div class="buttons">
        ${data.buttons.map((i) => showHeaderButton(i)).join('')}
        </div>
    `;
}
function showHeaderButton(data) {
  return `
    <button class="buttons__item buttons--${data.description}">${data.name}</button>
    `;
}
const main = document.getElementById('main');
const fragment = document.createDocumentFragment();
const containerBeforeTestimonials = drawElement('div', 'container');
makeAppendChild(fragment, containerBeforeTestimonials);
const sectionAboutUs = drawElement('section', 'about-us', 'aboutUs');
const wrapAboutUsFolders = drawElement('div', 'folder');
const wrapAboutUsVideo = drawElement('div', `${sectionAboutUs.className}__video`);
const wrapAboutUs = document.createElement('div');
const aboutUsFolders = data[1].folders.map((i) => showFolder(i)).join('');
const aboutUsVideo = data[1].video.map((i) => showVideo(i, sectionAboutUs)).join('');
const aboutUsSection = showSectionHeader(data[1], sectionAboutUs);
wrapAboutUsFolders.innerHTML = aboutUsFolders;
wrapAboutUsVideo.innerHTML = aboutUsVideo;
wrapAboutUs.innerHTML = aboutUsSection;
makeAppendChild(sectionAboutUs, wrapAboutUs, wrapAboutUsFolders, wrapAboutUsVideo);
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
  return `<video class="${section.className}__video-item" controls="controls" poster="${video.poster}" >
            <source src="${video.src}" type="video/mp4" />
          </video>`;
}
const latestPosts = drawElement('section', 'latest-posts');
const latestPostsHeader = showSectionHeader(data[2], latestPosts);
const wrapLatestPostsHeader = drawElement('div');
wrapLatestPostsHeader.innerHTML = latestPostsHeader;
const wrapLatestPostsBlocks = drawElement('div', `${latestPosts.className}__blocks`);
const latestPostsBlock = data[2].posts.map((i) => showLatestPostsBlock(i, latestPosts)).join('');
wrapLatestPostsBlocks.innerHTML = latestPostsBlock;
makeAppendChild(latestPosts, wrapLatestPostsHeader, wrapLatestPostsBlocks);
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
const latestPortfolio = drawElement('section', 'latest-portfolio', 'latestPortfolio');
const latestPortfolioHeader = showSectionHeader(data[3], latestPortfolio);
const wrapLatestPortfolioHeader = drawElement('div');
wrapLatestPortfolioHeader.innerHTML = latestPortfolioHeader;
const wrapLatestPortfolioCards = drawElement('div', `${latestPortfolio.className}__blocks`);
const latestPortfolioCards = data[3].cards.map((i) => showLatestPortfolioCards(i, latestPortfolio)).join('');
wrapLatestPortfolioCards.innerHTML = latestPortfolioCards;
function showLatestPortfolioCards(card, section) {
  return `<section class="${section.className}__block ${section.className}--${card.background}">
            <h3 class="${section.className}__block-header">${card.title}</h3>
            <p class="${section.className}__block-text">${card.text}</p>
          </section>`;
}
const wrapPorfolioButtons = drawElement('div', `${latestPortfolio.className}__slider`);
const portfolioButton = showPortfolioButtons(data[3], wrapPorfolioButtons);
wrapPorfolioButtons.innerHTML = portfolioButton;
const wrapProtfolioButtonSeeAllWorks = drawElement('div');
wrapProtfolioButtonSeeAllWorks.innerHTML = showButtonSeeAllWorks(latestPortfolio);
function showPortfolioButtons(data, section) {
  return `${arrowButton(data, section, 'left')}
          ${arrowButton(data, section, 'right')}`;
}
function showButtonSeeAllWorks(section) {
  return `<button class="${section.className}__button">${data[3].button}</button>`;
}
makeAppendChild(latestPortfolio, wrapLatestPortfolioHeader, wrapLatestPortfolioCards, wrapPorfolioButtons, wrapProtfolioButtonSeeAllWorks);
const testimonialsFragment = document.createDocumentFragment();
const testimonials = drawElement('section', 'testimonials');
const containerTestimonials = drawElement('div', 'container');
const wraptestimonialsHeader = drawElement('div');
wraptestimonialsHeader.innerHTML = showSectionHeaderTitle(data[4], testimonials);
const sliderBlock = drawElement('div');
const testimonialsSlider = drawElement('div', `${testimonials.className}__slider`);
testimonialsSlider.innerHTML = showTestimonialsSlider(data[4], testimonialsSlider);
makeAppendChild(containerTestimonials, wraptestimonialsHeader, sliderBlock);
makeAppendChild(testimonials, containerTestimonials);
makeAppendChild(sliderBlock, testimonialsSlider);
makeAppendChild(testimonialsFragment, testimonials);
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
          </div>
          ${arrowButton(data, section, 'right')}`;
}
function arrowButton(data, section, side) {
  return `<div class="${section.className}-size">
            <svg class="${section.className}-${side}-arrow">
              <use href="${data.arrowSign}"></use>
            </svg>
          </div>`;
}
const containerContactUs = drawElement('div', 'container');
const contactUsFragment = document.createDocumentFragment();
const contactUs = drawElement('section', 'contact-us', 'contactUs');
const wrapContactUsHeader = drawElement('div');
wrapContactUsHeader.innerHTML = showSectionHeader(data[5], contactUs);
const wrapContactUsCommunicate = drawElement('div', `${contactUs.className}__communicate-form`);
const contactUsCommunicate = drawElement('div', 'communicate');
contactUsCommunicate.innerHTML = data[5].communicate.map((i) => showCommunicateItem(contactUsCommunicate, i)).join('');
makeAppendChild(contactUs, wrapContactUsHeader, wrapContactUsCommunicate);
makeAppendChild(wrapContactUsCommunicate, contactUsCommunicate);
makeAppendChild(contactUsFragment, contactUs);
makeAppendChild(containerContactUs, contactUsFragment);
function showCommunicateItem(section, item) {
  return `<a class="${section.className}__${item.name}" href="#">
            <svg class="${section.className}--${item.name}">
              <use href="${item.sign}"></use>
            </svg>
           </a>`;
}
const nextStepsFragment = document.createDocumentFragment();
const nextSteps = drawElement('section', 'next-steps');
const containerNextSteps = drawElement('div', 'container');
const nextStepsBlock = drawElement('div', `${nextSteps.className}__block`);
const nextStepsHeader = drawElement('div');
nextStepsHeader.innerHTML = showNextStepsHeader(data[6], nextSteps);
const nextStepsList = drawElement('ul', `${nextSteps.className}__list`);
nextStepsList.innerHTML = data[6].list.map((i) => showNextStepsListItem(i, nextStepsList.className)).join('');
const writeUs = drawElement('div', 'write-us');
const writeUsTop = drawElement('section', `${writeUs.className}__top`);
writeUsTop.innerHTML = showWriteUsTop(data[6].writeUs[0].top[0], writeUs.className);
const writeUsForm = drawElement('div', 'form');
writeUsForm.innerHTML = showWriteUsForm(data[6].writeUs[0].formField[0], writeUsForm.className);
const writeUsMap = drawElement('div', `${writeUs.className}__map`);
writeUsMap.innerHTML = showWriteUsMap(data[6].writeUs[0], writeUsMap.className);
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
  return `<svg class="${section}__icon">
            <use href="${data.mailSign}"></use>
          </svg>
          <h4 class="${section}__header">${data.text}</h4>`;
}
function showWriteUsForm(data, section) {
  return `<form method="POST">
            <label class="${section}__header" for="userName">${data.name}</label>
            <input class="${section}__field" id="userName" type="text" name="user-name" />
            <label class="${section}__header" for="userMail">${data.email}</label>
            <input class="${section}__field" id="userMail" type="email" name="user-mail" />
            <label class="${section}__header ${section}--password-header" for="userPassword">${data.password}
            </label>
            <input class="${section}__field" id="userPassword" type="password" name="user-password" />
            <div class="${section}--show-pass">
              <input class="${section}--show-pass-check" id="showUnshow" type="checkbox" />
              <label for="showUnshow" class="${section}--show-pass-text">${data.show}</label>
            </div>
            <input type="submit" class="${section}__button" value="Send message" />
          </form>
          ${showWriteUsTextInForm(data, section)}`;
}
function showWriteUsTextInForm(data, section) {
  return `<p class="${section}__text">${data.text}
            <a href="mailto:email@gmail.com" class="${section}--contact-email">${data.link}</a>
          </p>`;
}
function showWriteUsMap(data, section) {
  return `<img class="${section}-picture" src="${data.map}" alt="map" />`;
}
makeAppendChild(nextStepsBlock, nextStepsHeader, nextStepsList);
makeAppendChild(containerNextSteps, nextStepsBlock);
makeAppendChild(writeUs, writeUsTop, writeUsForm, writeUsMap);
makeAppendChild(containerNextSteps, writeUs);
makeAppendChild(nextSteps, containerNextSteps);
makeAppendChild(nextStepsFragment, nextSteps);
makeAppendChild(containerBeforeTestimonials, sectionAboutUs, latestPosts, latestPortfolio);
makeAppendChild(main, fragment, testimonialsFragment, containerContactUs, nextStepsFragment);
let selectedMenuItem = document.querySelector('.navigation--selected-menu-link');
const navigation = document.querySelector('.navigation__right-list');
navigation.addEventListener('click', (event) => {
  if (selectedMenuItem) {
    selectedMenuItem.classList.remove('navigation--selected-menu-link');
  }
  const link = event.target.closest('a');
  selectedMenuItem = link;
  selectedMenuItem.classList.add('navigation--selected-menu-link');
});
const toTop = document.querySelector('.to-top');
toTop.addEventListener('click', () => {
  if (selectedMenuItem) {
    selectedMenuItem.classList.remove('navigation--selected-menu-link');
  }
  const link = document.getElementById('homePage');
  link.classList.add('navigation--selected-menu-link');
  selectedMenuItem = link;
});