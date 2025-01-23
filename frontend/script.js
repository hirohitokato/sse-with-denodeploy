const eventSource = new EventSource('/sse');

eventSource.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  const rtt = new Date() - new Date(msg.send_date);

  const message = document.getElementById('time');
  message.textContent = `received at ${msg.date}, (srv: ${msg.diff}ms RTT: ${rtt}ms)`;
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