export default function takeLastLetter(city) {
  return new Promise(function (resolve) {
    const temp = city.split("");
    let lastLetter = temp[temp.length - 1].toUpperCase();
    if (lastLetter === "Ь" || lastLetter === "Ё" || lastLetter === "Ъ") {
      lastLetter = temp[temp.length - 2].toUpperCase();
      resolve(lastLetter);
    } else {
      resolve(lastLetter);
    }
  });
}
