
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

function isValidTitle() {
  if (title.value.length < 20 && title.value.length > 2) {
    if (title.value.charCodeAt(0) >= 65 && title.value.charCodeAt(0) <= 90) {
      return true;
    }
  }
  return false;
}
function validateTitle() {
  if (isValidTitle()) {
    title.classList.remove('form--invalid');
  } else {
    title.classList.add('form--invalid');
  }
}
function getFormForCreatePostTemplate(className) {
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
  wrapFormCreatePost.classList.toggle('form--visible');
}

const mainSection = document.getElementById('main');

const wrapFormCreatePost = drawElement('div', 'form');
wrapFormCreatePost.classList.add('form--hidden');
wrapFormCreatePost.innerHTML = getFormForCreatePostTemplate('form');
makeAppendChild(mainSection, wrapFormCreatePost);

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
      if (response.ok) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(response.statusText);
      }
    })

    .then((response) => response.json())
    .then(() => {
      location.href = `post.html?id=${JSON.parse(body).id}`;
    })
    .catch((error) => {
      console.warn(`invalid input, object invalid ${error}`);
    });
};
const onSubmit = (e) => {
  e.preventDefault();
  const id = Math.floor(Math.random() * 1000000000);
  const type = e.target.typeOfPost.value;
  const userPhoto = e.target.userPhoto.value;
  const poster = e.target.userPhoto.value;
  const title = e.target.titlePost.value;
  const name = e.target.authorName.value;
  const date = e.target.datePost.value;
  const text = e.target.descriptionPost.value;
  const quote = e.target.userQuote.value;

  if (isValidTitle()) {
    sendCreatePostRequest(JSON.stringify({id, type, userPhoto, title, name, date, text, quote, poster}));
  }
};

const title = document.getElementById('titlePost');
title.addEventListener('input', validateTitle);

const form = document.getElementById('createPostForm');
form.addEventListener('submit', onSubmit);