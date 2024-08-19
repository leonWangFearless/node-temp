const $getJson = function (pathName?: string) {
  return new Promise((resolve, reject) => {
    fetch(`/public/json`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


export { $getJson };