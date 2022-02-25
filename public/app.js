/////////////////////////////////////
// SETUP
/////////////////////////////////////
const tileDisplay = document.querySelector('.tile-container');
const keyboard = document.querySelector('.key-container');
const messageDisplay = document.querySelector('.message-container');

const keys = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'ENTER',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
  '⌫',
];

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
const handleLetter = (key) => {
  if (!isGameOver) {
    // Delete letter
    if (key === '⌫') {
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
  let key = event.key.toUpperCase();

  if (key === 'BACKSPACE') {
    key = '⌫';
  }

  if (keys.includes(key)) {
    handleLetter(key);
  }
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

// Keyboard Buttons
keys.forEach((key) => {
  const buttonElement = document.createElement('button');
  buttonElement.textContent = key;
  buttonElement.setAttribute('id', key);
  buttonElement.addEventListener('click', () => handleLetter(key));

  keyboard.append(buttonElement);
});

document.addEventListener('keydown', handleKeypress);

/////////////////////////////////////
// INITIALIZE GAME START
/////////////////////////////////////
let wordle = 'SUPER';
let currentRow = 0;
let currentTile = 0;
let isGameOver = false;
let messageTimeoutId;

const getWordle = () => {
  fetch('http://localhost:8000/word')
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
    fetch(`http://localhost:8000/check/?word=${guess}`)
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
              showMessage('🥺🥺🥺 Game Over 🥺🥺🥺');
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
      color: 'grey-overlay',
    });
  });

  // Check for exact letter and position match
  guess.forEach((guess, index) => {
    if (guess.letter === wordle[index]) {
      guess.color = 'green-overlay';
      checkWordle = checkWordle.replace(guess.letter, ''); // Remove letter from checkWordle
    }
  });

  // Check whether letter exists (but not in correct position)
  guess.forEach((guess) => {
    if (checkWordle.includes(guess.letter)) {
      guess.color = 'yellow-overlay';
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
