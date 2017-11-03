const request = require('request');
const twitter = require('twitter');
const Spotify = require('node-spotify-api');
const inquirer = require('inquirer');
const twitterKeys = require('./keys.js');
const consumerKey = twitterKeys.consumer_key;
const consumerSecret = twitterKeys.consumer_secret;
const accessKey = twitterKeys.access_token_key;
const accessSecret = twitterKeys.access_token_secret;
const spotifyKeys = {
    clientID: '2a2eff591838440882cc96db6b28e33b',
    clientSecret: 'ce4ea765521b46a99353e45e79566cee'
};
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
}]).then(function (answers) {
    var choice = answers.choice;

    testing(choice);
});




// twitter funtion
function testing(choice) {
    if (choice === "tweets") {
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

                tweets.forEach(function (tweet) {
                    console.log(`Tweet: ${tweet.text}, Date: ${tweet.created_at}\n`);
                });




                // console.log("Sure thing, here are your most recent tweets: " + JSON.parse(recent));

            }
        });


    };





    // Spotify function

    if (choice === "song look up") {
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


                console.log(`Artist: ${artist} \n Song Name: ${songResult} \n Album: ${album} \n Preview: ${link}`);
            });

        });

    }



    //OMDB function
    if (choice === "movie search") {
        inquirer.prompt([{
            type: "input",
            name: "movie",
            message: "What movie are you looking up?",
        }]).then(function (title) {
            var movie = title.movie;
            request(`http://www.omdbapi.com/?apikey=40e9cece&t=${movie}`, function (error, response, body) {

                console.log("Title: " + JSON.parse(body).Title);
                console.log("Release Date: " + JSON.parse(body).Released);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Languages: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);

            });
        });

    };
};