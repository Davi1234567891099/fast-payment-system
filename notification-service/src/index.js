const amqp = require('amqplib');

async function start() {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  const queue = 'payments';

  await channel.assertQueue(queue);

  console.log('Notification Service rodando');

  channel.consume(queue, (msg) => {
    const data = JSON.parse(msg.content.toString());

    if (data.type === 'CREATED') {
      console.log('Pagamento recebido:', data.amount);
    }

    if (data.type === 'CONFIRMED') {
      console.log('Pagamento confirmado:', data.amount);
    }

    channel.ack(msg);
  });
}

start();