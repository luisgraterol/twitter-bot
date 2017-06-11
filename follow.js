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
            let screen_name = data.statuses[i].user.screen_name;

            T.post('friendships/create', {screen_name}, function(error, response) {
                if (!error)
                    console.log("Followed: ",screen_name);
                else
                    console.log(error);
            })
        }
    }
    else
        console.log(error);
})
