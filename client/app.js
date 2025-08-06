const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-section__list');
const addMessageForm = document.querySelector('#add-message-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

let userName = '';

function login(e) {
  e.preventDefault();
  if (userNameInput.value) {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
    console.log(userName);
  } else {
    console.log('błąd');
  }
}
loginForm.addEventListener('submit', (e) => {
  login(e);
});
