const eventSource = new EventSource('/sse');

eventSource.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  const current_time = new Date();
  const rtt = current_time - new Date(msg.send_date);
  const dt_client_to_server = new Date(msg.date) - new Date(msg.send_date);
  const dt_server_to_client = current_time - new Date(msg.date);

  const message = document.getElementById('time');
  message.innerHTML = `
  sent time(cli): ${msg.send_date}<br>
  sent time(srv): ${msg.date}<br>
  <b>(cli→srv: ${dt_client_to_server}ms / srv→cli:${dt_server_to_client}ms / RTT: ${rtt}ms)</b>`;
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