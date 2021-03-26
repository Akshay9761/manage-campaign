/**
 * Function that returns formatted date ex: Mar 2021, 25
 * @author   Akshay
 * @param    {Date} date
 */
export const getFormattedDate = (date) => {
  let d = new Date(date);
  let month = d.toLocaleString("default", { month: "short" });
  let day = d.getDate();
  let year = d.getFullYear();
  return `${month} ${year}, ${day}`;
};

/**
 * Function that calculate difference between two dates
 * @author   Akshay
 * @param    {Date} date
 */
export const getDayDifference = (date) => {
  let d1 = new Date(date);
  const d2 = new Date();
  let dateOne = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
  let dateTwo = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
  const diffTime = Math.abs(dateTwo - dateOne);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Function that calculate two dates are equal
 * @author   Akshay
 * @param    {Date} d1
 * @param    {Date} d2
 */
export const sameDate = (d1, d2) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();
