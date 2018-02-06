//Retrieve code and data 
var countries = require('country-list')();
Word = require('./Word.js'),
inquirer = require('inquirer');

//Random Pokemon word chosen at beginning of game
var allNames = countries.getNames();
var word = new Word(allNames[Math.floor(Math.random()*allNames.length)]);

//Function for starting Game
function start() {
//Random Pokemon word chosen
  word = new Word(allNames[Math.floor(Math.random()*allNames.length)]);
//Calling Inquirer NPM package
  inquirer
  .prompt(  
    {
      name: "start",
      type: "confirm",
      message: "Would you like to start a new game of Hangman?",
      default: true
    })
  .then(function(answers) {

    if (answers.start === true) {
        ask();

    } else {
        console.log("Game ended");
        return;
    }
  });
}

function ask() {

  word.display();
  
  inquirer
  .prompt(  {
    name: "guessLetter",
    type: "input",
    message: "Guess a letter: ",
    validate: function (input) {
      // removes digits and special characters from input then capitalizes
      let formattedInput = input
        .replace(/\W|\d/g, '')
        .substr(0, 1)
        .toUpperCase();
      //Guessed index word
      let guessedIndex = word.guessedLetters.indexOf(formattedInput);

      //To prevent guessing the same letter

      if (guessedIndex !== -1) {
        return "You already guessed " + formattedInput + ", choose another letter.";

      } else if (!formattedInput) {
        return "Invalid input, please enter a letter.";

      } else {
        return true;
      }
    }
  })
  .then( function( answers ) {
    word.guess(answers.guessLetter);

    if (word.isSolved) {
        
        word.display();
        console.log('~ YOU WIN! ~ \n\n');
        start();

    } else {
        ask();
    }

  });
}

start();