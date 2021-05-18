//implement character count limit

$(document).ready(function() {
    //select tweet from css id
    let $tweet = $("#tweet-text");
    //implement event
    $tweet.on("keyup", function () {
        //create variable specifying the count of remaining characters
        let charactersRemaining = (140 - (this.value.length))
        //find .counter using this 
        let $characters = $(this).parent("form").find(".counter");
        $characters.text(charactersRemaining);
        //if characters remaining is below or equal to 0, change the font of the character 140 to red
        if (charactersRemaining <= 0) {
            $characters.css("color", "red")
        } else {
            $characters.css("color", "#4056A1")
        }
    })
});