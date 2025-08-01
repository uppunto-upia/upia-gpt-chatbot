// script.js
const chatContainer = document.getElementById('chat-container');
const inputField = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

let history = [];

async function sendMessageToGPT(message) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message, history })
  });

  const data = await response.json();
  history.push({ role: 'user', content: message });
  history.push({ role: 'assistant', content: data.reply });

  return data.reply;
}

function appendMessage(role, content) {
  const messageEl = document.createElement('div');
  messageEl.classList.add('message', role);
  messageEl.innerText = content;
  chatContainer.appendChild(messageEl);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

sendBtn.addEventListener('click', async () => {
  const userMessage = inputField.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  inputField.value = '';

  const reply = await sendMessageToGPT(userMessage);
  appendMessage('assistant', reply);
});
