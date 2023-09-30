<script lang="ts">
  import Tile from "./Tile.svelte";
  import {LetterState} from "./types";
  import {get_letters_states} from "./words/validator";

  export let guessed: boolean = false;
  export let word: string;
  export let guess: string = "";

  const get_states = (): LetterState[] => {
    if (guessed) {
      return get_letters_states(word, guess);
    } else {
      return Array.from({length: word.length}, (_) => LetterState.UNSET);
    }
  };

  let states = get_states();

  $: {
    states = get_states();
    guessed;
  }
</script>

<div class="row">
  {#each word as _, i}
    <Tile letter={(guess[i] || "").toUpperCase()} state={states[i]} />
  {/each}
</div>

<style>
  .row {
    display: flex;
    justify-content: center;
  }
</style>
