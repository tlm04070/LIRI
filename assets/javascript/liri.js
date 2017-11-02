const request = require('request');
const twitter = require('twitter');
const Spotify = require('node-spotify-api');
const inquirer = require('inquirer')
const twitterKeys = require('./keys.js');
const spotifyKeys = require('./keys.js');
const consumerKey = twitterKeys.consumer_key;
const consumerSecret = twitterKeys.consumer_secret;
const accessKey = twitterKeys.access_token_key;
const accessSecret = twitterKeys.access_token_secret;
const clientID = spotifyKeys.clientID;
const clientSecret = spotifyKeys.clientSecret;



//Starts the whole process with a list of options to run
inquirer.prompt([{
    type: "list",
    name: "choice",
    choices: [
        "tweets",
        "song look up",
        "movie search"
    ],
    message: "What do you want to do?"
}]).then(function (choice) {
    console.log(choice);





    // twitter funtion

    if (choice = "tweets") {
        let client = new twitter({
            consumer_key: consumerKey,
            consumer_secret: consumerSecret,
            access_token_key: accessKey,
            access_token_secret: accessSecret
        });

        let params = {
            screen_name: '@JohnDooperDogg1'
        };

        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {

                let recent = tweets.map(tweet => ({
                    Tweet: tweet.text,
                    Date: tweet.created_at
                }));

                console.log("Sure thing, here are your most recent tweets: " + JSON.stringify(recent, null, 4));

            }
        });


    };





    // Spotify function

    if (choice = "song look up") {
        inquirer.prompt([{
            type: "input",
            name: "songName",
            message: "What song are you looking up?"
        }]).then(function (lookUp) {
            console.log("testing");
            let spotify = new Spotify({
                id: clientID,
                secret: clientSecret
            });

            spotify.search({
                type: 'track',
                query: lookUp.songName,
                limit: 1
            }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                let artist = data.tracks.items[0].album.artists[0].name;
                let songResult = data.tracks.items[0].name;
                let link = data.tracks.items[0].album.artists[0].external_urls.spotify;
                let album = data.tracks.items[0].album.name;


                console.log(`Artist: ${artist}, Song Name: ${songResult}, Album: ${album} Preview: ${link} `);
            });

        });

    }



    //OMDB function
    if (choice = "movie search") {
        inquirer.prompt([{
            type: "input",
            name: "movie",
            message: "What movie are you looking up?",
        }]).then(function (title) {
            console.log(title);
            request(`http://www.omdbapi.com/?apikey=40e9cece&t=${movie}`, function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // Print the HTML for the Google homepage.
            });
        });

    };
});