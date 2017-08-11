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
  var image = new Image();
  image.src = src;
  image.removeAttribute('crossOrigin');
  if (src.match(/^https?:\/\/|^\/\//)) {
    image.setAttribute('crossOrigin', 'anonymous');
  }
  return new Promise(resolve => {
    image.onload = () => {
      resolve(image);
    };
    image.src = src;
  });
}

function overlay(imageUrl, overlayUrl) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  return new Promise(resolve => {
    loadImage(imageUrl)
      .then(image => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        loadImage(overlayUrl).then(overlay => {
          context.drawImage(overlay, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg'));
        });
      });
  });
}

function grayscaleAndSize(src) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  return new Promise(resolve => {
    loadImage(src)
      .then(image => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        var coloredImage = context.getImageData(0, 0, canvas.width, canvas.height);
        var grayImage = grayscalePixels(coloredImage);
        context.putImageData(grayImage, 0, 0);
        resolve({ size: Math.min(image.width, image.height), image: canvas.toDataURL('image/jpeg') });
      });
  });
}

function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: 'image/jpeg' });
}

export default { overlay, grayscaleAndSize, dataURItoBlob };
