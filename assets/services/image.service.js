const DIMENTIONS = {
  HEIGHT: 1600,
  WIDTH: 1600
};

function loadImage(src) {
  return new Promise(resolve => {
    const image = document.createElement('img');
    image.onload = () => {
      resolve(image);
    };
    image.src = src;
  });
}

function filter(orginalImageSrc, overlayImageSrc) {
  const canvas = document.createElement('canvas');
  canvas.width = DIMENTIONS.WIDTH;
  canvas.height = DIMENTIONS.HEIGHT;

  const ctx = canvas.getContext('2d');

  return new Promise(resolve => {
    console.log(orginalImageSrc);
    loadImage(orginalImageSrc)
      .then(image => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        loadImage(overlayImageSrc).then(image => {
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg'));
        });
      });
  });
}

export { filter };
