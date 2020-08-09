export default function convertHourToMinutes(time: string) {
  const splitTime = time.split(":").map(Number);
  const hour = splitTime[0];
  const minutes = splitTime[1];

  const timeInMinutes = 60 * hour + minutes;
  return timeInMinutes;
}
