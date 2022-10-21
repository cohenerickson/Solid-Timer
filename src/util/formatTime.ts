export default function formatTime(time: number): string {
  return `${
    new Date(time).getUTCHours() > 0 ? new Date(time).getUTCHours() + ":" : ""
  }${
    new Date(time).getMinutes() > 0
      ? new Date(time).getMinutes().toString().length < 2 &&
        new Date(time).getUTCHours() > 0
        ? "0" + new Date(time).getMinutes() + ":"
        : new Date(time).getMinutes() + ":"
      : ""
  }${
    new Date(time).getSeconds().toString().length < 2 &&
    new Date(time).getMinutes() > 0
      ? "0" + new Date(time).getSeconds()
      : new Date(time).getSeconds()
  }.${
    new Date(time).getMilliseconds().toString().substring(0, 2).length < 2
      ? new Date(time).getMilliseconds().toString().substring(0, 2) + "0"
      : new Date(time).getMilliseconds().toString().substring(0, 2)
  }`;
}
