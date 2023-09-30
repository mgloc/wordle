import {LetterState} from "../types";

export const is_word_valid = (word: string): boolean => {
  return word.length > 0;
};

export const get_letters_states = (
  word: string,
  guess: string
): LetterState[] => {
  const letters_states: LetterState[] = [];
  const letters = word.split("");
  const guesses = guess.split("");
  letters.forEach((letter, index) => {
    if (guesses[index] === letter) {
      letters_states.push(LetterState.CORRECT);
    } else if (
      guesses.includes(letter) &&
      !is_letter_guessed(index, letter, guess, word)
    ) {
      console.log(index, letter, guess, word);
      letters_states.push(LetterState.MISPOSITIONNED);
    } else {
      letters_states.push(LetterState.INCORRECT);
    }
  });
  return letters_states;
};

const is_letter_guessed = (
  index: number,
  letter: string,
  guess: string,
  word: string
): boolean => {
  for (let i = 0; i < word.length; i++) {
    if (guess[i] === letter && word[i] === letter && i !== index) {
      return true;
    }
  }
  console.log(index);
  return false;
};
