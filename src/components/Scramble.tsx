import { JSX } from "solid-js";
import { scramble, newScramble } from "~/data";

export default function Scramble(): JSX.Element {
  function handleNewScramble(event: MouseEvent) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();
    newScramble();
  }

  return (
    <p
      id="scramble"
      class="my-5 p-10 text-lg text-center cursor-pointer fixed top-0 w-full"
      onClick={handleNewScramble}
    >
      {scramble().toString()}
    </p>
  );
}
