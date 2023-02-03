export default function getTimeDifference(date) {
  let currentDate = new Date();
  let difference = currentDate.getTime() - new Date(date).getTime();
  let seconds = Math.floor(difference / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  if (days >= 1) {
    return `${days} day(s) ago`;
  } else if (hours >= 1) {
    return `${hours} hour(s) ago`;
  } else if (minutes >= 1) {
    return `${minutes} minute(s) ago`;
  } else {
    return `${seconds} second(s) ago`;
  }
}
