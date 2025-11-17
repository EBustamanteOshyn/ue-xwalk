import { render } from 'preact';
import { html } from 'htm/preact';
import { Counter } from './toDoModule.js';

export default function decorate(block) {
  render(html`<${Counter} />`, block);
}
