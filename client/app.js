const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

let userName = '';
const socket = io();
socket.on('message', (event) => addMessage(event.author, event.content));
function login(e) {
  e.preventDefault();
  if (userNameInput.value) {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
    console.log(userName);
    socket.emit('join', userName );
  } else {
    alert('The field is empty');
  }
}
function addMessage(author, content) {
  const li = document.createElement('li');
  li.classList.add('message', 'message--received');
  if (author === userName) {
    li.classList.add('message--self');
  }
  li.innerHTML = `<h3 class="message__author">${
    userName === author ? 'You' : author
  }</h3>
  <div class="message__content">${content}</div>`;
  messagesList.append(li);
  messageContentInput.value = '';
}
function sendMessage(e) {
  e.preventDefault();

  let messageContent = messageContentInput.value;
  if (!messageContent.length) {
    alert('The field is empty');
  } else {
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContent });
    messageContent = '';
  }
}

loginForm.addEventListener('submit', (e) => {
  login(e);
});
addMessageForm.addEventListener('submit', (e) => {
  sendMessage(e);
});
