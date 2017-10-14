
var express = require('express');       
var app = express();                 
var port = process.env.PORT || 8080;  
var router = express.Router(); 

const tweetController = require('./app/controllers/tweet.server.controller');

app.route('/').get(tweetController.list);
app.route('/tweets')
        .get(tweetController.list)
        .post(tweetController.create);
app.route('/tweets/:id/likes').post(tweetController.createLike);
app.route('/tweets/:id/retweet').post(tweetController.createRetweet);
app.route('/retweets').get(tweetController.getRetweets);		


app.use('/', router);
app.listen(port);
console.log('port:' + port);
