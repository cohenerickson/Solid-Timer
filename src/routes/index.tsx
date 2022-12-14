import { createSignal } from "solid-js";
import Scramble from "~/components/Scramble";
import { currentSession, addSolve, scramble, newScramble } from "~/data";
import Stats from "~/components/Stats";
import Nav from "~/components/Nav";
import { v4 as uuidv4 } from "uuid";
import formatTime from "~/util/formatTime";

import "../data";

export default function Home() {
  const [stage, setStage] = createSignal(0);
  const [solveState, setSolveState] = createSignal(0);
  const [time, setTime] = createSignal(currentSession().solves.at(-1).time);
  let i = 0;

  let startTime = 0;

  function handleDown(event) {
    if (event.target.id === "scramble") return;
    if (solveState() === 3) {
      const time = Date.now() - startTime;
      addSolve({
        scramble: scramble().toString(),
        time: time,
        id: uuidv4()
      });
      setSolveState(0);
      newScramble();
      setTime(time);
    } else {
      i++;
      const startingI = i;
      setSolveState(1);
      setTimeout(() => {
        if (i === startingI) setSolveState(2);
      }, 500);
    }
  }

  function handleUp() {
    i++;
    if (solveState() === 2) {
      startTime = Date.now();
      setSolveState(3);
      requestAnimationFrame(updateTime);
    } else {
      setSolveState(0);
    }
  }

  function updateTime() {
    setTime(Date.now() - startTime);
    if (solveState() === 3) requestAnimationFrame(updateTime);
  }

  let isSpaceDown = false;
  window.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === " ") {
      if (!isSpaceDown) handleDown(event);
      isSpaceDown = true;
    }
  });

  window.addEventListener("keyup", (event: KeyboardEvent) => {
    if (event.key === " ") {
      handleUp();
      isSpaceDown = false;
    }
  });

  window.addEventListener("contextmenu", (event: MouseEvent) => {
    event.preventDefault();
  });

  return (
    <main class="h-full">
      <div class={`${stage() < 0 ? "block" : "hidden"}`}></div>
      <div
        class={`${stage() == 0 ? "block" : "hidden"} h-full`}
        onPointerDown={handleDown}
        onMouseUp={handleUp}
        onTouchEnd={handleUp}
      >
        <Scramble></Scramble>
        <div class="flex flex-col items-center justify-center text-center h-full">
          <p
            class={`text-2xl ${
              solveState() === 0
                ? ""
                : solveState() === 1
                ? "text-red-500"
                : solveState() === 2
                ? "text-green-500"
                : ""
            }`}
          >
            {formatTime(time())}
          </p>
          <Stats></Stats>
        </div>
      </div>
      <div class={`${stage() > 0 ? "block" : "hidden"}`}></div>
      <Nav setStage={setStage}></Nav>
    </main>
  );
}
