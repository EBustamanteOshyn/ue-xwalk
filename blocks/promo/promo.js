export default function decorate(block) {
  block.classList.add('promo');

  // Determine image position: prefer data attribute or class, else look for a field containing 'left'/'right'
  let position = block.dataset.imagePosition || (block.classList.contains('image-left') ? 'left' : null);
  if (!position) {
    // look for any child that contains plain text 'left' or 'right'
    [...block.children].forEach((child) => {
      const text = child.textContent.trim().toLowerCase();
      if (text === 'left' || text === 'right') {
        position = text;
        // remove the helper field so it doesn't show up
        child.remove();
      }
    });
  }
  if (!position) position = 'right';
  block.classList.add(position === 'left' ? 'promo--image-left' : 'promo--image-right');

  // Prepare content and media wrappers
  const content = document.createElement('div');
  content.className = 'promo__content';
  const media = document.createElement('div');
  media.className = 'promo__media';

  // CMS may render fields as separate child blocks; try to map them safely:
  // Expected order: headline, copy, image, cta
  const children = [...block.children];

  // Helper: extract first heading if present
  let heading = block.querySelector('h1,h2,h3,h4,h5,h6');
  if (!heading && children[0]) {
    const first = children[0];
    // if first child doesn't contain picture or anchor, use it as heading
    if (!first.querySelector('picture') && !first.querySelector('img') && !first.querySelector('a')) {
      const h2 = document.createElement('h2');
      h2.innerHTML = first.innerHTML.trim();
      heading = h2;
      first.remove();
    }
  } else if (heading && heading.tagName.toLowerCase() !== 'h2') {
    const h2 = document.createElement('h2');
    h2.innerHTML = heading.innerHTML;
    heading.replaceWith(h2);
    heading = h2;
  }
  if (heading) content.appendChild(heading);

  // Supporting copy: prefer existing <p>, else next child
  let copyNodes = [...block.querySelectorAll('p')];
  if (copyNodes.length === 0 && children[0]) {
    // if first child was not used for heading, try using children[0] as copy
    const next = children[0];
    if (next) {
      const p = document.createElement('p');
      p.innerHTML = next.innerHTML.trim();
      copyNodes = [p];
      next.remove();
    }
  }
  copyNodes.forEach((p) => content.appendChild(p));

  // Media: find first image or picture anywhere
  const picture = block.querySelector('picture, img');
  if (picture) {
    // if picture is nested inside a wrapper, move the picture element
    media.appendChild(picture);
  }

  // CTA: find first anchor anywhere, but handle cases where anchor has no readable label
  let cta = block.querySelector('a');
  if (!cta) {
    // sometimes CTA may be authored as a field with raw anchor HTML inside a div
    const anchorHtmlHolder = [...children].find((c) => c.innerHTML && c.innerHTML.trim().startsWith('<a'));
    if (anchorHtmlHolder) {
      // parse and extract anchor
      const tmp = document.createElement('div');
      tmp.innerHTML = anchorHtmlHolder.innerHTML.trim();
      const parsedA = tmp.querySelector('a');
      if (parsedA) {
        cta = parsedA;
        anchorHtmlHolder.remove();
      }
    }
  }

  if (cta) {
    // If anchor text is empty or a placeholder, replace with a sensible label
    const txt = (cta.textContent || '').trim();
    if (!txt || txt === '#') {
      // try to get text from data attribute or default
      const label = block.dataset.ctaLabel || 'Learn more';
      cta.textContent = label;
    }
    cta.classList.add('promo__cta', 'button');
    if (!cta.getAttribute('aria-label')) cta.setAttribute('aria-label', cta.textContent.trim());
    content.appendChild(cta);
  }

  // Now replace block children with our content and media wrappers (content first)
  if (media.children.length) {
    block.replaceChildren(content, media);
  } else {
    block.replaceChildren(content);
  }

  // Ensure a heading exists
  if (!heading) {
    const h2 = document.createElement('h2');
    h2.textContent = 'Featured offer';
    content.insertBefore(h2, content.firstChild);
  }

  // Accessibility helper
  const sr = document.createElement('span');
  sr.className = 'sr-only';
  sr.textContent = 'Promotional content';
  block.appendChild(sr);
}
