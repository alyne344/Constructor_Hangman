let Letter = require('./Letter.js');

//random word chosen

function Word(randomWord) {

  //letters are put into an array as well as guessed letters

  this.letters = [];

  this.guessedLetters = [];

  //10 lives are given and solution is an empty string at the beginning

	this.lives = 10;

  this.solution = '';

  this.isSolved = false;

  this.init = function() {
    
    for (let i=0; i<randomWord.length; i++) {
    //formatting word pattern

      let char = randomWord.charAt(i).toUpperCase();
      let pattern = /[a-zA-Z]/g;
      let letter = new Letter(char, i);

      if (!pattern.test(char)) {
        letter.guessed = true;
      }
      
      this.letters.push(letter);
      this.solution += char;
    }
  }
  
  this.init();

  this.display = function() {
    let characters = [];
    //pushes characters into an array
    for (let i=0; i<this.letters.length; i++) {
      characters.push(this.letters[i].display());
    }

    console.log('\x1Bc');
    console.log('- - - Countries around the World Hangman - - -\n')
    console.log('\nThe mystery Country is: ' + characters.join(' ') + '\n');
    console.log("You have " + this.lives + " lives left\n");
  }

  this.guess = function(input) {
//formatting clean-up
    input = input
      .replace(/\W|\d/g, '')
      .substr(0, 1)
      .toUpperCase();

    this.guessedLetters.push(input);

    let isInWord = false;
    this.isSolved = true; //temporarily set to true

    for (let i=0; i<this.letters.length; i++) {
      
      if (this.letters[i].value === input) {
        isInWord = true;
        this.letters[i].guessed = true;
      }

      if (this.letters[i].guessed === false) {
        this.isSolved = false; //will be re-set to false if not solved
      }
    }

    if (!isInWord) {
      this.lives--;
    }

    return this.isSolved;
  }
}

module.exports = Word;