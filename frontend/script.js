const eventSource = new EventSource('/sse');

eventSource.onmessage = (event) => {
  const message = document.getElementById('time');
  message.textContent = event.data;
};

const button = document.getElementById('sendButton');
button.addEventListener('click', () => {
  fetch('/api/notifydate', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action: 'sendTime', date: new Date().toISOString() }),
  });
});