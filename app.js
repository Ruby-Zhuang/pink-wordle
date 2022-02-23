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
  '«',
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
  buttonElement.addEventListener('click', () => handleClick(key));

  keyboard.append(buttonElement);
});

/////////////////////////////////////
// INITIALIZE GAME START
/////////////////////////////////////
let wordle = 'SUPER'; //hard-coded for now
let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

// Handle letter input
const handleClick = (key) => {
  console.log('clicked', key); //temp

  // Delete letter
  if (key === '«') {
    deleteLetter();
    console.log('guessRows', guessRows);
    return;
  }

  // Check letter
  if (key === 'ENTER') {
    checkRow();
    console.log('guessRows', guessRows);
    return;
  }

  addLetter(key);
};

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

  if (currentTile === 5) {
    console.log('guess', guess);
    console.log('wordle', wordle);
    flipTile();

    if (wordle === guess) {
      showMessage('🔥🔥🔥YAY!🔥🔥🔥');
      isGameOver = true;
      return;
    } else {
      // Last row/guess
      if (currentRow >= 5) {
        showMessage('Game Over');
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
};

const showMessage = (message) => {
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  messageDisplay.append(messageElement);

  // Remove message after 2 seconds
  setTimeout(() => messageDisplay.removeChild(messageElement), 2000);
};

const flipTile = () => {
  const rowTiles = document.getElementById(`guessRow-${currentRow}`).childNodes;

  rowTiles.forEach((tile, index) => {
    const dataLetter = tile.getAttribute('data');

    setTimeout(() => {
      tile.classList.add('flip');

      if (dataLetter === wordle[index]) {
        tile.classList.add('green-overlay');
      } else if (wordle.includes(dataLetter)) {
        tile.classList.add('yellow-overlay');
      } else {
        tile.classList.add('grey-overlay');
      }
    }, 500 * index);
  });
};
