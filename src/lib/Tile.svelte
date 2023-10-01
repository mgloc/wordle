<script lang="ts">
  import {LetterState} from "./types";

  export let letter: string = "";
  export let state: LetterState = LetterState.UNSET;
  $: color =
    state === LetterState.UNSET
      ? "transparent"
      : state === LetterState.CORRECT
      ? "bg-green-500"
      : state === LetterState.INCORRECT
      ? "bg-gray-500"
      : state === LetterState.MISPOSITIONNED
      ? "bg-yellow-500"
      : "transparent";
</script>

<div class="">
  <div
    class="border-2 border-slate-700 w-12 h-12 m-1 rounded-sm text-white text-2xl font-bold text-center items-center flex justify-center {color}"
  >
    {letter}
  </div>
</div>
