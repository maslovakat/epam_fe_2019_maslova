let data;
const starSigns = ['#star1', '#group', '#star2'];

const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (xhttp.readyState === 4 && xhttp.status === 200) {
    data = JSON.parse(xhttp.responseText);
  }
};
xhttp.open('GET', 'js/blog.json', false);
xhttp.send();

async function renderArticleFromJSON() {
  try {
    const response = await fetch('../../server/config/articles.json');
    let article;
    if (response.ok) {
      article = await response.json();
    }
    makeAppendChild(main,
      headerDraw(data.find((b) => b.id === 'header')),
      createPostInstances(article),
      createWholePostInstances(article),
      bottomButtonDraw(data.find((b) => b.id === 'bottomButton')),
    );
    readMoreButtonRedirect(article);
  } catch (err) {
    console.warn(err);
  }
}
renderArticleFromJSON();

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
function getBlogHeaderTemplate(data, section) {
  return `<h2 class="${section}__header">${data.title}</h2>
          <div class="${section}__header-underline"></div>`;
}
function getBlogSearchTemplate(data, section) {
  return `<input class="${section}-field" id="searchField" type="search" placeholder="Search by author" />
            <label class="${section}-item" for="searchField">
              <svg class="${section}-icon">
                <use href="${data.searchIcon}"></use>
              </svg>
            </label>`;
}
function getSearchDropdownItemTemplate(i, section) {
  return `<div class="${section}-item">
            <img class="${section}-item-picture" src="${i.photo}" alt="${i.descriptionPhoto}" />
            <p class="${section}-item-text">${i.name}</p>
          </div>`;
}
function getBottomBlogButtonTemplate(data, section) {
  return `<button class="${section}__button">${data.bottomPageButton}</button>`;
}
function createPostInstances(post) {
  const postsFragment = document.createDocumentFragment();
  for (let i = 0; i < 3; i++) {
    const postTemplate = new Post(post[i]);
    postsFragment.appendChild(postTemplate.render());
  }
  return postsFragment;
}
function createWholePostInstances(wholePost) {
  const wholePostsFragment = document.createDocumentFragment();
  for (let i = 3; i < 4; i++) {
    const postTemplate = new WholePost(wholePost[i]);
    wholePostsFragment.appendChild(postTemplate.render());
  }
  return wholePostsFragment;
}

const main = document.getElementById('main');

const headerDraw = function (headerData) {
  const blogFragment = document.createDocumentFragment();
  const blog = drawElement('section', 'blog');
  const wrapBlogHeader = drawElement('div');
  wrapBlogHeader.innerHTML = getBlogHeaderTemplate(headerData, blog.className);
  const blogSearchBlock = drawElement('div', `${blog.className}__search`);
  blogSearchBlock.innerHTML = getBlogSearchTemplate(headerData, blogSearchBlock.className);
  const blogSearchDropdown = drawElement('div', `${blogSearchBlock.className}-dropdown`);
  blogSearchDropdown.innerHTML = headerData.dropDown.map((i) => getSearchDropdownItemTemplate(i, blogSearchDropdown.className)).join('');
  makeAppendChild(blogSearchBlock, blogSearchDropdown);
  makeAppendChild(blog, wrapBlogHeader, blogSearchBlock);
  makeAppendChild(blogFragment, blog);
  return blogFragment;
};

class Post {
  constructor(postList) {
    this.postList = postList;
  }
  getAudioTemplateIfExist(post) {
    if (post.audio) {
      return `<audio class="feedback__audio" src="${post.audio}" controls></audio>`;
    } else {
      return '';
    }
  }
  countQuantityOfStars(post, i) {
    if (+post.stars >= i) {
      return starSigns[0];
    } else if (+post.stars === i - 0.5) {
      return starSigns[1];
    } else {
      return starSigns[2];
    }
  }
  getQuantityOfStars(post) {
    const starList = [];
    for (let i = 1; i < 6; i++) {
      starList.push(this.getQuantityOfStarsItemTemplate(post, i));
    }
    return starList.join(' ');
  }
  getQuantityOfStarsItemTemplate(post, number) {
    return `<svg class="feedback__block-info-star">
               <use href="${this.countQuantityOfStars(post, number)}"></use>
             </svg>`;
  }
  getRightTypeOfMediaTemplate(post) {
    if (post.mediaType === 'video') {
      return `<video class="post--video" controls="controls" poster="${post.poster}">
                <source src="${post.src}" type="video/mp4" />
              </video>`;
    } else {
      return `<img class="post__picture-item" src="${post.poster}" alt="${post.srcDescription}" />`;
    }
  }
  getPostTemplate(post) {
    return `<div class="post">
             <div class="post__picture">${this.getRightTypeOfMediaTemplate(post)}</div>
             <section class="feedback feedback--${post.mediaTypeSign}">
               <img class="feedback__user-photo" src="${post.userPhoto}" alt="${post.name} photo" />
               <div class="feedback__block">
               <h4 class="feedback__block-header">${post.name}</h4>
               <div class="feedback__block-info">
                 <p class="feedback__block-info-date">${post.date}</p>
                 <p class="feedback__block-info-read">${post.read}</p>
                 <svg class="feedback__block-info-comments-icon">
                   <use href="${post.commentSign}"></use>
                 </svg>
                 <p class="feedback__block-info-comments">${post.comments}</p>
                 ${this.getQuantityOfStars(post)}
               </div>
             </div>
             <h3 class="feedback__header">${post.title}</h3>
             ${this.getAudioTemplateIfExist(post)}
             <p class="feedback__text">${post.text}</p>
             <button class="feedback__read-more">${post.button}</button>
           </section>
         </div>`;
  }
  render() {
    const postsBlock = drawElement('div');
    postsBlock.innerHTML = this.getPostTemplate(this.postList);
    return postsBlock;
  }
}

class WholePost extends Post {
  getPostTemplate(post) {
    return `<section class="whole-feedback whole-feedback--${post.mediaTypeSign}">
              <img class="whole-feedback__user-photo" src="${post.userPhoto}" alt="${post.name}" />
              <div class="whole-feedback__block">
                  <h4 class="whole-feedback__block-header">${post.name}</h4>
                  <div class="whole-feedback__block-info">
                      <p class="whole-feedback__block-info-date">${post.date}</p>
                      <p class="whole-feedback__block-info-read">${post.read}</p>
                      <svg class="whole-feedback__block-info-comments-icon">
                          <use href="${post.commentSign}"></use>
                      </svg>
                      <p class="whole-feedback__block-info-comments">${post.comments}</p>
                      ${this.getQuantityOfStars(post)}
                  </div>
              </div>
              <h3 class="whole-feedback__header">${post.title}</h3>
              ${this.getAudioTemplateIfExist(post)}
              <p class="whole-feedback__text">${post.text}</p>
              <button class="whole-feedback__read-more">${post.button}</button></section>`;
  }
}

const bottomButtonDraw = function (bottomButtonData) {
  const bottomButtonFragment = document.createDocumentFragment();
  const wrapBlogButton = drawElement('div', 'read-more');
  wrapBlogButton.innerHTML = getBottomBlogButtonTemplate(bottomButtonData, wrapBlogButton.className);
  makeAppendChild(bottomButtonFragment, wrapBlogButton);
  return bottomButtonFragment;
};

function readMoreButtonRedirect() {
  const readMoreButtons = document.querySelectorAll('.feedback__read-more');
  const readMoreButtonsWholePost = document.querySelector('.whole-feedback__read-more');
  for (let i = 0; i < readMoreButtons.length; i++) {
    readMoreButtons[i].addEventListener('click', () => {
      location.href = `post.html?id=${i + 1}`;
    });
  }
  readMoreButtonsWholePost.addEventListener('click', () => {
    location.href = `post.html?id=${4}`;
  });
}