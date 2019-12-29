let data;
const PostId = JSON.parse(location.href.match(/id=(.*)/)[1]);
const starSigns = ['#star1', '#group', '#star2'];

const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (xhttp.readyState === 4 && xhttp.status === 200) {
    data = JSON.parse(xhttp.responseText);
  }
};
xhttp.open('GET', 'js/post.json', false);
xhttp.send();

fetch(`http://127.0.0.1:3000/api/list/${PostId}`, {
  method: 'get',
  headers: {'Content-Type': 'application/json'},
  mode: 'cors',
})
  .then((response) => response.json())
  .then((json) => renderCurrentPost(json))
  .catch((error) => console.warn(error));

function renderCurrentPost(currentPost) {
  const feedback = drawElement('section', 'feedback');
  leftSide.insertAdjacentHTML('afterbegin', getCreatedFeedbackTemplate(currentPost, feedback.className));
  leftSide.insertAdjacentHTML('afterbegin', leftSIdeTitleDraw(currentPost));
}

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
function getCreatedFeedbackTemplate(post, section) {
  return `<img class="${section}__user-photo" src="${post.userPhoto}" alt="${post.name} user" />
          <div class="${section}__block">
            <h4 class="${section}__block-header">${post.name}</h4>
            <div class="${section}__block-info">
                <p class="${section}__block-info-date">${post.date}</p>
                <p class="${section}__block-info-read">${post.read}</p>
                <svg class="${section}__block-info-comments-icon">
                    <use href="${post.commentSign}"></use>
                </svg>
                <p class="${section}__block-info-comments">${post.comments}</p>
                ${getQuantityOfStars(post)}
            </div>
        </div>
        ${getPosterTemplateIfExist(post, section)}
        <p class="${section}__text">${post.text}</p>
        ${getQuoteTemplateIfExist(post, section)}`;
}
function getFeedbackTemplate(i, section) {
  return `<img class="${section}__user-photo" src="${i.photo}" alt="${i.name} user" />
          <div class="${section}__block">
            <h4 class="${section}__block-header">${i.name}</h4>
            <div class="${section}__block-info">
                <p class="${section}__block-info-date">${i.date}</p>
                <p class="${section}__block-info-read">${i.read}</p>
                <svg class="${section}__block-info-comments-icon">
                    <use href="${i.commentSign}"></use>
                </svg>
                <p class="${section}__block-info-comments">${i.comments}</p>
                ${getQuantityOfStars(i)}
            </div>
          </div>
          <div class="${section}__picture">
            <img class="${section}__picture-item" src="${i.src}" alt="${i.srcDescription}" />
          </div>
        ${getAudioTemplateIfExist(i)}
        ${getDescriptionFeedback(i)}`;
}
function getDescriptionFeedback(post) {
  let postDescription = '';
  for (let i = 0; i < post.description.length; i++) {
    postDescription += post.description[i];
  }
  postDescription += post.quote;
  for (let i = 0; i < post.descriptionAfterQuote.length; i++) {
    postDescription += post.descriptionAfterQuote[i];
  }
  return postDescription;
}
function getLikesTemplate(i, section) {
  return `<input type="checkbox" class="${section}__hidden" id="likeChanger" />
          <label class="${section}__icon" for="likeChanger"></label>
          <span class="${section}__quantity">${i.likes} likes</span>`;
}
function getCommunicateTemplate(i, section) {
  return `<a class="${section}__${i.name}" href="${i.link}">
            <svg class="${section}--${i.name}">
                <use href="${i.sign}"></use>
            </svg>
          </a>`;
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
function getQuantityOfStars(post) {
  const starList = [];
  for (let i = 1; i < 6; i++) {
    starList.push(getQuantityOfStarsItem(post, i));
  }
  return starList.join(' ');
}
function getQuantityOfStarsItem(post, number) {
  return `<svg class="feedback__block-info-star">
             <use href="${countQuantityOfStars(post, number)}"></use>
           </svg>`;
}
function getAudioTemplateIfExist(post) {
  if (post.audio) {
    return `<audio class="feedback__audio" src="${post.audio}" controls></audio>`;
  } else {
    return '';
  }
}
function getQuoteTemplateIfExist(post, section) {
  if (post.quote) {
    return `<blockquote class="${section}__quote">${post.quote}</blockquote>`;
  } else {
    return '';
  }
}
function getPosterTemplateIfExist(post, section) {
  if (post.poster) {
    return `<div class="${section}__picture">
    <img class="${section}__picture-item" src="${post.poster}" alt="${post.srcDescription}" />
</div>`;
  } else {
    return '';
  }
}
function getReviewsHeaderTemplate(i, section) {
  return `<h2 class="${section}__header">${i.title}</h2>
          <div class="${section}__line"></div>`;
}
function getReviewTemplate(i) {
  return `<section class="review review--${i.author}">
            <div class="review__user-photo">
                <img class="review__user-photo-item" src="${i.photo}" alt="${i.name} photo" />
            </div>
            <div class="review__name">
                <h3 class="review__header">${i.name}</h3>
                ${getQuantityOfStars(i)}
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
function getMoreCommentsButtonTemplate(i, section) {
  return `<button class="${section}__more-comments">${i}</button>`;
}
function getRightSideHeaderTemplate(i, section) {
  return `<h2 class="${section}__header">${i}</h2>`;
}
function getRightSidePostTemplate(i, section) {
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
function getRightSideCategoryTemplate(i, section) {
  return `<section class="${section}">
            <div class="${section}__header">${i.name} (${i.categoryAll.length})
                <input class="${section}__check-hidden" id="${i.id}" type="checkbox" />
                <label class="${section}__header-arrow" for="${i.id}">
                    <svg class="${section}__header-arrow-item">
                        <use href="${i.sign}"></use>
                    </svg>
                </label>
                <div class="${section}__hidden-block">
                ${getHiddenCategoryItemTemplate(i.categoryAll, section)}
                </div>
            </div>
        </section>`;
}
function getHiddenCategoryItemTemplate(category, section) {
  let categoryItem = '';
  for (let i = 0; i < category.length; i++) {
    categoryItem += `<h5 class="${section}__hidden-block-item">${category[i].name}</h5>`;
  }
  return categoryItem;
}
function getRightSideTagTemplate(i, section) {
  return `<button class="${section}__item">${i.name}</button>`;
}

const main = document.getElementById('main');
const leftSideFragment = document.createDocumentFragment();
const leftSide = drawElement('section', 'main__left');
const leftSIdeTitleDraw = function (feedbackData) {
  return `<h2 class="main__left-header">${feedbackData.title}</h2>`;
};
const feedbackDraw = function (feedbackData) {
  const feedback = drawElement('section', 'feedback');
  feedback.innerHTML = feedbackData.feedback.map((i) => getFeedbackTemplate(i, feedback.className)).join('');
  const likesAndCommunicate = drawElement('div', 'likes-and-communicate');
  const likes = drawElement('div', 'likes');
  likes.innerHTML = getLikesTemplate(feedbackData.feedback[0], likes.className);
  const communicate = drawElement('div', 'communicate');
  communicate.innerHTML = feedbackData.feedback[0].communicate.map((i) => getCommunicateTemplate(i, communicate.className)).join('');
  makeAppendChild(likesAndCommunicate, likes, communicate);
  makeAppendChild(leftSide, feedback, likesAndCommunicate);
};
const reviews = drawElement('section', 'reviews');
const reviewsDraw = function (reviewData) {
  const wrapReviewsHeader = drawElement('div');
  wrapReviewsHeader.innerHTML = getReviewsHeaderTemplate(reviewData.reviews[0], reviews.className);
  const wrapReview = drawElement('div');
  wrapReview.innerHTML = reviewData.reviews[0].reviewBlocks.map((i) => getReviewTemplate(i)).join('');
  makeAppendChild(reviews, wrapReviewsHeader, wrapReview);
  return reviews;
};
const wrapMoreComments = drawElement('div');
const moreCommentsDraw = function (reviewData) {
  wrapMoreComments.innerHTML = getMoreCommentsButtonTemplate(reviewData.button, reviews.className);
  return wrapMoreComments;
};

if (!localStorage.getItem('current-post')) {
  leftSide.insertAdjacentHTML('afterbegin', leftSIdeTitleDraw(data.find((b) => b.id === 'feedback').feedback[0]));
  feedbackDraw(data.find((b) => b.id === 'feedback'));
  reviewsDraw(data.find((b) => b.id === 'review'));
  moreCommentsDraw(data.find((b) => b.id === 'review'));
  makeAppendChild(leftSide, reviews, wrapMoreComments);
}

makeAppendChild(leftSideFragment, leftSide);

const rightSideFragment = document.createDocumentFragment();
const rightSide = drawElement('aside', 'main__right');
const latestPostsDraw = function (latestPostsData) {
  const latestPosts = drawElement('section', 'latest-posts');
  const wrapeLatestPostsHeader = drawElement('div');
  wrapeLatestPostsHeader.innerHTML = getRightSideHeaderTemplate(latestPostsData.latestPost[0].title, latestPosts.className);
  const latestPost = drawElement('div');
  latestPost.innerHTML = latestPostsData.latestPost[0].posts.map((i) => getRightSidePostTemplate(i, latestPosts.className)).join('');
  makeAppendChild(latestPosts, wrapeLatestPostsHeader, latestPost);
  return latestPosts;
};
const categoriesDraw = function (categoriesData) {
  const categories = drawElement('section', 'categories');
  const wrapeCategoriesHeader = drawElement('div');
  wrapeCategoriesHeader.innerHTML = getRightSideHeaderTemplate(categoriesData.categories[0].title, categories.className);
  const category = drawElement('div', 'category');
  category.innerHTML = categoriesData.categories[0].category.map((i) => getRightSideCategoryTemplate(i, category.className)).join('');
  makeAppendChild(categories, wrapeCategoriesHeader, category);
  return categories;
};
const tagsDraw = function (tagsData) {
  const tags = drawElement('section', 'tags');
  const wrapeTagsHeader = drawElement('div');
  wrapeTagsHeader.innerHTML = getRightSideHeaderTemplate(tagsData.tags[0].title, tags.className);
  const tag = drawElement('div');
  tag.innerHTML = tagsData.tags[0].tagList.map((i) => getRightSideTagTemplate(i, tags.className)).join('');
  makeAppendChild(tags, wrapeTagsHeader, tag);
  return tags;
};
makeAppendChild(rightSide, latestPostsDraw(data.find((b) => b.id === 'latestPost')), categoriesDraw(data.find((b) => b.id === 'categories')), tagsDraw(data.find((b) => b.id === 'tags')));
makeAppendChild(rightSideFragment, rightSide);
makeAppendChild(main, leftSideFragment, rightSideFragment);

