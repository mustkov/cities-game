export default function checkStatusCity(startBaseCities, city) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const cityId = startBaseCities.filter((val) => {
        return val.name === city;
      });
      if (cityId.length === 0) {
        reject(alert("Такого города не существует!"));
      }
      resolve(true);
    }, 100);
  });
}
