import { JSX } from "solid-js";
import { best, averageOf5, averageOf12 } from "~/data";
import formatTime from "~/util/formatTime";

export default function Averages(): JSX.Element {
  return (
    <div class="flex flex-col items-center">
      <span>best: {best() ? formatTime(best()) : "-"}</span>
      <span>ao5: {averageOf5() ? formatTime(averageOf5()) : "-"}</span>
      <span>ao12: {averageOf12() ? formatTime(averageOf12()) : "-"}</span>
    </div>
  );
}
