# Fast Payment System

Projeto da disciplina de Desenvolvimento de Sistemas Distribuídos.

## Descrição

Sistema baseado em microsserviços com dois serviços independentes:

* Payment Service: processa pagamentos
* Notification Service: envia notificações

A comunicação entre os serviços é feita de forma assíncrona com RabbitMQ.

---

## Tecnologias

* Node.js
* Express
* PostgreSQL
* RabbitMQ
* Docker

---

## Como executar

### 1. Subir infraestrutura

```bash
docker-compose up -d
```

### 2. Rodar o serviço de notificação

```bash
cd notification-service
npm install
node src/index.js
```

### 3. Rodar o serviço de pagamento

```bash
cd payment-service
npm install
node src/index.js
```

---

## Teste

Requisição POST para:

```
http://localhost:3000/payment
```

Body:

```json
{
  "amount": 100
}
```

---

## Resultado esperado

No terminal do notification-service:

```
Pagamento recebido: 100
Pagamento confirmado: 100
```

---

## Estrutura

```
fast-payment-system/
  payment-service/
  notification-service/
  docker-compose.yml
```

---
