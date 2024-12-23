const datetimeFormat = () => {
  const LocaleString = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
  });

  const splitString = LocaleString.split(", ");
  const date = splitString[0].split("/").reverse().join("-");
  const time = splitString[1].split(".").join(":");

  return `${date} ${time}`;
};

const dateFormat = (date) => {
  const newDate = new Date(date).toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
  });
  console.log(newDate);
  const splitString = newDate.split(", ");
  const formatDate = splitString[0]
    .split("/")
    .map((day) => (day.length < 2 ? `0${day}` : day))
    .reverse()
    .join("-");
  return formatDate;
};

export { datetimeFormat, dateFormat };
