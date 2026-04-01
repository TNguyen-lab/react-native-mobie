import dayjs from "dayjs";
import moment from "moment";

export const parseDate = (date) => {
  try {
    if (!date) return "";
    const formatDate = new Date(date);
    let dd = addZero(formatDate.getDate());
    let mm = addZero(formatDate.getMonth() + 1); //January is 0!

    let yy = formatDate.getFullYear();
    return dd + "-" + mm + "-" + yy;
  } catch (error) {
    console.log(error);
  }
};
export const parseFullDatetime = (date) => {
  try {
    if (!date) return "";
    const formatDate = new Date(date);
    let dd = addZero(formatDate.getDate());
    let mm = addZero(formatDate.getMonth() + 1); //January is 0!

    let yy = formatDate.getFullYear();
    return "Ngày " + dd + " tháng " + mm + " năm " + yy;
  } catch (error) {
    console.log(error);
  }
};
export const parseDatetime = (date) => {
  try {
    if (!date) return "";
    const formatDate = new Date(date);
    let HH = addZero(formatDate.getHours("HH"));
    let MM = addZero(formatDate.getMinutes());
    // let ss = addZero(formatDate.getSeconds());
    let dd = addZero(formatDate.getDate());
    let mm = addZero(formatDate.getMonth() + 1); //January is 0!

    let yy = formatDate.getFullYear();
    return dd + "-" + mm + "-" + yy + " " + HH + ":" + MM;
  } catch (error) {
    console.log(error);
  }
};
export const parseTime = (date) => {
  try {
    if (!date) return "";
    const formatDate = new Date(date);
    let HH = addZero(formatDate.getHours("HH"));
    let MM = addZero(formatDate.getMinutes());
    // let ss = addZero(formatDate.getSeconds());
    return HH + ":" + MM;
  } catch (error) {
    console.log(error);
  }
};
export const parseDateTimeZone = (datetime) => {
  if (!datetime) return null;
  return moment(datetime).add(7, "h");
};
export const parseHoursAndMinutes = (totalSeconds) => {
  if (!totalSeconds) return '00:00:00'
  const totalMinutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds % 60 + "";
  const hours = Math.floor(totalMinutes / 60) + "";
  const minutes = totalMinutes % 60 + "";
  let parseS = seconds.padStart(2, '0');
  parseS = hours.padStart(2, '0') + ":" + minutes.padStart(2, '0') + ":" + seconds.padStart(2, '0')
  return parseS;
};
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export const addHours = (date, h) => {
  date.setTime(date.getTime() + h * 60 * 60 * 1000);
  return date;
};


export function parseDateHH(date) {
  return date ? dayjs(date).format("DD/MM/YYYY HH:mm") : "";
}
export const parseWeekOfYear = (date) => {
  try {
    if (!date) return "";
    const formatDate = new Date(date);
    const firtDayYear = new Date(formatDate.getFullYear(), 0, 0)
    const timePeriodYear = formatDate - firtDayYear;
    const weekOfYear = (timePeriodYear / (1000 * 60 * 60 * 24 * 7));
    return "Tuần " + Math.ceil(weekOfYear) + " năm " + formatDate.getFullYear();
  } catch (error) {
    console.log(error);
  }
}
export const parseDateMonth = (date) => {
  try {
    if (!date) return "";
    const formatDate = new Date(date);
    formatDate.setHours(formatDate.getHours() + 7);
    let dd = addZero(formatDate.getDate());
    let mm = addZero(formatDate.getMonth() + 1); //January is 0!

    let yy = formatDate.getFullYear();
    return mm + "-" + yy;
  } catch (error) {
    console.log(error);
  }
};

export const parseDateYear = (date) => {
  try {
    if (!date) return "";
    const formatDate = new Date(date);
    formatDate.setHours(formatDate.getHours() + 7);
    let dd = addZero(formatDate.getDate());
    let mm = addZero(formatDate.getMonth() + 1); //January is 0!

    let yy = formatDate.getFullYear();
    return yy;
  } catch (error) {
    console.log(error);
  }
};
export function formatMillisToHHMM(ms) {
  if (!ms || isNaN(ms)) return "00:00";
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

export function formatMillisToHHMMSS(ms) {
  if (!ms || isNaN(ms)) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}