/*JavaScript*/


// GLOBAL VARIABLES
// =====================================
// arrays and variables for 
var wordOptions = ["betty", "archie", "veronica"];
var selectedWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongGuesses = [];

// game counter
var winCount = 0;
var lossCount = 0;
var guessesLeft = 0;

// FUNCTIONS
// =====================================

function startGame() {
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersInWord = selectedWord.split("");
    numBlanks = lettersInWord.length;

    // reset
    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccesses = [];

    // populate blanks and successes with right number of blanks
    for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccesses.push("_");
    }


    // change html to reflect round conditions
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;




    // Testing/Debugging
    console.log(selectedWord);
    console.log("letters in word " + lettersInWord);
    console.log("num blanks " + numBlanks);
    // console.log("blanks and successes " + blanksAndSuccesses);

}


function checkLetters(letter) {
    // check if the letter exists anywhere in the word
    var isLetterInWord = false;

    for (var i = 0; i < numBlanks; i++) {
        if (selectedWord[i] == letter) {
            isLetterInWord = true;
        }
    }

    // check where in the word the eltter exists then populate blanks and successes array
    if (isLetterInWord) {
        for (var i = 0; i < numBlanks; i++) {
            if (selectedWord[i] == letter) {
                blanksAndSuccesses[i] = letter;
            }
        }
    }
    // letter wasn't found 
    else {
        wrongLetters.push(letter);
        guessesLeft--;
    }

}


function roundComplete() {
    console.log("Win count: " + winCount + " | Loss count: " + lossCount + " | guesses left: " + numGuesses);

    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrongLetters").innerHTML = wrongLetters.join(" ");


    if(lettersInWord.toString() == blanksAndSuccesses.toLocaleString()){
        winCount++;
        alert("You Win!");

        document.getElementById("winCounter").innerHTML = winCount;

        startGame();
    }
    else if (guessesLeft == 0 ){
        lossCount++;
        alert("you lost!");

        document.getElementById("lossCounter").innerHTML = lossCount;

        startGame();

    }
}



// MAIN PROCESS
// =====================================

// initiates the code the first time
startGame();


// register keyclicks
document.onkeyup = function (event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLocaleLowerCase();
    checkLetters(letterGuessed);
    roundComplete();


    // Testing/Debugging
    console.log(letterGuessed);
}