export default function arrayDoneCities(doneCities, city) {
  return new Promise((resolve, reject) => {
    if (!doneCities.includes(city)) {
      resolve(city);
    } else {
      console.log("reject");
      reject(false);
    }
  });
}
