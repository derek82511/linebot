let express = require('express');
let bodyParser = require('body-parser');
let request = require('request');

let linebot = require('./linebot');

let app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.send('home');
});

app.post('/callback', linebot.callback);

app.listen(app.get('port'), function() {
    console.log('App is running on port', app.get('port'));
});