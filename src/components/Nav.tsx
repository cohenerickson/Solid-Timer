import { JSX } from "solid-js";

interface NavProps {
  setStage: (stage: number) => void;
}

export default function Nav(props: NavProps): JSX.Element {
  return (
    <nav class="fixed bottom-0 flex items-center justify-center text-2xl gap-16 p-5 w-full">
      <i onClick={() => {props.setStage(-1)}} class="fa-regular fa-cube"></i>
      <i onClick={() => {props.setStage(0)}} class="fa-regular fa-clock"></i>
      <i onClick={() => {props.setStage(1)}} class="fa-regular fa-user"></i>
    </nav>
  );
}
