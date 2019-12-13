let data;
const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (xhttp.readyState === 4 && xhttp.status === 200) {
    data = JSON.parse(xhttp.responseText);
  }
};
xhttp.open('GET', 'js/blog.json', false);
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
function showBlogHeader(data, section) {
  return `<h2 class="${section}__header">${data.title}</h2>
          <div class="${section}__header-underline"></div>`;
}
function showBlogSearch(data, section) {
  return `<input class="${section}-field" id="searchField" type="search" placeholder="Search by author" />
            <label class="${section}-item" for="searchField">
              <svg class="${section}-icon">
                <use href="${data.searchIcon}"></use>
              </svg>
            </label>`;
}
function showSearchDropdownItem(i, section) {
  return `<div class="${section}-item">
            <img class="${section}-item-picture" src="${i.photo}" alt="${i.descriptionPhoto}" />
            <p class="${section}-item-text">${i.name}</p>
          </div>`;
}
function showQuantityOfStars(post) {
  return `<svg class="feedback__block-info-star">
            <use href="${countQuantityOfStars(post, 1)}"></use>
          </svg>
          <svg class="feedback__block-info-star">
            <use href="${countQuantityOfStars(post, 2)}"></use>
          </svg>
          <svg class="feedback__block-info-star">
            <use href="${countQuantityOfStars(post, 3)}"></use>
          </svg>
          <svg class="feedback__block-info-star">
            <use href="${countQuantityOfStars(post, 4)}"></use>
          </svg>
          <svg class="feedback__block-info-star">
            <use href="${countQuantityOfStars(post, 5)}"></use>
          </svg>
    `;
}
function countQuantityOfStars(post, i) {
  if (+post.stars >= i) {
    return post.starSign;
  } else if (+post.stars === i - 0.5) {
    return post.signHalf;
  } else {
    return post.signEmpty;
  }
}
function showRightTypeOfMedia(post) {
  if (post.mediaType === 'video') {
    return `<video class="post--video" controls="controls" poster="${post.poster}">
              <source src="${post.src}" type="video/mp4" />
            </video>`;
  } else {
    return `<img class="post__picture-item" src="${post.src}" alt="${post.srcDescription}" />`;
  }
}
function isAudio(post) {
  if (post.audio) {
    return `<audio class="feedback__audio" src="${post.audio}" controls></audio>`;
  } else {
    return '';
  }
}
function showLatestPostsBlock(post) {
  return `<div class="post">
            <div class="post__picture">${showRightTypeOfMedia(post)}</div>
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
                ${showQuantityOfStars(post)}
              </div>
            </div>
            <h3 class="feedback__header">${post.title}</h3>
            ${isAudio(post)}
            <p class="feedback__text">${post.text}</p>
            <button class="feedback__read-more">${post.button}</button>
          </section>
        </div>`;
}
function showWholePostsBlock(post) {
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
                    ${showQuantityOfStars(post)}
                </div>
            </div>
            <h3 class="whole-feedback__header">${post.title}</h3>
            ${isAudio(post)}
            <p class="whole-feedback__text">${post.text}</p>
            <button class="whole-feedback__read-more">${post.button}</button></section>`;
}
function showBottomBlogButton(data, section) {
  return `<button class="${section}__button">${data.bottomPageButton}</button>`;
}

const main = document.getElementById('main');

const headerDraw = function (headerData) {
  const blogFragment = document.createDocumentFragment();
  const blog = drawElement('section', 'blog');
  const wrapBlogHeader = drawElement('div');
  wrapBlogHeader.innerHTML = showBlogHeader(headerData, blog.className);
  const blogSearchBlock = drawElement('div', `${blog.className}__search`);
  blogSearchBlock.innerHTML = showBlogSearch(headerData, blogSearchBlock.className);
  const blogSearchDropdown = drawElement('div', `${blogSearchBlock.className}-dropdown`);
  blogSearchDropdown.innerHTML = headerData.dropDown.map((i) => showSearchDropdownItem(i, blogSearchDropdown.className)).join('');
  makeAppendChild(blogSearchBlock, blogSearchDropdown);
  makeAppendChild(blog, wrapBlogHeader, blogSearchBlock);
  makeAppendChild(blogFragment, blog);
  return blogFragment;
};
const postDraw = function (postData) {
  const postsFragment = document.createDocumentFragment();
  const postsBlock = drawElement('div');
  postsBlock.innerHTML = postData.posts.map((i) => showLatestPostsBlock(i)).join('');
  makeAppendChild(postsFragment, postsBlock);
  return postsFragment;
};
const wholePostDraw = function (wholePostData) {
  const wholePostFragment = document.createDocumentFragment();
  const wholePostsBlock = drawElement('div');
  wholePostsBlock.innerHTML = wholePostData.wholePosts.map((i) => showWholePostsBlock(i)).join('');
  makeAppendChild(wholePostFragment, wholePostsBlock);
  return wholePostFragment;
};
const bottomButtonDraw = function (bottomButtonData) {
  const bottomButtonFragment = document.createDocumentFragment();
  const wrapBlogButton = drawElement('div', 'read-more');
  wrapBlogButton.innerHTML = showBottomBlogButton(bottomButtonData, wrapBlogButton.className);
  makeAppendChild(bottomButtonFragment, wrapBlogButton);
  return bottomButtonFragment;
};

makeAppendChild(main,
  headerDraw(data.find((b) => b.id === 'header')),
  postDraw(data.find((b) => b.id === 'post')),
  wholePostDraw(data.find((b) => b.id === 'wholePost')),
  bottomButtonDraw(data.find((b) => b.id === 'bottomButton'))
);

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
  const link = document.getElementById('blogPage');
  link.classList.add('navigation--selected-menu-link');
  selectedMenuItem = link;
});
