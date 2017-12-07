
// keys and variables 
var keys = require("./keys.js");
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
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
		spotifyResults(userChoice);
		break;
	case "movie-this":
		movieResults(userChoice);
		break;
	case "do-what-it-says":
		doWhatItSays();
		break;
};

// Twitter Request
function showTweets(){
	console.log("TWEETS");

	var client = new twitter(keys.twitterKeys);

  	var params = {
    	screen_name: 'claire_liri'
  	};

  	client.get('statuses/user_timeline', params, function (error, tweets, response) {
    	if (!error) {
      		for (i = 0; i < tweets.length; i++) {
        	console.log(tweets[i].text + tweets[i].created_at);
      		}
    	}
  	});
  
};


// Spotify Request

function spotifyResults(userChoice){
 
	var spotify = new Spotify({
  		id: 'e9bb7eb08ca14fdb8c1246fc666339bc',
  		secret: '25ee7b378f0448c6834ba2a79877a96f'
	});

	// var spotify1 = new Spotify(keys.spotifyKeys);

	this.userChoice = userChoice;

	if (userChoice === undefined || userChoice === "") {
		userChoice = "The Sign Ace of Base";
	} else {
		userChoice = userChoice;
	}
console.log(this.userChoice);

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
    });

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
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=1c7a6e25"

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


function doWhatItSays() {
	
	fs.readFile("random.txt", "utf8", function(err, data) {

		if (err) {
	   		return console.log(err);
		}

		//make an array that splits at the comma
		var songArr = data.split(",");

 		input = songArr[0];
 		song = songArr[1];
 		spotifyResults(song);
	});

};
