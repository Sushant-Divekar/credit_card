const dotenv = require('dotenv');
const mongoose = require('mongoose')
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const verifyToken = require('./middleware/cardauth');
const path = require('path')

dotenv.config({path: './config.env'});
const PORT = process.env.PORT;
require ('./db/conn');

app.use(express.json());
app.use(cookieParser());

app.use(require('./controllers/auth'));
app.use(require('./controllers/card'));

app.use(express.static(path.join(__dirname, 'view')));

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});




app.listen(PORT , () =>{
    console.log(`server is running at port no ${PORT}`);
})

app.use(verifyToken);