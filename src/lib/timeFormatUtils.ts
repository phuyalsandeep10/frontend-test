export default function ShowTime(timestamp: string) {
  const date = new Date(timestamp);
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hour12: true,
  }).format(date);

  return formattedTime;
}
