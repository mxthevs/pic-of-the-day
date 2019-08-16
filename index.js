const express = require('express');
const axios = require('axios'); //usado para chamar a api
const dotenv = require('dotenv').config();
const app = express();
const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT;
const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    axios.get(url) // faça uma requisição get na url
        .then((response) => { // então faça isso

            //usar res.send para saber o que está dentro da response
            //res.send(response.data); envia para o endereço '/'
            //abaixo RENDERIZA no endereço '/'
            res.render('index', {
                title: response.data.title,
                img_url: response.data.url,
                explanation: response.data.explanation,
                date: response.data.date
            })
        })
        .catch((error) => { // se der erro, envie o erro
            res.send(error);
        });
})

app.listen(PORT, () => {
    console.log(`Servidor ligado na porta ${PORT}`);
});