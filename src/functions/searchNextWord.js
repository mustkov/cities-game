export default function searchNextWord(startBaseCities, lastLetter) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (lastLetter === "" || lastLetter === "Ь") {
        resolve();
      } else {
        let a = startBaseCities.filter((item, index) => {
          return item.name.indexOf(lastLetter) === 0;
        });
        let random = randomCity(a);
        resolve(a[random].name);
      }
    }, 100);
  });
}

const randomCity = (arrayNextsWords) => {
  const randomCity = Math.floor(Math.random() * arrayNextsWords.length);
  return randomCity;
};
