export default function takeFirstLetter(city) {
  const temp = city.split("");
  let firstLetter = temp[0].toUpperCase();
  return firstLetter;
}
