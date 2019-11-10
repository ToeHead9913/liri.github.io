var keys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

var getTweets = function () {

    var client = new Twitter(keys.twitterKeys);

    var params = { screen_name: 'ToeHead9913' };
    client.get('statuses/user_timeline', params, function (error, tweets,
        response) {
        if (!error) {
            console.log(tweets);
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(' ');
                console.log(tweets[i].text);
            }
        }
    });

}

var getArtistNames = function(artist) {
    return artist.name;
}

var getSpotify = function(songName) {

spotify.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {
        console.log('Error occurred: ' + err);
        return;
    }

   

    var songs = data.tracks.items;
    for(var i = 0; i<songs.length; i++) {
        console.log(i);
        console.log('artist(s): ' + songs[i].artists.map(
            getArtistNames));
        console.log('song name: ' + songs[i].name);
        console.log('preview song: ' + songs[i].preview_url);
        console.log('album: ' + songs[i].album.name);
        console.log('_____________________________________________')
        }
});
}

var getMovie = function(movieName) {

request('http://www.omdbapi.com/?apikey=['+ movieName +']&', function (error, response, body) {
    if (!error && response.statusCode == 200) {
    
        var jsonData = JSON.parse(body);

        console.log('Title: ' + jsonData.Title);
        console.log('Year: ' + jsonData.Year);
        console.log('Rated: ' + jsonData.Rated);
        console.log('IMBD Rating: ' + jsonData.imdbRating);
        console.log('Country: ' + jsonData.Country);
        console.log('Language: ' + jsonData.language);
        console.log('Plot: ' + jsonData.Plot);
        console.log('Actors: ' + jsonData.Actors);
        console.log('Rotten Tomatoes Rating: ' + jsonData.tomatoRating);
        console.log('Rotten Tomatoes URL: ' + jsonData.tomatoURL);
    }
});
}

var pick = function (caseData, functionData) {
    switch (caseData) {
        case 'my-tweets':
            getTweets();
            break;
        case 'spotify-my-song':
            getSpotify(functionData);
            break;
        case 'movie-this':
            getMovie(functionData);
            break;
        default:
            console.log("Liri doesn't know that");
    }
}

var runThis = function (argOne, areTwo) {
    pick(argOne, areTwo);
};

runThis(process.argv[2], process.argv[3]);