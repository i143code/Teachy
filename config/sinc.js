
var sinchSms = require('sinch-sms')({
        key: '025867d5-c5ed-41e0-8cf6-518e9c2d1853', 
        secret: 'WWd/5aqkEUSwq74xF/DtIQ=='
    }); 

sinchSms.send('+15133562526', 'Hello World!').then(function(response) {
    //All good, response contains messageId
    console.log(response);
}).fail(function(error) {
    // Some type of error, see error object
    console.log(error);
});