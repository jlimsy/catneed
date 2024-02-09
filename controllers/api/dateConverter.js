const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function ISOToDateTime(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = monthNames[d.getMonth()];
  const day = ("0" + d.getDate()).slice(-2);
  const hours = ("0" + d.getHours()).slice(-2);
  const minutes = ("0" + d.getMinutes()).slice(-2);

  const formattedDateTime = `${day} ${month} ${year} ${hours}:${minutes}`;

  return formattedDateTime;
}

export function ISOToDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = monthNames[d.getMonth()];
  const day = ("0" + d.getDate()).slice(-2);

  const formattedDateTime = `${day} ${month} ${year}`;

  return formattedDateTime;
}
