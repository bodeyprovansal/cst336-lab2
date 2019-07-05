var selectedWord = "";
var selectedHint="";
var board = [];
var remainingGuesses = 6;
//var words = ["snake", "monkey", "beetle"];
var words = [{ word: "snake", hint: "It's a reptile" },
             { word: "monkey", hint: "It's a mammal" },
             { word: "beetle", hint: "It's an insect" }];
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
                'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        
window.onload = startGame();
$(".letter").click(function(){
  checkLetter($(this).attr("id"));
  disableButton($(this));
  console.log($(this).attr("id"));
});

$(".replayBtn").on("click", function() {
  location.reload();
  
});

$(".helpBtn").click(function() {
  disableButton($(this));
  showHint();
});

function startGame() {
  pickWord();
  initBoard();
  createLetters();
  updateBoard();  
}

function initBoard() {
  for (var letter in selectedWord) {
    board.push("_");
  }
}

function pickWord() {
  var randomInt = Math.floor(Math.random() * words.length);
  selectedWord = words[randomInt].word.toUpperCase();
  selectedHint = words[randomInt].hint;
}        

function updateBoard() {
  $("#word").empty();
  for (var letter of board) {
    document.getElementById("word").innerHTML += letter + " ";
  }
  
}

function updateWord(positions, letter) {
  for (var pos of positions) {
    board[pos] = letter;
  } 
  updateBoard();
}

function updateMan() {
  $("#hangImg").attr("src", "img/stick_" + (6 - remainingGuesses) + ".png");
}

function showHint(){
  console.log("ShowHint()");
  remainingGuesses -= 1;
  updateMan();
  $("#word").append("<br />");
  $("#word").append("<span class='hint'>Hint: " + selectedHint + "</span>");
}

function createLetters() {
  for (var letter of alphabet) {
    $("#letters").append("<button class='letter btn btn-success' id='" + letter + "'>" + letter + "</button>");
  }
}
function checkLetter(letter) {
  console.log(letter);
  var positions = new Array();
  
  for (var i = 0; i < selectedWord.length; i++) {
    if (letter == selectedWord[i]) {
      positions.push(i);
    }
  }
  
  if(positions.length > 0) {
    updateWord(positions, letter);
    
    if(!board.includes('_')) {
      endGame(true);
    }
    
  } else {
    remainingGuesses -= 1;
    updateMan();
  }
  
  if(remainingGuesses <= 0) {
    endGame(false);
  }
}

function endGame(win) {
  $("#letters").hide();
  
  if(win) {
    $('#won').show();
  } else {
    $('#lost').show();
  }
}

function disableButton(btn) {
  btn.prop("disabled", true);
  btn.attr("class", "btn btn-danger");
}

function enableButton(btn) {
  btn.prop("enabled", true);
  btn.attr("class", "btn btn-success");
}
console.log("board " + board); 
console.log($(".helpBtn").attr("class"));
console.log("selectedWord: " + selectedWord);

/*$("#letterBtn").click(function(){
  var boxVal = $("#letterBox").val();
  console.log("Submitted: " + boxVal);
})*/