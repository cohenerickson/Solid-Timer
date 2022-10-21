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
const [currentSession, setCurrentSession] = createSignal({
  id: uuidv4(),
  event: "333",
  solves: [
    {
      time: 0
    }
  ]
} as Session);
const [average, setAverage] = createSignal(0);
const [averageOf5, setAverageOf5] = createSignal(0);
const [averageOf12, setAverageOf12] = createSignal(0);

let sessionsObj = [] as Session[];
let currentSessionObj = {} as Session;

async function openDb(): Promise<any> {
  const db: any = new Dexie("Database");
  db.version(2).stores({
    sessions: `id, solves, event`
  });
  return db;
}

// TODO: Make this work
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
    setCurrentSession(currentSessionObj);
    await db.close();
    calculateAverages();
    newScramble();
    updateStorage();
  }
}
fillData();

// TODO: Make this work
async function updateStorage() {
  const db: any = await openDb();
  await db.sessions.clear();
  await db.sessions.bulkAdd(sessionsObj);
  await db.close();
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
  calculateAverages();
  updateStorage();
}

export function deleteSolve(solveId: string) {
  currentSessionObj.solves.filter((solve: Solve) => solve.id !== solveId);
  sessionsObj[currentSessionObj.id] = currentSessionObj;
  calculateAverages();
  updateStorage();
}

export function setActiveSession(id: string) {
  currentSessionObj = sessionsObj[id];
  calculateAverages();
  updateStorage();
}

function calculateAverages() {
  const allTimes = currentSessionObj.solves.map((x: Solve): number => x.time);
  setAverage(calculateAverage(allTimes));
  setAverageOf5(
    allTimes.length >= 5 ? calculateAverage(allTimes.slice(-5)) : NaN
  );
  setAverageOf12(
    allTimes.length >= 12 ? calculateAverage(allTimes.slice(-12)) : NaN
  );
}

function calculateAverage(times: number[]): number {
  if (times.length < 3) return NaN;
  const averageMin = Math.min(...times);
  const averageMax = Math.max(...times);
  const average = times.reduce((a, b) => a + b, 0);
  return (average - averageMin - averageMax) / (times.length - 2);
}

export {
  scramble,
  sessions,
  average,
  averageOf5,
  averageOf12,
  currentSession,
  setCurrentSession
};
