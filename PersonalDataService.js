const express = require('express');
const app = express();
const fetch = require("node-fetch");
const { v4: uuidv4 } = require('uuid');
const amqp = require('amqplib/callback_api');

const publish = require('./rabbitMQ/publisher');

app.use(express.json());

//MIDDLEWARE
let validation = (req, res, next) => {
    let id = req.body.id;

    if (id >= 100 && id <= 120) {
        next();
    } else {
        res.status(400).send('ID is not valid');
    }
};


app.post('/api/v1/commands/run', validation, (req, res) => {

    let id = req.body.id;

    getData(id).then((userData) => {

        let user = JSON.stringify(convert(userData.data));

        amqp.connect('amqp://localhost', function(err, conn) {
            if (err != null) {
                console.error(err);
                process.exit(1);
              }
            publish.publisher(conn, user);
          });
          res.send(user);
    })
});

async function getData(id) {

    const response = await fetch(`https://gorest.co.in/public-api/users/${id}`);
    if (response.ok) {
        const json = await response.json();
        return json
    } else {
        console.log("HTTP-Error: " + response.status);
    }

}

function convert(obj) {

    let newUser = {
        uuid: uuidv4(),
        name: obj.name,
        email: obj.email,
        login: obj.email.substring(0, obj.email.lastIndexOf("@")),
        status: obj.status
    }

    return newUser;
}

// DO PRZETESTOWANIA FUNKCJI CONVERT
// exports.convert = convert;

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});