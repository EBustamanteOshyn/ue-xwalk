// Promo block utility: toggle modifier class according to data-image-position or .image-right / .image-left classes
(function () {
  function applyImagePosition(block) {
    var pos = block.dataset.imagePosition || '';
    if (!pos) {
      // fallback to modifier classes if editor/template sets them
      if (block.classList.contains('image-right')) pos = 'right';
      else if (block.classList.contains('image-left')) pos = 'left';
    }
    block.classList.remove('promo--image-right', 'promo--image-left');
    if (pos === 'right') block.classList.add('promo--image-right');
    if (pos === 'left') block.classList.add('promo--image-left');
  }

  window.addEventListener('load', function () {
    document.querySelectorAll('.promo').forEach(function (block) {
      applyImagePosition(block);
    });
  });
})();