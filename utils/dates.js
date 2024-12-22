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
  return new Date(date).toISOString().split("T")[0];
};

export { datetimeFormat, dateFormat };
