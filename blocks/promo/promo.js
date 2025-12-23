export default function decorate(block) {
  block.classList.add('promo');

  // Determine image position class (default: right)
  const position = block.dataset.imagePosition || (block.classList.contains('image-left') ? 'left' : 'right');
  block.classList.add(position === 'left' ? 'promo--image-left' : 'promo--image-right');

  // Find the first image in the block, if any
  const img = block.querySelector('img');

  // Create content and media wrappers
  const content = document.createElement('div');
  content.className = 'promo__content';

  const media = document.createElement('div');
  media.className = 'promo__media';

  // Move heading (first h*) or first paragraph to heading
  let heading = block.querySelector('h1,h2,h3,h4,h5,h6');
  if (!heading) {
    // try strong in p or first p
    const strong = block.querySelector('p strong');
    if (strong) {
      heading = document.createElement('h2');
      heading.innerHTML = strong.innerHTML;
      strong.closest('p')?.remove();
    } else if (block.querySelector('p')) {
      heading = document.createElement('h2');
      heading.textContent = block.querySelector('p').textContent;
      block.querySelector('p').remove();
    }
  } else if (heading.tagName.toLowerCase() !== 'h2') {
    // Ensure heading is h2 for consistent hierarchy
    const h2 = document.createElement('h2');
    h2.innerHTML = heading.innerHTML;
    heading.replaceWith(h2);
    heading = h2;
  }

  if (heading) content.appendChild(heading);

  // Move the first paragraph(s) into content as supporting copy
  const paragraphs = [...block.querySelectorAll('p')];
  paragraphs.forEach((p) => content.appendChild(p));

  // Move CTA (first anchor) into content and style
  const cta = block.querySelector('a');
  if (cta) {
    cta.classList.add('promo__cta', 'button');
    // Ensure link has meaningful label for screen readers
    if (!cta.getAttribute('aria-label')) cta.setAttribute('aria-label', cta.textContent.trim() || 'Call to action');
    content.appendChild(cta);
  }

  // Move image into media wrapper
  if (img) {
    // Move (not clone) to preserve src references
    media.appendChild(img);
  }

  // Clear original block children and append in DOM order: content then media
  block.replaceChildren(content, media);

  // Accessibility: make sure heading exists
  if (!heading) {
    const h2 = document.createElement('h2');
    h2.textContent = 'Featured offer';
    content.insertBefore(h2, content.firstChild);
  }

  // Add a visually-hidden span announcing it's a promo to assistive tech
  const sr = document.createElement('span');
  sr.className = 'sr-only';
  sr.textContent = 'Promotional content';
  block.appendChild(sr);
}
