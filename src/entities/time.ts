export const SEC_IN_MS = 1000;
export const MIN_IN_MS = SEC_IN_MS * 60;
export const HOUR_IN_MS = MIN_IN_MS * 60;

export function fromMilliToTime(delta: number): TimeValues {
  const rawHours = delta / HOUR_IN_MS;
  const hours = Math.floor(rawHours);
  const hoursInMilli = hours * HOUR_IN_MS;
  const rawMinutes = (delta - hoursInMilli) / MIN_IN_MS;
  const minutes = Math.floor(rawMinutes);
  const minutesInMilli = minutes * MIN_IN_MS;
  const rawSeconds = (delta - hoursInMilli - minutesInMilli) / SEC_IN_MS;
  const seconds = Math.floor(rawSeconds);
  const secondsInMilli = seconds * SEC_IN_MS;
  const millis = Math.floor(
    (delta - hoursInMilli - minutesInMilli - secondsInMilli) / 10
  );

  return {
    hours,
    minutes,
    seconds,
    millis,
  };
}

export type TimeValues = {
  hours: number;
  minutes: number;
  seconds: number;
  millis: number;
};

export type StrTimeValues = {
  [TKey in keyof TimeValues]: string;
};

export function getTimeValues(date: Date): StrTimeValues {
  return {
    hours: zeroPad(date.getHours()),
    minutes: zeroPad(date.getMinutes()),
    seconds: zeroPad(date.getSeconds()),
    millis: zeroPad(date.getMilliseconds()),
  };
}

export function zeroPad(value: number) {
  const strValue = `${value}`;

  if (strValue.length === 1) {
    return `0${strValue}`;
  }

  return strValue;
}
