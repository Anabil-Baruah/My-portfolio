const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express()
const port = process.env.PORT || 3000
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static(__dirname + '/public'));


app.use('/', require('./routes/index'))
app.use('/admin', require('./routes/admin'))



app.set('view engine', 'ejs');
app.listen(port, () => {
    console.log("server started")
})