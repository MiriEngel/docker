var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var TweetSchema = new Schema({
    content: String,
    username: String
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
);
module.exports = mongoose.model('Tweet', TweetSchema);




var LikeSchema = new Schema({
    username: String,
    post_id: {
   type: Schema.ObjectId,
        ref: 'Tweet'
    }

},
{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
);
module.exports = mongoose.model('Like', LikeSchema);




var ReTweetSchema = new Schema({
       post_id: {
   type: Schema.ObjectId,
        ref: 'Tweet'
    },
    username: String
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
);
module.exports = mongoose.model('ReTweet', ReTweetSchema);

