/////////////////////////////////////
// SETUP
/////////////////////////////////////
const tileDisplay = document.querySelector('.tile-container');
const keys = document.querySelectorAll('.key-container .key');
const messageDisplay = document.querySelector('.message-container');

const guessRows = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
];

/////////////////////////////////////
// EVENT HANDLERS
/////////////////////////////////////
// Handle letter input
const handleLetter = (letter) => {
  console.log(letter);
  let key = letter.toUpperCase();

  if (!isGameOver) {
    // Delete letter
    if (key === '⌫' || key === 'BACKSPACE') {
      deleteLetter();
      // console.log('guessRows', guessRows);
      return;
    }

    // Check letter
    if (key === 'ENTER') {
      checkRow();
      // console.log('guessRows', guessRows);
      return;
    }

    addLetter(key);
  }
};

const handleKeypress = (event) => {
  let pressedKey = event.key.toUpperCase();

  let found = pressedKey.match(/[a-z]/gi);

  let validInput =
    pressedKey === 'BACKSPACE' ||
    pressedKey === 'ENTER' ||
    (found && found.length <= 1); // check that the key we pressed was an alphabetical key representing a single letter i.e. doesn't have multiple letters (Shift, Tab)

  if (validInput) {
    handleLetter(pressedKey);
  }
};

const handleClick = (event) => {
  let clickedKey = event.target.textContent;
  handleLetter(clickedKey);
};
/////////////////////////////////////
// CREATE DOM GAME ELEMENTS
/////////////////////////////////////

// Guess Rows/Tiles
guessRows.forEach((guessRow, guessRowIndex) => {
  const rowElement = document.createElement('div');
  rowElement.setAttribute('id', `guessRow-${guessRowIndex}`);

  guessRow.forEach((guess, guessIndex) => {
    const tileElement = document.createElement('div');
    tileElement.setAttribute(
      'id',
      `guessRow-${guessRowIndex}-tile-${guessIndex}`
    );
    tileElement.classList.add('tile');
    rowElement.append(tileElement);
  });

  tileDisplay.append(rowElement);
});

/////////////////////////////////////
// EVENT LISTENERS
/////////////////////////////////////
// Keyboard Input
document.addEventListener('keydown', handleKeypress);

// Mouse Click Input
keys.forEach((key) => {
  let letter = key.textContent;
  key.addEventListener('click', () => handleLetter(letter));
});

/////////////////////////////////////
// INITIALIZE GAME START
/////////////////////////////////////
let wordle = 'SUPER';
let currentRow = 0;
let currentTile = 0;
let isGameOver = false;
let messageTimeoutId;

const getWordle = () => {
  fetch('/word')
    .then((response) => response.json())
    .then((json) => {
      // console.log(json);
      wordle = json.toUpperCase();
    })
    .catch((err) => console.log(err));
};
getWordle();

/////////////////////////////////////
// GAME FUNCTIONS
/////////////////////////////////////
const addLetter = (letter) => {
  if (currentTile < 5 && currentRow < 6) {
    // Add letter to UI
    const tile = document.getElementById(
      `guessRow-${currentRow}-tile-${currentTile}`
    );
    tile.textContent = letter;

    // Store letter
    guessRows[currentRow][currentTile] = letter;

    // For colouring letters/tiles
    tile.setAttribute('data', letter);

    // Move to next letter
    currentTile++;
  }
};

const deleteLetter = () => {
  if (currentTile > 0) {
    currentTile--;
    const tile = document.getElementById(
      `guessRow-${currentRow}-tile-${currentTile}`
    );

    // Reset
    tile.textContent = '';
    guessRows[currentRow][currentTile] = '';
    tile.setAttribute('data', '');
  }
};

const checkRow = () => {
  const guess = guessRows[currentRow].join('');
  // console.log('guess', guess);
  // console.log('wordle', wordle);

  if (currentTile === 5) {
    fetch(`/check/?word=${guess}`)
      .then((response) => response.json())
      .then((json) => {
        resetMessage();

        if (json == 'Entry word not found') {
          showMessage('🤪🤪🤪 Invalid Word 🤪🤪🤪');
          return;
        } else {
          flipTile();

          if (wordle === guess) {
            showMessage('🔥🔥🔥 You got it! 🔥🔥🔥');
            isGameOver = true;
            return;
          } else {
            // Last row/guess
            if (currentRow >= 5) {
              showMessage(`🥺🥺🥺 Game Over. It was ${wordle}! 🥺🥺🥺`);
              isGameOver = true;
              return;
            }

            // More guesses available
            if (currentRow < 5) {
              currentRow++;
              currentTile = 0;
            }
          }
        }
      })
      .catch((err) => console.log(err));
  }
};

const resetMessage = () => {
  messageDisplay.innerHTML = '';
  clearTimeout(messageTimeoutId);
};

const showMessage = (message) => {
  resetMessage();
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  messageDisplay.append(messageElement);

  // Remove message after 5 seconds
  messageTimeoutId = setTimeout(
    () => messageDisplay.removeChild(messageElement),
    5000
  );
};

const addColorToKey = (keyLetter, color) => {
  const key = document.getElementById(keyLetter);
  key.classList.add(color);
};

const flipTile = () => {
  const rowTiles = document.getElementById(`guessRow-${currentRow}`).childNodes;
  let checkWordle = wordle;
  const guess = [];

  rowTiles.forEach((tile) => {
    guess.push({
      letter: tile.getAttribute('data'),
      color: 'absent-overlay',
    });
  });

  // Check for exact letter and position match
  guess.forEach((guess, index) => {
    if (guess.letter === wordle[index]) {
      guess.color = 'correct-overlay';
      checkWordle = checkWordle.replace(guess.letter, ''); // Remove letter from checkWordle
    }
  });

  // Check whether letter exists (but not in correct position)
  guess.forEach((guess) => {
    if (checkWordle.includes(guess.letter)) {
      guess.color = 'present-overlay';
      checkWordle = checkWordle.replace(guess.letter, ''); // Remove letter from checkWordle
    }
  });

  rowTiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add('flip');
      tile.classList.add(guess[index].color);
      addColorToKey(guess[index].letter, guess[index].color);
    }, 500 * index);
  });
};
