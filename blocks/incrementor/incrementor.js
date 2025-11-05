export default function decorate(block) {
  const [incrementorWrapper] = block.children;

  const div = document.createElement('div');
  div.setAttribute('x-data', '{ count: 0 }');
  div.innerHTML = `
    <button x-on:click="count++">Increment</button>
    <span x-text="count"></span>
    `;
  incrementorWrapper.replaceChildren(div);

  if (!window.Alpine) {
    return;
  }
  /* global Alpine */
  Alpine.initTree(div);
}
