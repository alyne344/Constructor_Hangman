function Letter(letter, indexInWord) {

  this.value = letter;

  this.guessed = false;

  this.display = function() {
    
    if (this.guessed) {
      return this.value;

    } else {
      return "_";
    }
  }
}

module.exports = Letter;