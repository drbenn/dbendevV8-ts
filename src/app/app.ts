import html from './app.html?raw';
import './app.css';
import { PageLoadComponent } from '../page-load/page-load';

export class AppComponent {
  element: HTMLElement;
  pageLoadComponent: PageLoadComponent | undefined;
  

  constructor() {
    this.element = document.createElement('div');
    this.element.innerHTML = html;
  }

  mount(parent: HTMLElement) {
    parent.appendChild(this.element);

    // start lazy loading three component once appComponent is loaded
    this.lazyLoadThreeComponent();
  }

  async lazyLoadThreeComponent() {
    this.pageLoadComponent = new PageLoadComponent();
    this.pageLoadComponent.mount(document.body);

    
    // Simulate loading progress (replace this with real progress if loading assets)
    for (let progress = 0; progress <= 100; progress += 2) {
      await new Promise(resolve => setTimeout(resolve, 3000));
      this.pageLoadComponent!.setProgress(progress);
    }

    // Now load ThreeComponent dynamically
    const ThreeModule = await import('../three/three');
    const ThreeComponent = ThreeModule.ThreeComponent;
    
    const onProgress = (percent: number) => { this.pageLoadComponent?.setProgress(percent); };
    const threeComponent = new ThreeComponent(onProgress);
    threeComponent.mount(document.body); // absolute background

    // Remove progress bar
    this.pageLoadComponent!.unmount();
  }
  
}
