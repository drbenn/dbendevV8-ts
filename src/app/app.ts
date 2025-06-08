import html from './app.html?raw';
import './app.css';
import { PageLoadComponent } from '../page-load/page-load';

export class AppComponent {
  element: HTMLElement;
  pageLoadComponent: PageLoadComponent | undefined;
  

  constructor() {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    this.element = template.content.firstElementChild as HTMLElement;
  }

  mount(parent: HTMLElement) {
    parent.appendChild(this.element);

    // start lazy loading three component once appComponent is loaded
    this.lazyLoadThreeComponent();
  }

  async lazyLoadThreeComponent() {
    this.pageLoadComponent = new PageLoadComponent();
    console.log(document)
    // this.pageLoadComponent.mount(document.body);
    const pageLoadSlot = this.element.querySelector<HTMLDivElement>('#page-load-component-slot');
    if (pageLoadSlot) {
      this.pageLoadComponent.mount(pageLoadSlot);
    } else {
      console.warn('PageLoadComponent slot not found!');
    }

    
    // Simulate loading progress (replace this with real progress if loading assets)
    for (let progress = 0; progress <= 100; progress += 2) {
      await new Promise(resolve => setTimeout(resolve, 30));
      this.pageLoadComponent!.setProgress(progress);
    }

    // Now load ThreeComponent dynamically
    const ThreeModule = await import('../three/three');
    const ThreeComponent = ThreeModule.ThreeComponent;
    
    const onProgress = (percent: number) => { 
      console.log(percent)
      this.pageLoadComponent?.setProgress(percent); 
    
    };
    const threeComponent = new ThreeComponent(onProgress);
    // threeComponent.mount(document.body); // absolute background
      const threeSlot = this.element.querySelector<HTMLDivElement>('#three-component-slot');
  if (threeSlot) {
    // Remove progress bar
    this.pageLoadComponent!.unmount();
    // Add Three background
    threeComponent.mount(threeSlot);
  } else {
    console.warn('ThreeComponent slot not found!');
  }


  }
  
}
