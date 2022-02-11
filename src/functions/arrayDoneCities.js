export default function arrayDoneCities(doneCities, city) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!doneCities.includes(city)) {
        resolve(city);
      } else {
        reject(alert("Такой город уже был!"));
      }
    }, 100);
  });
}
