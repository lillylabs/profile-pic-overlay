const DIMENTIONS = {
  HEIGHT: 1600,
  WIDTH: 1600
};

function grayscalePixels(pixels) {
  var d = pixels.data;
  for (var i = 0; i < d.length; i += 4) {
    var r = d[i];
    var g = d[i + 1];
    var b = d[i + 2];
    // CIE luminance for the RGB
    // The human eye is bad at seeing red and blue, so we de-emphasize them.
    var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    d[i] = d[i + 1] = d[i + 2] = v;
  }
  return pixels;
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

function overlay(orginalImage, overlayImage) {
  const canvas = document.createElement('canvas');
  canvas.width = DIMENTIONS.WIDTH;
  canvas.height = DIMENTIONS.HEIGHT;

  const context = canvas.getContext('2d');

  return new Promise(resolve => {
    loadImage(orginalImage)
      .then(image => {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        loadImage(overlayImage).then(image => {
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg'));
        });
      });
  });
}

function grayscale(image) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  return new Promise(resolve => {
    loadImage(image)
      .then(image => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        var coloredImage = context.getImageData(0, 0, canvas.width, canvas.height);
        var grayImage = grayscalePixels(coloredImage);
        context.putImageData(grayImage, 0, 0);
        resolve(canvas.toDataURL('image/jpeg'));
      });
  });
}

export default { overlay, grayscale };
