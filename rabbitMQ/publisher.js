
let num = 1;

function publisher(connection, message) {
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        let queue = 'personalData';
        

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(message));

        console.log(" [" + num + "] message sent");
        num++
    });
}

exports.publisher = publisher;

