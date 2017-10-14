var allModels = require('../models/tweet');
const mongoose = require('mongoose');

const Tweet = mongoose.model('Tweet');
const Like = mongoose.model('Like');
const ReTweet = mongoose.model('ReTweet');

var config = require('../../config');

mongoose.connect(config.db['development']);
exports.create = function (req, res) {

    const tweet = new Tweet(req.query);
    console.log(req.query);

    tweet.save((err) => {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(tweet);
        }
    });
};

exports.list = function (req, res) { 

    (async function getData(){
        const [tweets, likes, retweets ] = await Promise.all([getTweets(),getLikes(),getRetweets()]);
       
        var mer = merge(likes,tweets);mer = merge(retweets,mer)
        res.json(mer);
    })();

    function getTweets(){
    //   return  Tweet.find({},'_id username content' ,function(err, tweets){
    //     if (err) console.log(err);
    //     return tweets;
    // });
     return Tweet.aggregate([{ 
           $group: {
            _id: '$_id',
            content: { $first: 'content' },
            username: { $first: 'username' },
       }}], (function (err, tweets) {
            return tweets; }))
    }
    function getRetweets(){
         return ReTweet.aggregate([{ 
           $group: {
            _id: '$post_id',
            retweets_count: { $sum: 1 },
       }}], (function (err, retweets) {
            return retweets;
         }))
    }
    
    function getLikes(){
         return Like.aggregate([{ 
           $group: {
            _id: '$post_id',
            like_count: { $sum: 1 },
             
         }}], (function (err, likes) {
            return likes;
         }))
    }

    function merge(a1,a2){
      return a2.map(x => Object.assign(x, a1.find(y => String(y._id) == String(x._id))));
    }
 }

exports.createLike = function (req, res) {

    const like = new Like(req.query);
    like.post_id = req.params.id;

    like.save((err) => {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(like);
        }
    });
}

exports.createRetweet = function (req, res) {
    const reTweet = new ReTweet(req.query);
     reTweet.post_id = req.params.id;

    reTweet.save((err) => {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(reTweet);
        }
    });

}
exports.getRetweets = function (req, res) {

    ReTweet.find().populate('post_id').exec((err, retweets) => {
        if (err) {
            return res.status(400).send({ message: err });
        } else {
            res.json(retweets);
        }
    });
  }

