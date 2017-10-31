const request = require('request');
const twitterKeys = require('./keys.js');
const consumerKey = twitterKeys.consumer_key;
const consumerSecret = twitterKeys.consumer_secret;
const accessKey = twitterKeys.access_token_key;
const accessSecret = twitterKeys.access_token_secret;
const argv = process.argv[2];

request('https://api.twitter.com/1.1/search/tweets.json?q=%40TrevorLMeadows', function (err, response, body) {
    if (err) {
        return console.log("nope")
    }
    console.log(JSON.parse(response));
});