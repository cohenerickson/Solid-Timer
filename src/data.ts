import { createSignal } from "solid-js";
import { randomScrambleForEvent } from "cubing/scramble";
import { Alg } from "cubing/alg";
import { v4 as uuidv4 } from "uuid";
import Session from "./types/Session";
import SessionProps from "./types/SessionProps";
import Solve from "./types/Solve";
import Dexie from "dexie";

const [scramble, setScramble] = createSignal(new Alg(""));
const [sessions, setSessions] = createSignal([] as Session[]);
const [averageOf5, setaverageOf5] = createSignal(0);
const [averageOf12, setaverageOf12] = createSignal(0);
const [average, setAverage] = createSignal(0);

let sessionsObj = [] as Session[];
let currentSessionObj = {} as Session;

async function openDb(): Promise<any> {
  const db: any = new Dexie("Database");
  db.version(2).stores({
    sessions: `id, solves, event`
  });
  return db;
}

async function fillData() {
  if (typeof window !== "undefined") {
    const db: any = await openDb();

    sessionsObj = await db.sessions.toArray();
    currentSessionObj =
      sessionsObj.find(
        (session: Session) =>
          (session.id = localStorage.getItem("currentSessionId"))
      ) ??
      sessionsObj[0] ??
      (await (async (): Promise<Session> => {
        const sessionData: Session = {
          id: uuidv4(),
          solves: [],
          event: "333"
        };
        await db.sessions.add(sessionData);
        return sessionData;
      })());
    await db.close();
    updateStorage();
    newScramble();
  }
}
fillData();

async function updateStorage() {
  const db: any = await openDb();
  await db.sessions.clear();
  await db.sessions.bulkAdd(sessionsObj);
  localStorage.setItem("currentSessionId", currentSessionObj.id);
}

export async function newScramble(): Promise<void> {
  setScramble(await randomScrambleForEvent(currentSessionObj.event));
  return;
}

export function createSession(props: SessionProps): void {
  const id = uuidv4();
  sessionsObj[id] = {
    id: id,
    solves: [],
    event: props.event
  };
  setSessions(sessionsObj);
  updateStorage();
}

export function deleteSession(id: string): void {
  delete sessionsObj[id];
  setSessions(sessionsObj);
  updateStorage();
}

export function addSolve(solve: Solve): void {
  currentSessionObj.solves.push(solve);
  sessionsObj[currentSessionObj.id] = currentSessionObj;
  updateStorage();
}

export function deleteSolve(solveId: string) {
  currentSessionObj.solves.filter((solve: Solve) => solve.id !== solveId);
  sessionsObj[currentSessionObj.id] = currentSessionObj;
  updateStorage();
}

export function setActiveSession(id: string) {
  currentSessionObj = sessionsObj[id];
  updateStorage();
}

export { scramble, sessions };
