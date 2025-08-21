export default function ShowTime(timestamp: string) {
  // Trim microseconds to milliseconds and create Date object
  const date = new Date(timestamp);

  // Format to readable time (HH:MM in 24-hour format)
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Use 24-hour format
  });

  return formattedTime;
}
