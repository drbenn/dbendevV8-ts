import html from './page-load.html?raw';
import './page-load.css';

export class PageLoadComponent {
  element: HTMLElement;
  progressBar: HTMLElement;
  progressText: HTMLElement;

  constructor() {
    // this.element = document.createElement('div');
    // this.element.innerHTML = html;

    const template = document.createElement('template');
    template.innerHTML = html.trim();
    this.element = template.content.firstElementChild as HTMLElement;

    this.progressBar = this.element.querySelector('.progress-bar-fill')!;
    this.progressText = this.element.querySelector('.progress-bar-text')!;
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.element);
  }

  setProgress(percent: number): void {
    this.progressBar.style.width = `${percent}%`;
    this.progressText = this.element.querySelector('.progress-bar-text')!;
  }

  unmount(): void {
    this.element.remove();
  }
}