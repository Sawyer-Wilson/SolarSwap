/* 
 * Nicely formats a date string into: 
 * [short month] [numeric day], [year] at [12-hour time][am/pm]
 * Example: Feb 21, 2023 at 10:32am
 */
function formatDate (dateString) {
  const dateObj = new Date(dateString)

  // format date
  const options = { month: "short", day: "numeric", year: "numeric" };
  const date = dateObj.toLocaleString("en-US", options);

  // format time
  const dayPeriod = (dateObj.getHours() < 12) ? "am" : "pm";
  const time = dateObj.getHours() % 12 + ":" + dateObj.getMinutes() + dayPeriod;

  return date + " at " + time;
}

export { formatDate }