const { Client } = require('pg');

const client = new Client({
  user: 'user',
  host: 'localhost',
  database: 'payment',
  password: 'pass',
  port: 5432,
});

client.connect();

async function init() {
  await client.query(`
    CREATE TABLE IF NOT EXISTS payments (
      id SERIAL PRIMARY KEY,
      amount NUMERIC,
      status VARCHAR(20)
    )
  `);
}

module.exports = { client, init };