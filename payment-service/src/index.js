const express = require('express');
const { client, init } = require('./db');
const { sendMessage } = require('./queue');

const app = express();
app.use(express.json());

init();

app.post('/payment', async (req, res) => {
  const { amount } = req.body;

  await client.query(
    "INSERT INTO payments(amount, status) VALUES($1, 'PENDING')",
    [amount]
  );

  await sendMessage({ type: 'CREATED', amount });

  setTimeout(async () => {
    await client.query(
      "UPDATE payments SET status='SUCCESS' WHERE amount=$1",
      [amount]
    );

    await sendMessage({ type: 'CONFIRMED', amount });
  }, 3000);

  res.send({ status: 'PENDING' });
});

app.listen(3000, () => console.log('Payment Service rodando na porta 3000'));