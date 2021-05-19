const amqp = require('amqplib/callback_api');

const consumer = require('./rabbitMQ/consumer');

amqp.connect('amqp://localhost', function (err, conn) {
    if (err != null) {
        console.error(err);
        process.exit(1);
    }
    consumer.consumer(conn);
});

