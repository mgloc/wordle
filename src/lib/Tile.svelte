<script lang="ts">
  import {LetterState} from "./types";

  export let letter: string = "";
  export let state: LetterState = LetterState.UNSET;
  $: color =
    state === LetterState.UNSET
      ? "transparent"
      : state === LetterState.CORRECT
      ? "#3eaa42"
      : state === LetterState.INCORRECT
      ? "#3a3a3c"
      : state === LetterState.MISPOSITIONNED
      ? "#cd8729"
      : "transparent";
</script>

<div class="tile" style="background-color: {color}">
  <div class="tile-letter">{letter}</div>
</div>

<style>
  .tile {
    width: 100px;
    height: 100px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tile-letter {
    font-size: 50px;
  }
</style>
