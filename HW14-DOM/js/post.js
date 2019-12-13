let data;
const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (xhttp.readyState === 4 && xhttp.status === 200) {
    data = JSON.parse(xhttp.responseText);
  }
};
xhttp.open('GET', 'js/post.json', false);
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
function showFeedback(i, section) {
  return `<img class="${section}__user-photo" src="${i.userPhoto}" alt="${i.name} user" />
          <div class="${section}__block">
            <h4 class="${section}__block-header">${i.name}</h4>
            <div class="${section}__block-info">
                <p class="${section}__block-info-date">${i.date}</p>
                <p class="${section}__block-info-read">${i.read}</p>
                <svg class="${section}__block-info-comments-icon">
                    <use href="${i.commentSign}"></use>
                </svg>
                <p class="${section}__block-info-comments">${i.comments}</p>
                ${showQuantityOfStars(i)}
            </div>
        </div>
        <div class="${section}__picture">
            <img class="${section}__picture-item" src="${i.src}" alt="${i.srcDescription}" />
        </div>
        ${isAudio(i)}
        <p class="${section}__text"> ${i.text1}
              <span class="${section}__text-marked">${i.text1Marked}</span>
            ${i.text2}
        </p>
        <p class="${section}__text">${i.text3}</p>
        <p class="${section}__text">${i.text4}
              <span class="${section}__text-marked">${i.text4Marked}</span>
              ${i.text5}
        </p>
        <h3 class="${section}__header">${i.title1}</h3>
        <p class="${section}__text">${i.text6}</p>
        <p class="${section}__text">${i.text7}
              <span class="${section}__text-line-through">${i.text7LineThrough}</span>
              ${i.text8}
            </p>
        <blockquote class="${section}__quote">
            <span class="${section}__text-marked">${i.blockquoteMarked}</span>
            ${i.blockquote}
        </blockquote>
        <h3 class="${section}__header">${i.title2}</h3>
        <p class="${section}__text">
        ${i.text9}
              <a class="${section}__text-replace" href="#">${i.text9Linked}</a> 
              ${i.text10}
            </p>`;
}
function showLikes(i, section) {
  return `<input type="checkbox" class="${section}__hidden" id="likeChanger" />
          <label class="${section}__icon" for="likeChanger"></label>
          <span class="${section}__quantity">${i.likes} likes</span>`;
}
function showCommunicate(i, section) {
  return `<a class="${section}__${i.name}" href="${i.link}">
            <svg class="${section}--${i.name}">
                <use href="${i.sign}"></use>
            </svg>
          </a>`;
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
function isAudio(post) {
  if (post.audio) {
    return `<audio class="feedback__audio" src="${post.audio}" controls></audio>`;
  } else {
    return '';
  }
}
function showReviewsHeader(i, section) {
  return `<h2 class="${section}__header">${i.title}</h2>
          <div class="${section}__line"></div>`;
}
function showReview(i) {
  return `<section class="review review--${i.author}">
            <div class="review__user-photo">
                <img class="review__user-photo-item" src="${i.userPhoto}" alt="${i.name} photo" />
            </div>
            <div class="review__name">
                <h3 class="review__header">${i.name}</h3>
                ${showQuantityOfStars(i)}
            </div>
            <div class="review__time">
                <svg class="review__clock">
                    <use href="${i.timeSign}"></use>
                </svg>
                <h5 class="review__time-ago">${i.timeAgo}</h5>
            </div>
            <p class="review__text">${i.text}</p>
            <a class="review__read" href="#">${i.openFull}</a>
          </section>`;
}
function showMoreCommentsButton(i, section) {
  return `<button class="${section}__more-comments">${i}</button>`;
}
function showRightSideHeader(i, section) {
  return `<h2 class="${section}__header">${i}</h2>`;
}
function showRightSidePost(i, section) {
  return `<div class="${section}__post">
            <div class="${section}__picture">
                <img class="${section}__picture-item" src="${i.picture}" alt="${i.pictureDescription}" />
            </div>
            <div class="${section}__text-block">
                <a class="${section}__text-block-header" href="${i.link}">${i.text}</a>
                <div class="${section}__block-info">
                    <p class="${section}__block-info-date">${i.date}</p>
                    <p class="${section}__block-info-read">${i.read}</p>
                    <svg class="${section}__block-info-comments-icon">
                        <use href="${i.commentSign}"></use>
                    </svg>
                    <p class="${section}__block-info-comments">${i.comments}</p>
                </div>
            </div>
          </div>`;
}
function showRightSideCategory(i, section) {
  return `<section class="${section}">
            <div class="${section}__header">${i.name} (${i.categoryAll.length})
                <input class="${section}__check-hidden" id="${i.id}" type="checkbox" />
                <label class="${section}__header-arrow" for="${i.id}">
                    <svg class="${section}__header-arrow-item">
                        <use href="${i.sign}"></use>
                    </svg>
                </label>
                <div class="${section}__hidden-block">
                ${showHiddenCategoryItem(i.categoryAll, section)}
                </div>
            </div>
        </section>`;
}
function showHiddenCategoryItem(category, section) {
  let categoryItem = '';
  for (let i = 0; i < category.length; i++) {
    categoryItem += `<h5 class="${section}__hidden-block-item">${category[i].name}</h5>`;
  }
  return categoryItem;
}
function showRightSideTag(i, section) {
  return `<button class="${section}__item">${i.name}</button>`;
}

const main = document.getElementById('main');
const leftSideFragment = document.createDocumentFragment();
const leftSide = drawElement('section', 'main__left');

const leftSIdeTitleDraw = function (feedbackData) {
  const leftSideTitle = drawElement('h2', 'main__left-header');
  leftSideTitle.innerText = feedbackData.title;
  return leftSideTitle;
};

const feedbackDraw = function (feedbackData) {
  const feedback = drawElement('section', 'feedback');
  feedback.innerHTML = feedbackData.feedback.map((i) => showFeedback(i, feedback.className)).join('');
  const likesAndCommunicate = drawElement('div', 'likes-and-communicate');
  const likes = drawElement('div', 'likes');
  likes.innerHTML = showLikes(feedbackData.feedback[0], likes.className);
  const communicate = drawElement('div', 'communicate');
  communicate.innerHTML = feedbackData.feedback[0].communicate.map((i) => showCommunicate(i, communicate.className)).join('');
  makeAppendChild(likesAndCommunicate, likes, communicate);
  makeAppendChild(leftSide, feedback, likesAndCommunicate);
};

const reviews = drawElement('section', 'reviews');
const reviewsDraw = function (reviewData) {
  const wrapReviewsHeader = drawElement('div');
  wrapReviewsHeader.innerHTML = showReviewsHeader(reviewData.reviews[0], reviews.className);
  const wrapReview = drawElement('div');
  wrapReview.innerHTML = reviewData.reviews[0].reviewBlocks.map((i) => showReview(i)).join('');
  makeAppendChild(reviews, wrapReviewsHeader, wrapReview);
  return reviews;
};

const wrapMoreComments = drawElement('div');
const moreCommentsDraw = function (reviewData) {
  wrapMoreComments.innerHTML = showMoreCommentsButton(reviewData.button, reviews.className);
  return wrapMoreComments;
};
reviewsDraw(data.find((b) => b.id === 'review'));
moreCommentsDraw(data.find((b) => b.id === 'review'));
makeAppendChild(leftSide, leftSIdeTitleDraw(data.find((b) => b.id === 'feedback')));
feedbackDraw(data.find((b) => b.id === 'feedback'));
makeAppendChild(leftSide, reviews, wrapMoreComments);
makeAppendChild(leftSideFragment, leftSide);
// makeAppendChild(main, leftSideFragment);

const rightSideFragment = document.createDocumentFragment();
const rightSide = drawElement('aside', 'main__right');

const latestPostsDraw = function (latestPostsData) {
  const latestPosts = drawElement('section', 'latest-posts');
  const wrapeLatestPostsHeader = drawElement('div');
  wrapeLatestPostsHeader.innerHTML = showRightSideHeader(latestPostsData.latestPost[0].title, latestPosts.className);
  const latestPost = drawElement('div');
  latestPost.innerHTML = latestPostsData.latestPost[0].posts.map((i) => showRightSidePost(i, latestPosts.className)).join('');
  makeAppendChild(latestPosts, wrapeLatestPostsHeader, latestPost);
  return latestPosts;
};
const categoriesDraw = function (categoriesData) {
  const categories = drawElement('section', 'categories');
  const wrapeCategoriesHeader = drawElement('div');
  wrapeCategoriesHeader.innerHTML = showRightSideHeader(categoriesData.categories[0].title, categories.className);
  const category = drawElement('div', 'category');
  category.innerHTML = categoriesData.categories[0].category.map((i) => showRightSideCategory(i, category.className)).join('');
  makeAppendChild(categories, wrapeCategoriesHeader, category);
  return categories;
};
const tagsDraw = function (tagsData) {
  const tags = drawElement('section', 'tags');
  const wrapeTagsHeader = drawElement('div');
  wrapeTagsHeader.innerHTML = showRightSideHeader(tagsData.tags[0].title, tags.className);
  const tag = drawElement('div');
  tag.innerHTML = tagsData.tags[0].tagList.map((i) => showRightSideTag(i, tags.className)).join('');
  makeAppendChild(tags, wrapeTagsHeader, tag);
  return tags;
};
makeAppendChild(rightSide, latestPostsDraw(data.find((b) => b.id === 'latestPost')), categoriesDraw(data.find((b) => b.id === 'categories')), tagsDraw(data.find((b) => b.id === 'tags')));
makeAppendChild(rightSideFragment, rightSide);
makeAppendChild(main, leftSideFragment, rightSideFragment);
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
  const link = document.getElementById('postPage');
  link.classList.add('navigation--selected-menu-link');
  selectedMenuItem = link;
});