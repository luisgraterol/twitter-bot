var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);

// Set up your search parameters:
var params = {
    q: '#starwars',
    count: 100,
    result_type: 'recent',
    lang: 'en'
}

T.get('search/tweets', params, function(err, data, response) {
    if(!err) {
        // Loop through the return tweets:
        for(let i = 0; i < data.statuses.length; i++) {
            // Get the tweet ID from the return data:
            let id = { id: data.statuses[i].id_str }
            // Try to favorite the selected tweet:
            T.post('statuses/retweet', id, function(err, response) {
                if(!err) { // If there is no error, log the url of the tweet:
                    let username = response.user.screen_name;
                    let tweetId = response.id_str;
                    console.log("Retweeted: ",`${tweetId} by ${username}`)
                }
                else { // Else, log the error produced.
                    console.log(err[0].message);
                }
            })
        }
    }
    else
        console.log(error);
})
