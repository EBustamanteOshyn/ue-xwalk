import { useState } from 'preact/hooks';
import { html } from 'htm/preact';

function Button({ action, children }) {
  return html`
    <button onClick=${action}>${children}</button>
  `;
}

export default function Counter() {
  const [count, setCount] = useState(0);

  return html`
    <div class="counter-container">
      <${Button} action=${() => setCount(count + 1)}>Increment<//>
      <input readonly value=${count} />
      <${Button} action=${() => setCount(count - 1)}>Decrement<//>
    </div>
  `;
}
