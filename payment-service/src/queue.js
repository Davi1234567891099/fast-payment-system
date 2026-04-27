const amqp = require('amqplib');

async function sendMessage(message) {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  const queue = 'payments';

  await channel.assertQueue(queue);
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

  setTimeout(() => conn.close(), 500);
}

module.exports = { sendMessage };