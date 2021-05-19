/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

//fetch tweets from /tweets page
    const loadTweets = function() {
        $(".tweets-container").empty();
        $.ajax("/tweets", { method: "GET" })
            .then(function(tweetsOnPage) {
            renderTweets(tweetsOnPage);
        });
    }
    loadTweets();


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


    const renderTweets = function(tweets) {
        for (let tweet of tweets) {
            let $tweet = createTweetElement(tweet);
            $('.tweets-container').append($tweet);
        }
    }



//add event listener submit
    $(".form-container").submit(function(event) {
        event.preventDefault();
        let formData = $(".form-container").serialize();
        const tweet = $('#tweet-text').val();
        if (tweet.length === 0) {
            alert('Please write a tweet')
        } else if (tweet.length > 140) {
            alert('Too many characters')
        }

        console.log('tweet:', tweet);
        console.log(formData); //not showing up
        $.ajax({url: "/tweets", type: "POST", data: formData, dataType: "text"})
            .then(() => loadTweets());
    })
})