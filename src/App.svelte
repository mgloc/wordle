<script lang="ts">
  import Row from "./lib/Row.svelte";
  import {onMount} from "svelte";

  import {checkIfWordExists, getRandomWord} from "./lib/words/search";
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
  let word: string = "";
  onMount(async () => (word = (await getRandomWord()).toUpperCase()));
  let current_guess: string = "";
  let active_row: number = 0;
  let max_row_id: number = 5;
  let guesses: string[] = Array.from({length: max_row_id + 1}, (_) => "");
  let game_state: GameState = GameState.IN_PROGRESS;
  let guessed_letters: string = "";
</script>

<main class="bg-slate-900 p-12 h-screen">
  {#if word.length === 0}
    <div class="text-white text-xl font-bold flex justify-center">
      Loading...
    </div>
  {:else}
    <div class="flex flex-col justify-center items-center gap-5 ps-25">
      <!-- Grid --->
      <div>
        {#each guesses as guess, i}
          <Row
            {word}
            {guess}
            guessed={active_row > i ||
              (active_row === i && game_state !== GameState.IN_PROGRESS)}
          />
        {/each}
      </div>

      <!-- GameState -->
      <div class="text-white text-xl font-bold">
        {#if game_state == GameState.IN_PROGRESS}
          <p>Game in progress</p>
        {:else if game_state === GameState.WIN}
          <p>Game won</p>
        {:else if game_state === GameState.LOST}
          <p>Game lost, the word was : {word}</p>
        {:else}
          <p>Game error</p>
        {/if}
      </div>

      <!-- Keyboard -->
      <div class="flex flex-wrap justify-center w-4/6 lg:w-1/4">
        {#each "ABCDEFGHIJKLMNOPQRSTUVWXYZ" as letter}
          <div
            class="border-2 border-slate-700 rounded-full w-8 h-8 flex justify-center items-center text-white text-xl font-bold m-0.5 {guessed_letters.includes(
              letter
            )
              ? word.includes(letter)
                ? 'bg-green-500'
                : 'transparent'
              : 'bg-slate-700'}"
          >
            {letter}
          </div>
        {/each}
      </div>
    </div>
  {/if}
</main>

<svelte:window on:keydown={handleKeyDown} />
