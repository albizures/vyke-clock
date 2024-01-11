export function fromMilliToTime(delta: number) {
  const rawHours = delta / 3_600_000;
  const hours = Math.floor(rawHours);
  const hoursInMilli = hours * 3_600_000;
  const rawMinutes = (delta - hoursInMilli) / 60_000;
  const minutes = Math.floor(rawMinutes);
  const minutesInMilli = minutes * 60_000;
  const rawSeconds = (delta - hoursInMilli - minutesInMilli) / 1000;
  const seconds = Math.floor(rawSeconds);
  const secondsInMilli = seconds * 1000;
  const milli = Math.floor(
    (delta - hoursInMilli - minutesInMilli - secondsInMilli) / 10
  );

  return {
    hours,
    minutes,
    seconds,
    milli,
  };
}

export type TimeValues = ReturnType<typeof fromMilliToTime>;
