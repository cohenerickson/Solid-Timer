import WCAEvent from "./WCAEvent";
import Solve from "./Solve";

export default interface Session {
  id: string;
  solves: Solve[];
  event: WCAEvent;
}
