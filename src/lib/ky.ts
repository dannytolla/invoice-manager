import ky from "ky";

const kyInstance = ky.create({
  parseJson: (text) =>
    JSON.parse(text, (key, value) => {
      if (key.endsWith("At")) return new Date(value);
      return value;
    }),
}); // If a key ends with "At", it means that the value associated with that key represents a date. else, return the value

export default kyInstance;
