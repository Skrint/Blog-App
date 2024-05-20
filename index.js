const posts = [];

const $postTitleInput = document.querySelector('.js-post-title-input');
const $postTextInput = document.querySelector('.js-post-text-input');
const $newPostBtn = document.querySelector('.js-new-post-btn');
const $posts = document.querySelector('.js-posts');
const $col = document.querySelector('.col');
const $errorMessage = document.createElement('div');
const $inputs = document.querySelectorAll('input');

$newPostBtn.addEventListener('click', function () {
  let isError = false;
  const postFromUser = getPostFromUser();
  if (postFromUser.title.trim().length > 10) {
    $errorMessage.innerHTML = `<div>Заголовок больше 100 символов</div>`;
    $col.append($errorMessage);
    isError = true;
  }
  if (postFromUser.text.trim().length > 10) {
    $errorMessage.innerHTML = `<div>Текст больше 100 символов</div>`;
    $col.append($errorMessage);
    isError = true;
  }
  if (
    postFromUser.title.trim().length > 10 &&
    postFromUser.text.trim().length > 10
  ) {
    $errorMessage.innerHTML = `
		<div>Заголовок больше 100 символов</div>
		<div>Текст больше 100 символов</div>`;
    $col.append($errorMessage);
    isError = true;
  }
  if (postFromUser.title.trim() === '' && postFromUser.text.trim() === '') {
    $errorMessage.remove();
    isError = true;
  }
  if (!isError) {
    addPost(postFromUser);
    renderPosts();
    $postTitleInput.value = '';
    $postTextInput.value = '';
  }
});

function getPostFromUser() {
  const date = getDate();
  const title = $postTitleInput.value;
  const text = $postTextInput.value;

  return {
    date,
    title,
    text,
  };
}

function addPost({ date, title, text }) {
  posts.push({
    date,
    title,
    text,
  });
}

function getPosts() {
  return posts;
}

function renderPosts() {
  const posts = getPosts();
  let postsHTML = '';
  posts.forEach((post) => {
    postsHTML += `
		<div class='post'>
			<p class='post__date'>${post.date}</p>
			<p class='post__title'>${post.title}</p>
			<p class='post__text'>${post.text}</p>
		</div>`;
  });
  $posts.innerHTML = postsHTML;
}

//* Корректное отображение даты
function getDate() {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  if (month.toString().length == 1) {
    month = '0' + month;
  }
  if (day.toString().length == 1) {
    day = '0' + day;
  }
  if (hour.toString().length == 1) {
    hour = '0' + hour;
  }
  if (minute.toString().length == 1) {
    minute = '0' + minute;
  }
  if (second.toString().length == 1) {
    second = '0' + second;
  }
  var dateTime = day + '.' + month + '.' + year + ' ' + hour + ':' + minute;
  return dateTime;
}
