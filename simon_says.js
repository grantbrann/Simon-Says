let userBank = [];
let moveBank = [];
let gameStatus;
let upAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
let downAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
let leftAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
let rightAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");


function normalDisplay() {
  $("#up").css('background', 'white');
  $("#left").css('background', 'white');
  $("#down").css('background', 'white');
  $("#right").css('background', 'white');
}

function whenKeyPress(key){
  switch (key){
    case 38:
      $('#up').css('background', 'grey');
      upAudio.play();
      setTimeout(function() {$("#up").css('background', 'white');}, 300);
      userBank.push(38);
      break;
    case 40:
      $('#down').css('background', 'grey');
      downAudio.play();
      setTimeout(function() {$("#down").css('background', 'white');}, 300);
      userBank.push(40);
      break;
    case 37:
      $('#left').css('background', 'grey');
      leftAudio.play();
      setTimeout(function() {$("#left").css('background', 'white');}, 300);
      userBank.push(37);
      break;
    case 39:
      $('#right').css('background', 'grey');
      rightAudio.play();
      setTimeout(function() {$("#right").css('background', 'white');}, 300);
      userBank.push(39);
      break;
  }
}

function randomPush(){
  let randomNumber = Math.floor(Math.random() * 4);
  if (randomNumber === 0) {
    moveBank.push(38); //set to up
    whenKeyPress(38);
  } else if (randomNumber === 1) {
    moveBank.push(40); //set to down
    whenKeyPress(40);
  } else if (randomNumber === 2) {
    moveBank.push(37); //set to left
    whenKeyPress(37);
  } else if (randomNumber === 3) {
    moveBank.push(39); //set to right
    whenKeyPress(39);
  }
}

function initialize() {
  for (i = 0; i < 3; i++) {
    setTimeout(randomPush(), 1000);
  }
}

function checkIds(key, index){
  if(moveBank[index] !== key){
    if(gameStatus === 'strict'){
      $('#empty').text("That Ain't it cheif");
      setTimeout(function() {$('#empty').Text('Get to<br />20<br />to Win');}, 2000);
      return 'escape';
    } else {
      $('#empty').text('Try Again');
      setTimeout(function() {$('#empty').Text('Get to<br />20<br />to Win');}, 2000);
      return false;
    }
  }
  else {
    return true;
  }
}

function startGame(){
  initialize();
  let round = 0;
  while (round <= 20){
    for(i = 0; i < moveBank.length; i++){
      whenKeyPress(moveBank[i]);
    }
    for(i = 0; i < moveBank.length; i++){
      window.addEventListener('keydown', function(event){
        whenKeyPress(event.keyCode);
        check = checkIds();
      });
    }
  }
}

window.addEventListener('keydown', function(event){
  whenKeyPress(event.keyCode);
});

$(document).ready(function(){

  $(".start").click(function() {
    initialize();
    }
  );

  $(".strict").click(function(){
    initialize();
  }
);});
