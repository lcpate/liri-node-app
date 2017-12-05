
// keys and variables 
var keys = require("./keys.js");
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

//command line arguments
var userInput = process.argv[2];
var userChoice = process.argv[3];


switch (userInput) {
	case "my-tweets":
		showTweets();
		break;
	case "spotify-this-song":
		spotifyResults();
		break;
	case "movie-this":
		movieResults();
		break;
	case "do-what-it-says":
		doWhatItSays();
		break;
};

// Twitter Request
function showTweets(){

var Twitter = require('twitter');

	var client = new Twitter({
		consumer_key: consumerKey,
		consumer_secret: consumerSecret,
		access_token_key: tokenKey,
		access_token_secret: tokenSecret
	});

	
	client.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=@claire_liri&count=3', function (error, tweets, response) {
		if (!error) {
			for (var i = 0; i < tweets.length; i++) {
				var tweetResults = tweets[i];
				console.log(tweetResults.text);
				console.log(tweetResults.created_at);
				console.log("\n");
			};
		};
	});


    
};











// Spotify Request

function spotifyResults(userChoice){

	var Spotify = require('node-spotify-api');
 
	var spotify = new Spotify({
  		id: 'e9bb7eb08ca14fdb8c1246fc666339bc',
  		secret: '25ee7b378f0448c6834ba2a79877a96f'
	});

	userChoice = "";

	if (userChoice === undefined || userChoice === "") {
		userChoice = "The Sign Ace of Base";
	} else {
		userChoice = userChoice;
	}


	spotify.search({ type: 'track', query: userChoice, limit: 3}, function(err, data){

		if (!err) {
			for (var i = 0; i < data.tracks.items.length; i++){
				var results = data.tracks.items[i];

			}
            console.log("Name: " + results.name);
            console.log("Album: " + results.album.name);
            console.log("Artist: " + results.name);
            console.log("Preview: " + results.preview_url);
        } else {
            return console.log(err)
        }
    })








		// console.log(userChoice);
  //               // var data = data.tracks.items;
  //               // console.log(data[0].name); //song track name
  //               // console.log(data[0].album.href); //url 
  //               // console.log(data[0].album.name); //album name
  //               // console.log(data[0].preview_url); //preview link to the song
  //               // console.log(data[0].artists[0].name); //artist's name
  //   });
};























// OMDB function

function movieResults(userChoice){

	// The request npm package 
	var request = require("request");

	// Store all of the arguments in an array
	var nodeArgs = process.argv;

	// Create an empty variable for holding the movie name
	var movieName = "";

		for (var i = 3; i < nodeArgs.length; i++) {

	  		if (i > 3 && i < nodeArgs.length) {
	    		movieName = movieName + "+" + nodeArgs[i];
	  		}else {
	    		movieName += nodeArgs[i];
	  		}
		}

	// Then run a request to the OMDB API 
	var queryUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=1c7a6e25"
	console.log(queryUrl);

		request(queryUrl, function(error, response, body) {

	  		// If the request is successful
	  		if (!error && response.statusCode === 200) {

		  		var infoJSON = JSON.parse(body);
		  		// console.log(infoJSON);
		  		console.log("Movie Title: " + infoJSON.Title);
		  		console.log("Movie Release Year: " + infoJSON.Year);
		  		console.log("IMBD Movie Rating: " + infoJSON.imdbRating);
		  		console.log("Rotten Tomatoes Movie Rating: " + infoJSON.Ratings[2].Value);
		  		console.log("Movie Production Country: " + infoJSON.Country);
		  		console.log("Movie Language: " + infoJSON.Language);
		  		console.log("Movie Plot: " + infoJSON.Plot);
		  		console.log("Movie Actors: " + infoJSON.Actors);
	  		}
		});

}
