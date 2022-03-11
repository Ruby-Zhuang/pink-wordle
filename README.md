# Pink Wordle

Pink Wordle is a clone of the popular online [WORDLE](https://www.nytimes.com/games/wordle/index.html) game (but in pink).

Followed tutorial by [Ania Kubów](https://www.youtube.com/watch?v=mpby4HiElek)!

## Final Product

## How To Play

- The goal is to guess the correct 5-letter word in 6 attempts
- Each guess must be a valid 5-letter word
- After each guess, tiles will change colour depending on how accurate the guess was

  - **Green:** letter is in the word and in the correct position ![Correct Letter](https://github.com/Ruby-Zhuang/wordle-clone/blob/main/docs/green_letter.png)
  - **Yellow:** letter is in the word but in the wrong position ![Present Letter](https://github.com/Ruby-Zhuang/wordle-clone/blob/main/docs/yellow_letter.png)
  - **Pink:** letter is not in word ![Absent Letter](https://github.com/Ruby-Zhuang/wordle-clone/blob/main/docs/pink_letter.png)

## APIs

## Dependencies

- express
- axios
- nodemon

## Getting Started

1. Install all dependencies with `npm install`
2. Start the web server with `npm run nodemon`
3. Go to http://localhost:8000 in your browser
