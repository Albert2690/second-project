export default function formatData(date, config) {
    console.log(date)
    const defaultOptions = { day: "numeric", month: "short", year: "numeric" };
    const options = config ? config : defaultOptions;
    return new Date(date).toLocaleDateString("en-us", options);
  }
  