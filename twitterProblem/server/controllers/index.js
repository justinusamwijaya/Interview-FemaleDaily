const OAuth = require('oauth')
const oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    'R93BEGLuDSsIGPNXDgLQNsjuW',
    'PejDhSK6oG1sQTOFh3GOZ7bPZESz5hlaogtEqgbJqcx6VYLhOn',
    '1.0A',
    null,
    'HMAC-SHA1'
);
const AccessKey = ['1002025720468533248-yd0Jj1jGmu9Tmu9QWiMt7xURy7rN3Q','XUMeXoS67PtqnyGbW0U8TPVA6omMFiqjHGltgNSO5tYg4']

const postFunction = (url,cb,status=undefined) =>{
    if(status === undefined){
        return oauth.post(
            url,
            ...AccessKey,
            function (e, data, response){
                if (e) console.error(e);        
                cb(data)
        });
    }
    return oauth.post(
        url,
        ...AccessKey,
        status,
        function (e, data, response){
            if (e) console.error(e);        
            cb(data)
    });
}

const getFunction = (url,cb) =>{
    return oauth.get(
        url,
        ...AccessKey,
        function (e, data, response){
            if (e) console.error(e);        
            cb(data)
    });
}

module.exports = {
    getTweet:(req,res)=>{
        getFunction('https://api.twitter.com/1.1/statuses/home_timeline.json',function(tweets){
            let arrayResult = []
            tweets = JSON.parse(tweets)
            for(let i in tweets){
                if(tweets[i].retweeted_status!==undefined){
                    let objTweet ={
                        id: tweets[i].id_str,
                        accountNameTweeter:tweets[i].retweeted_status.user.screen_name,
                        retweetedFrom: tweets[i].retweeted_status.user.name,
                        tweetContent: tweets[i].text,
                        yourUsername: tweets[i].user.name,
                    }
                    arrayResult.push(objTweet)
                }else{
                    let objTweet = {
                        id:tweets[i].id_str,
                        yourAccountName: tweets[i].user.screen_name,
                        yourTweetContent: tweets[i].text,
                        yourUsername: tweets[i].user.name,
                    }
                    arrayResult.push(objTweet)
                }

            }
            res.status(200).send(arrayResult)
        })
    },
    postTweet:(req,res)=>{
        postFunction('https://api.twitter.com/1.1/statuses/update.json',function(data){
            res.send(data)
        },{status:req.body.status})
    },
    searchTweet:(req,res)=>{
        getFunction('https://api.twitter.com/1.1/search/tweets.json?q='+req.params.search,function(tweets){
            let arrayResult = []
            tweets = JSON.parse(tweets)
            for(let i in tweets.statuses){
                if(tweets.statuses[i].retweeted_status!==undefined){
                    let objTweet ={
                        id: tweets.statuses[i].id_str,
                        accountNameTweeter:tweets.statuses[i].retweeted_status.user.screen_name,
                        retweetedFrom: tweets.statuses[i].retweeted_status.user.name,
                        tweetContent: tweets.statuses[i].text,
                        yourUsername: tweets.statuses[i].user.name,
                    }
                    arrayResult.push(objTweet)
                }else{
                    let objTweet = {
                        id:tweets.statuses[i].id_str,
                        yourAccountName: tweets.statuses[i].user.screen_name,
                        yourTweetContent: tweets.statuses[i].text,
                        yourUsername: tweets.statuses[i].user.name,
                    }
                    arrayResult.push(objTweet)
                }

            }
            res.status(200).send(arrayResult)
        })
    },
    reTweet:(req,res)=>{
        postFunction('https://api.twitter.com/1.1/statuses/retweet/'+req.body.id+'.json',function(data){
            res.send(data)
        },{id:req.body.id})
    },
    destroyTweet:(req,res)=>{
        postFunction('https://api.twitter.com/1.1/statuses/destroy/'+req.body.id+'.json',function(data){
            res.send(data)
        },{id:req.body.id})
    }
}