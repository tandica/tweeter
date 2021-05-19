//implement character count limit

    //charcter count function
$(document).ready(function() {
    let $tweet = $("#tweet-text");
    $tweet.on("keyup", function () {
        let charactersRemaining = (140 - (this.value.length))
        let $characters = $(this).parent("form").find(".counter");
        $characters.text(charactersRemaining);
        if (charactersRemaining <= 0) {
            $characters.css("color", "red");
        } else {
            $characters.css("color", "#4056A1");
        }
    })

});
