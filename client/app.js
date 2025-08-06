const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-section__list');
const addMessageForm = document.querySelector('#add-messages-form');
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
    alert('The field is empty');
  }
}
function addMessage() {
  const li = document.createElement('li');
  const author = document.createElement('h3');
  const div = document.createElement('div');
  author.classList.add('message__author');
  div.classList.add('message__content');
  li.append(author, div);
  messagesList.appendChild(li);
}
function sendMessage(e) {
  e.preventDefault();
  if (!messageContentInput.value) {
    alert('The field is empty');
  }
  return addMessage(addMessage(userName), messageContentInput.value);
}

loginForm.addEventListener('submit', (e) => {
  login(e);
});
addMessageForm.addEventListener('submit', (e) => {
  sendMessage(e);
});
