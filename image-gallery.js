var imageGallery = (function () {
  const d = document;
  const b = document.body;

  var closeFrame = function() {
    let overlay = d.querySelector('.gallery__overlay');

    b.removeChild(overlay);
    window.removeEventListener('keydown', handleClose);
  };

  var handleClose = function(e) {
    if (event.keyCode === 27 || e.target == this) {
      closeFrame();
    }
  };

  var createOverlay = function() {
    let overlay = d.createElement('div');

    overlay.setAttribute('class', 'gallery__overlay');

    return overlay;
  };

  var createFrame = function() {
    let frame = d.createElement('div');

    frame.setAttribute('class', 'gallery__frame');

    return frame;
  };

  var createFramedImage = function(image) {
    let framedImage = d.createElement('img');

    framedImage.setAttribute('class', 'gallery__framed-image');
    framedImage.src = image.dataset.image;
    framedImage.alt = image.alt;

    return framedImage;
  };


  var renderFrame = function(image) {
    let overlay = createOverlay();
    let frame = createFrame();
    let framedImage = createFramedImage(image);

    overlay.addEventListener('click',handleClose);

    overlay.appendChild(frame);
    frame.appendChild(framedImage);

    b.appendChild(overlay);
  };

  var handleImageClick = function(e) {
    let imageButton = e.target;
    let image = imageButton.querySelector('img');

    renderFrame(image);
    window.addEventListener('keydown', handleClose);
  };

  var setupImages = function() {
    let imageButtons = d.querySelectorAll('[data-gallery-image-button]');

    imageButtons.forEach((i) => {
      i.addEventListener('click', handleImageClick);
    });
  };

  var init = function() {
    let gallerySection = d.querySelector('[data-gallery]');

    if (typeof gallerySection === 'undefined' || gallerySection === null) return;
    setupImages();
  };

  return {
    init: init
  }
})();
imageGallery.init();
