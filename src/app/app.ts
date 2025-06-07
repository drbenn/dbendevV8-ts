import html from './app.html?raw';
import './app.css';

export class AppComponent {
  element: HTMLElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.innerHTML = html;
  }

  mount(parent: HTMLElement) {
    parent.appendChild(this.element);
  }
}