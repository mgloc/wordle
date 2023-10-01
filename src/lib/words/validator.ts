import {LetterState} from "../types";

export const is_word_valid = (word: string): boolean => {
  return word.length > 0;
};

/**
 * Returns an array of LetterState for each letter of the guess.
 * The LetterState is CORRECT if the letter is at the right place,
 * MISPOSITIONNED if the letter is in the word but not at the right place,
 * and INCORRECT if the letter is not in the word.
 *
 * @param guess The current guess
 * @param word The word to guess
 */
export const get_letters_states = (
  word: string,
  guess: string
): LetterState[] => {
  const letters_states: LetterState[] = [];
  const word_letters = word.split("");
  const guess_letters = guess.split("");

  guess_letters.forEach((guess_letter, index) => {
    if (guess_letter === word_letters[index]) {
      letters_states.push(LetterState.CORRECT);
    } else if (
      word_letters.includes(guess_letter) &&
      !is_letter_guessed(index, guess, word)
    ) {
      letters_states.push(LetterState.MISPOSITIONNED);
    } else {
      letters_states.push(LetterState.INCORRECT);
    }
  });
  return letters_states;
};

/**
 * Returns true if the letter has already been guessed correctly anywhere else.
 *
 * @param index The index of the letter to check
 * @param guess The current guess
 * @param word The word to guess
 */
const is_letter_guessed = (
  index: number,
  guess: string,
  word: string
): boolean => {
  for (let i = 0; i < word.length; i++) {
    if (word[i] === guess[index] && guess[i] !== guess[index] && i !== index) {
      return false;
    }
  }
  return true;
};
