var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = "false";

$(document).on("keydown", function () {
    if(started === "false"){
        nextSequence();
        started = "true"
    }
});

$(".btn").click(function (event) {
    userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  });

function nextSequence() {
  userClickedPattern = [];
  level++; 
  $("h1").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour); 
}


function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
}else{
    var wrong = new Audio("./sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
}
  if (gamePattern.length === userClickedPattern.length){
    setTimeout(function () {
        nextSequence();
      }, 1000);
  }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = "false";
}

