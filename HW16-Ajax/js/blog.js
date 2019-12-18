let data;
const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (xhttp.readyState === 4 && xhttp.status === 200) {
    data = JSON.parse(xhttp.responseText);
  }
};
xhttp.open('GET', 'js/blog.json', false);
xhttp.send();

const starSigns = ['#star1', '#group', '#star2'];

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
  const starList = [];
  for (let i = 1; i < 6; i++) {
    starList.push(showQuantityOfStarsItem(post, i));
  }
  return starList.join(' ');
}
function showQuantityOfStarsItem(post, number) {
  return `<svg class="feedback__block-info-star">
             <use href="${countQuantityOfStars(post, number)}"></use>
           </svg>`;
}
function countQuantityOfStars(post, i) {
  if (+post.stars >= i) {
    return starSigns[0];
  } else if (+post.stars === i - 0.5) {
    return starSigns[1];
  } else {
    return starSigns[2];
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
function isValidTitle() {
  if (this.value.length < 20 && this.value.length > 2) {
    validateLetters();
  } else if (this.value.length === 0) {
    title.classList.remove('form--invalid');
    titleValid = false;
  } else {
    title.classList.add('form--invalid');
    titleValid = false;
  }
  function validateLetters() {
    if (title.value.charCodeAt(0) >= 65 && title.value.charCodeAt(0) <= 90) {
      title.classList.remove('form--invalid');
      titleValid = true;
    }
  }
}
function drawFormForCreatePost(className) {
  return `<form id="createPostForm">
  <label class="${className}__header" for="typeOfPost">Type of post</label><select class="${className}__field" name="typeOfPost" id="typeOfPost"><option value="video">Video</option><option value="text">Text</option><option value="picture">Picture</option><option value="audio">Audio</option></select>
  <label class="${className}__header" for="userPhoto">Your Photo</label><input class="${className}__field" type="url" id="userPhoto" name="userPhoto" value="https://s.dou.ua/img/announces/new-epam-university-logo_dyXiHYR.png">
  <label class="${className}__header" for="titlePost">Title</label><input class="${className}__field" type="text" id="titlePost" name="titlePost">
  <label class="${className}__header" for="authorName">Author name</label><input class="${className}__field" type="text" id="authorName" name="authorName">
  <label class="${className}__header" for="datePost">Date</label><input class="${className}__field" type="date" id="datePost" name="datePost">
  <label class="${className}__header" for="descriptionPost">Description</label><input class="${className}__field" type="text" id="descriptionPost" name="descriptionPost">
  <label class="${className}__header" for="userQuote">Quote</label><input class="${className}__field" type="text" id="userQuote" name="userQuote"><div class="${className}__button">
  <input id="createPost" type="submit" class="${className}__button-item" value="Create post" /></div>
</form>`;
}
function showFormForCreatePost() {
  if (wrapFormCreatePost.className === 'form form--hidden') {
    wrapFormCreatePost.classList.remove('form--hidden');
    wrapFormCreatePost.classList.add('form--visible');
  } else if (wrapFormCreatePost.className === 'form form--visible') {
    wrapFormCreatePost.classList.remove('form--visible');
    wrapFormCreatePost.classList.add('form--hidden');
  }
  return wrapFormCreatePost;
}

const main = document.getElementById('main');

const wrapFormCreatePost = drawElement('div', 'form');
wrapFormCreatePost.classList.add('form--hidden');
wrapFormCreatePost.innerHTML = drawFormForCreatePost('form');
makeAppendChild(main, wrapFormCreatePost);

const addNewPostButton = document.getElementById('addNewPost');
addNewPostButton.addEventListener('click', showFormForCreatePost);

const sendCreatePostRequest = (body) => {
  const URL = 'http://127.0.0.1:3000/api/create-article';
  fetch(URL, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    mode: 'cors',
    body,
  })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    })

    .then((response) => response.json())
    .then((json) => {
      const allPosts = Array.from(json);
      const currentPost = allPosts.find((post) => post.id === JSON.parse(body).id);
      localStorage.setItem('current-post', currentPost.id);
      location.href = 'post.html';
    })
    .catch((error) => {
      alert(`invalid input, object invalid ${error}`);
    });
};

const onSubmit = (e) => {
  e.preventDefault();

  const id = Math.floor(Math.random() * 1000000000);
  const type = e.target.typeOfPost.value;
  const photo = e.target.userPhoto.value;
  const title = e.target.titlePost.value;
  const name = e.target.authorName.value;
  const date = e.target.datePost.value;
  const description = e.target.descriptionPost.value;
  const quote = e.target.userQuote.value;

  titleValid ? sendCreatePostRequest(JSON.stringify({id, type, photo, title, name, date, description, quote})) : '';
};

const title = document.getElementById('titlePost');
title.addEventListener('change', isValidTitle);
let titleValid = false;

const form = document.getElementById('createPostForm');
form.addEventListener('submit', onSubmit);

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
  bottomButtonDraw(data.find((b) => b.id === 'bottomButton')),
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

// const readMoreButtons = document.querySelectorAll('.feedback__read-more');
// readMoreButtons.forEach(i => i.addEventListener('click', openThisPost));
// function openThisPost(e) {
//   e.preventDefault();
//   let postData = data.find(i => i.id === 'post');
//   console.log(postData);
//   console.log(e.path[1]);
// }