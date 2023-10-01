<script lang="ts">
  import Row from "./lib/Row.svelte";
  import {checkIfWordExists} from "./lib/words/search";
  import {GameState} from "./lib/types";

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      handleEnter();
    } else if (event.key === "Backspace") {
      handleBackspace();
    } else if (event.key.length === 1 && event.key.match(/^[a-zA-Z]$/)) {
      handleLetterPress(event.key.toUpperCase());
    }
    renderGuess();
  }

  function renderGuess() {
    guesses[active_row] = current_guess;
    guesses = [...guesses];
  }

  function addGuessedLetters(guess: string) {
    for (let i = 0; i < guess.length; i++) {
      if (!guessed_letters.includes(guess[i])) {
        guessed_letters += guess[i];
      }
    }
  }

  function handleLetterPress(letter: string) {
    if (current_guess.length === word.length) {
      return;
    }
    current_guess += letter;
  }

  function handleBackspace() {
    current_guess = current_guess.slice(0, -1);
  }

  async function handleEnter() {
    if (
      current_guess.length !== word.length ||
      !(await checkIfWordExists(current_guess.toLowerCase()))
    ) {
      return; //raise error signal
    }
    addGuessedLetters(current_guess);
    if (current_guess === word) {
      game_state = GameState.WIN;
      return;
    }
    if (active_row === max_row_id) {
      game_state = GameState.LOST;
      return;
    }
    active_row += 1;
    current_guess = "";
  }

  // Game logic
  let word: string = "POMME";
  let current_guess: string = "";
  let active_row: number = 0;
  let max_row_id: number = 5;
  let guesses: string[] = Array.from({length: max_row_id + 1}, (_) => "");
  let game_state: GameState = GameState.IN_PROGRESS;
  let guessed_letters: string = "";
</script>

<main>
  <div class="game">
    {#each guesses as guess, i}
      <Row
        {word}
        {guess}
        guessed={active_row > i ||
          (active_row === i && game_state !== GameState.IN_PROGRESS)}
      />
    {/each}
  </div>
  <div class="game-state">
    {#if game_state == GameState.IN_PROGRESS}
      <p>Game in progress</p>
    {:else if game_state === GameState.WIN}
      <p>Game won</p>
    {:else if game_state === GameState.LOST}
      <p>Game lost</p>
    {:else}
      <p>Game error</p>
    {/if}
  </div>

  <div class="keyboard">
    {#each "ABCDEFGHIJKLMNOPQRSTUVWXYZ" as letter}
      <div
        class="keyboard-letter"
        style="background-color: {guessed_letters.includes(letter)
          ? word.includes(letter)
            ? '#cc0000'
            : 'transparent'
          : '#3a3a3c'}"
      >
        {letter}
      </div>
    {/each}
  </div>
</main>

<svelte:window on:keydown={handleKeyDown} />

<style>
  .keyboard {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .keyboard-letter {
    width: 50px;
    height: 50px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
  }
</style>
