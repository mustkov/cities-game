import arrayDoneCities from "./arrayDoneCities";

export default function searchNextWord(
  startBaseCities,
  lastLetter,
  donesCities
) {
  return new Promise((resolve) => {
    let a = startBaseCities.filter((item) => {
      return item.name.indexOf(lastLetter) === 0;
    });
    let random = randomCity(a);
    let city = a[random].name;
    let status = arrayDoneCities(donesCities, city)
      .then((data) => {
        resolve(data);
      })
      .catch((data) => {
        console.log(data);
        resolve(data);
      });
  });
}

const randomCity = (arrayNextsWords) => {
  const randomCity = Math.floor(Math.random() * arrayNextsWords.length);
  return randomCity;
};
