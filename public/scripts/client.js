/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const tweetData = {
//     "user": {
//         "name": "Newton",
//         "avatars": "https://i.imgur.com/73hZDYK.png",
//         "handle": "@SirIsaac"
//     },
//     "content": {
//         "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
// }

//const $tweet = $(`<article class="tweet">Hello world</article>`);

const data = [{
    "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
    },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
    },
    {
    "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
    "content": {
        "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
    }
]


$(document).ready(function() {
    const renderTweets = function(tweets) {
        for (let tweet of tweets) {
            let $tweet = createTweetElement(tweet);
            $('.tweets-container').append($tweet);
        }
    }
    renderTweets(data);
    
})


const createTweetElement = function (tweet) {
    let $tweet = ` 
    <article class="tweet-container">
        <h5>${tweet["user"]["handle"]}</h5>
        <img src=${tweet["user"]["avatars"]}> 
        <h4>${tweet["user"]["name"]}</h4>
            <p>${tweet["content"]["text"]}</p>
        <div class = "outer-border"></div>
        <div class = "inner-border"></div>
        <time class="timeago" datetime="2021-05-18T09:24:17Z" title="May 18, 2021"></time>
        <i class="fas fa-heart"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-flag"></i>
    </article>`;

    return $tweet;
}

//add event listener submit
$(".form-container").submit(function(event) {
    event.preventDefault();
    let formData = $(".form-container").serialize();
    console.log(formData)
    $.ajax({url: "/tweets", type: "POST", data: formData, dataType: "text"}).then(response => console.log(response))
})