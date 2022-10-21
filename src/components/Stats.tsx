import { JSX } from "solid-js";
import { average, averageOf5, averageOf12 } from "~/data";
import formatTime from "~/util/formatTime";

export default function Averages(): JSX.Element {
  return (
    <div class="flex flex-col items-center">
      <span>ao: {average() ? formatTime(average()) : "-"}</span>
      <span>ao5: {averageOf5() ? formatTime(averageOf5()) : "-"}</span>
      <span>ao12: {averageOf12() ? formatTime(averageOf12()) : "-"}</span>
    </div>
  );
}
