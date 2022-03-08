export default function checkStatusCity(startBaseCities, city) {
  return new Promise((resolve, reject) => {
    const cityId = startBaseCities.filter((val) => {
      return val.name === city;
    });
    if (cityId.length === 0) {
      reject("Такого города не существует!");
    }
    resolve(true);
  });
}
