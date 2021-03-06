# Pink Wordle :cherry_blossom:

Pink Wordle is a clone of the popular online [WORDLE](https://www.nytimes.com/games/wordle/index.html) game (but in pink)!

Check out the ๐ [deployed website here!](https://pink-wordle.herokuapp.com/) ๐

## Final Product

Winning Game
![Win](https://github.com/Ruby-Zhuang/pink-wordle/blob/main/docs/Win.gif)

Losing Game
![Lost](https://github.com/Ruby-Zhuang/pink-wordle/blob/main/docs/Lose.gif)

## How To Play

- The goal is to guess the correct 5-letter word in 6 attempts
- Each guess must be a valid 5-letter word
- After each guess, tiles will change colour depending on how accurate the guess was

| Colour     | Letter Accuracy                                   | Example                                                                                         |
| ---------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Green**  | Letter is in the word and in the correct position | ![Correct Letter](https://github.com/Ruby-Zhuang/wordle-clone/blob/main/docs/green_letter.png)  |
| **Yellow** | Letter is in the word but in the wrong position   | ![Present Letter](https://github.com/Ruby-Zhuang/wordle-clone/blob/main/docs/yellow_letter.png) |
| **Pink**   | Letter is not in word                             | ![Absent Letter](https://github.com/Ruby-Zhuang/wordle-clone/blob/main/docs/pink_letter.png)    |

## APIs Used

- [Random Word API](https://rapidapi.com/sheharyar566/api/random-words5): provides random words
- [Dictionary API](https://rapidapi.com/twinword/api/word-dictionary): checks whether a word is valid

## Dependencies

- express
- axios
- nodemon

## Getting Started

1. Install all dependencies with `npm install`
2. Start the web server with `npm run start` or `npm run nodemon`
3. Go to http://localhost:8000 in your browser

## Credits

Followed tutorial by ๐ [Ania Kubรณw!](https://www.youtube.com/watch?v=mpby4HiElek) ๐
