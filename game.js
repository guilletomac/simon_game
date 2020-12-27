var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var level = 0;
var gameStarted = false;

if (!gameStarted) {
    $(document).keypress(function (){
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
})
};

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    console.log(userClickedPattern);
    playSound(userChosenColour);
    animateButton(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // test
    console.log(gamePattern);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
              }, 1000);
            $("#level-title").text("Level " + level);
            console.log("Success");
            userClickedPattern = [];
        }
    }

    else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        console.log("Wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over"), 200
        });
        $("#level-title").text("Game Over ! Press any key to restart.");
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        gameStarted = false;
    }
} 

function animateButton(thisColour) {
        $("#" + thisColour).fadeIn(100).fadeOut(100).fadeIn(100);      
    };    

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}