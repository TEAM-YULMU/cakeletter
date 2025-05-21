export const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function getOpenDayMap(bitmask: number): Record<string, boolean> {
  return WEEKDAYS.reduce(
    (result, day, index) => {
      result[day] = Boolean(bitmask & (1 << index));
      return result;
    },
    {} as Record<string, boolean>
  );
}
