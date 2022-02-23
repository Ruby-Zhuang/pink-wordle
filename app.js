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

// Handle letter input
const handleClick = (key) => {
  console.log('clicked', key); //temp

  // Delete letter
  if (key === '«') {
    console.log('delete letter');
    return;
  }

  // Check letter
  if (key === 'ENTER') {
    console.log('check row');
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
