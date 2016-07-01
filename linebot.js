let request = require('request');
let config = require('./config');

const toChannel = 1383378250;
const eventType = '138311608800106203';

function send(data){
    let to = data.content.from;
    let contentType = data.content.contentType;
    let text = data.content.text || '';

    let content;

    switch(contentType) {
        case 1:
            content = {
                toType: 1,
                contentType: 1,
                text: '文字訊息'
            };
            break;
        case 2:
            content = {
                toType: 1,
                contentType: 1,
                text: '圖片'
            };
            break;
        case 3:
            content = {
                toType: 1,
                contentType: 1,
                text: '影片'
            };
            break;
        case 4:
            content = {
                toType: 1,
                contentType: 1,
                text: '音檔'
            };
            break;
        case 7:
            content = {
                toType: 1,
                contentType: 1,
                text: '位置'
            };
            break;
        case 8:
            content = {
                toType: 1,
                contentType: 1,
                text: '貼圖'
            };
            break;
        default:
            content = {
                toType: 1,
                contentType: 1,
                text: '無法分辨'
            };
    }

    let body = {
        to: [to],
        toChannel: toChannel,
        eventType: eventType,
        content: content
    };

    console.log('send: ', body);

    request({
        url: 'https://trialbot-api.line.me/v1/events',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'X-Line-ChannelID': config.ChannelID,
            'X-Line-ChannelSecret': config.ChannelSecret,
            'X-Line-Trusted-User-With-ACL': config.MID
        },
        method: 'POST',
        body: JSON.stringify(body)
    }, function(error, response, body) {
        if (error) {
            console.log('Error message: ', error);
        } else if (response.body.error) {
            console.log('Body error: ', response.body.error);
        }
        console.log('Send response: ', body);
    });
}

function callback(req, res, next){
    let result = req.body.result;

    for(let i = 0; i < result.length; i++){
        let data = result[i];

        console.log('Receive: ', JSON.stringify(data));
        
        send(data);
    }

    res.send();
}

module.exports = {
    callback: callback
};