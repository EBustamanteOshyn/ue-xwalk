# Promo block

Usage:

- Add the block to a section or page and author headline, supporting copy, CTA, and an image.
- To change image position without changing markup, add one of the following to the block element:
  - `image-left` or `data-image-position="left"` — image appears left of content
  - (default) `image-right` or no modifier — image appears right of content

Authoring examples (HTML):

```html
<div class="block promo image-left">
  <img src="/images/promo.jpg" alt="Promotional image" />
  <h2>Holiday Sale — Save 30%</h2>
  <p>For a limited time only, get 30% off our seasonal collection. Offer ends soon.</p>
  <a href="/offers" class="button">Shop the sale</a>
</div>
```

Key features:
- Responsive: stacks vertically on small screens (<600px)
- Accessible: heading level normalized to `h2`, CTA receives `aria-label` if not present, images are kept with provided alt text
- Styles scoped to `.promo` and can be overridden with CSS custom properties (see `promo.css`)

Content model: defined in `blocks/promo/_promo.json` (fields: `headline`, `copy`, `image`, `imageAlt`, `ctaLabel`, `ctaUrl`, `imagePosition`).
