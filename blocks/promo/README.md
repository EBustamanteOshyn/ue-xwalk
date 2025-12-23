Promo block

A reusable promotional block that highlights a featured offer or campaign. The block includes a headline, supporting copy, a primary CTA, and an image whose visual position can be switched left/right via a modifier class or a `data-image-position` attribute.

Usage example (rendered HTML that your templates can produce):

```html
<section class="promo" data-image-position="right">
  <div class="promo__inner">
    <div class="promo__media">
      <picture>
        <img src="/path/to/image.jpg" alt="Descriptive alt text">
      </picture>
    </div>
    <div class="promo__content">
      <div class="promo__headline"><h2>Limited-time offer — 30% off</h2></div>
      <div class="promo__copy"><p>Save on our new product line. Offer valid through the end of the month.</p></div>
      <div class="promo__cta"><a class="button" href="/offers">Shop deals</a></div>
    </div>
  </div>
</section>
```

Accessibility notes
- Use meaningful alt text for the image via the `imageAlt` field.
- Use a clear CTA label and ensure link semantics (anchor with `href`) for keyboard/assistive access.

Design notes
- The image position is controlled purely via CSS class `promo--image-right` (or `data-image-position="right"`, which the block JS maps to the class) so no markup changes are required to flip the layout.
- The block stacks vertically on small screens and uses a two-column layout on larger screens for a strong visual hierarchy.
