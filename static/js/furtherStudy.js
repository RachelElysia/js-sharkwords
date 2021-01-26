const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;

// Loop over the chars in `word` and create divs.
//
const createDivsForChars = (word) => {
  const wordContainerElement = document.querySelector('#word-container');
    for (let letter of word) {
      const newDiv = document.createElement('div');
      wordContainerElement.appendChild(newDiv).classList.add('letter-box', `${letter}`);
    }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  const letterButtonElements = document.querySelector('#letter-buttons');
  for (let letter of ALPHABET){
    const letterButton = document.createElement('button');
    letterButtonElements.appendChild(letterButton).innerHTML = `${letter}`;
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  buttonEl.setAttribute('disabled', true);
};

// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => {
  let word = 'hello';
  return (word.includes(letter));
};

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter) => {
  const letterButtons = document.querySelectorAll(`.${letter}`);
  
  for (letterButton of letterButtons){
    letterButton.innerHTML = `${letter}`;
  }
};

// Called when `letter` is not in word.
//
// If the shark gets the person, disable all buttons and show the "play again"
// message. Otherwise, increment `numWrong` and update the shark image.
//
const handleWrongGuess = () => {
  numWrong++;

  if (numWrong <= 5) {
    const imagechange = document.querySelector('#shark-img *');
    imagechange.setAttribute('src', `/static/images/guess${numWrong}.png`);
  }

  if (numWrong >= 5) {
    const buttons = document.querySelectorAll('#letter-buttons *');
    for (button of buttons) {
      button.setAttribute('disabled', true);
    } 

    document.querySelector('#play-again').style.display = ''; 
  }
};

//  Reset game state. Called before restarting the game.
//
const resetGame = () => {
  window.location = '/sharkwords';
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  const word = 'hello';

  createDivsForChars(word);
  generateLetterButtons();

  document.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', (evt) => {
      const clickedBtn = evt.target;
      disableLetterButton(clickedBtn);

      const letter = clickedBtn.innerHTML;

      if (isLetterInWord(letter)) {
        handleCorrectGuess(letter);
      } else {
        handleWrongGuess(letter);
      }
    });
  });

  document.querySelector('#play-again').addEventListener('click', () => {
    resetGame();
  });
})();
