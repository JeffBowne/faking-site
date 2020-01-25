var imageGallery = (function () {
  const d = document;
  const b = document.body;

  var closeFrame = function() {
    let overlay = d.querySelector('.press-gallery__overlay');

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

    overlay.setAttribute('class', 'press-gallery__overlay');

    return overlay;
  };

  var createCloseButton = function() {
    let closeButton = d.createElement('button');
    let closeIcon = d.createElement('i');

    closeButton.setAttribute('class', 'press-gallery__close-button');
    closeIcon.setAttribute('class', 'fa fa-times');
    closeButton.appendChild(closeIcon);

    return closeButton;
  };

  var createFrame = function() {
    let frame = d.createElement('div');

    frame.setAttribute('class', 'press-gallery__frame');

    return frame;
  };

  var createFramedImage = function(image) {
    let framedImage = d.createElement('img');

    framedImage.setAttribute('class', 'press-gallery__framed-image');
    framedImage.src = image.dataset.image;
    framedImage.alt = image.alt;

    return framedImage;
  };


  var renderFrame = function(image) {
    let overlay = createOverlay();
    let closeButton = createCloseButton();
    let frame = createFrame();
    let framedImage = createFramedImage(image);

    overlay.addEventListener('click',handleClose);
    closeButton.addEventListener('click',handleClose);

    overlay.appendChild(frame);
    frame.appendChild(closeButton);
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
    let imageButtons = d.querySelectorAll('[data-press-gallery-image-button]');
    imageButtons.forEach((i) => {
      i.addEventListener('click', handleImageClick);
    });
  };

  var init = function() {
    let gallerySection = d.querySelector('[data-press-gallery]');

    if (typeof gallerySection === 'undefined' || gallerySection === null) return;
    setupImages();
  };

  return {
    init: init
  }
})();
imageGallery.init();
