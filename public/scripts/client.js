/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  //fetch tweets from /tweets page
  const loadTweets = function () {
    $(".tweets-container").empty();
    $.ajax("/tweets", { method: "GET" }).then(function (tweetsOnPage) {
      renderTweets(tweetsOnPage);
    });
  };
  loadTweets();

  //prevent XSS
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //create tweet with user and content info
  const createTweetElement = function (tweet) {
    let $tweet = ` 
        <article class="tweet-container">
            <h5>${tweet["user"]["handle"]}</h5>
            <img src=${tweet["user"]["avatars"]}> 
            <h4>${tweet["user"]["name"]}</h4>
                <p>${escape(tweet["content"]["text"])}</p>
            <div class = "outer-border"></div>
            <div class = "inner-border"></div>
            <time class="timeago" datetime="2021-05-18T09:24:17Z" title="May 18, 2021">${timeago.format(
              tweet.created_at
            )}</time>
            <i class="fas fa-heart"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-flag"></i>
        </article>`;
    return $tweet;
  };

  //render tweets so multiple could appear on page
  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $(".tweets-container").prepend($tweet);
    }
  };

  //hide error messages
  $(".error-empty-form").hide();
  $(".error-exceeds-char").hide();

  //add event listener submit
  $(".form-container").submit(function (event) {
    event.preventDefault();
    $(".error-empty-form").hide();
    $(".error-exceeds-char").hide();
    let formData = $(".form-container").serialize();
    const tweet = $("#tweet-text").val();
    if (tweet.length === 0) {
      if ($(".error-empty-form").first().is(":hidden")) {
        $(".error-empty-form").slideDown("fast");
      }
    } else if (tweet.length > 140) {
      if ($(".error-exceeds-char").first().is(":hidden")) {
        $(".error-exceeds-char").slideDown();
        return;
      } else {
        $(".error-exceeds-char").hide();
      }
    }

    $.ajax({
      url: "/tweets",
      type: "POST",
      data: formData,
      dataType: "text",
    }).then(() => {
      loadTweets();
      $("#tweet-text").val("");
    });
  });
});
