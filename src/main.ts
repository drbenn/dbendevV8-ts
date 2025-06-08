import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
import { AppComponent } from './app/app.ts';
import { ThreeComponent } from './three/three.ts';

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
    // <a href="https://vite.dev" target="_blank">
    //   <img src="${viteLogo}" class="logo" alt="Vite logo" />
    // </a>
    // <a href="https://www.typescriptlang.org/" target="_blank">
    //   <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    // </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//     <div class="mb-5">
//         <h1 class="text-3xl font-bold underline">    Hello world!  </h1>
//     </div>
//     <button class="btn" onclick="my_modal_1.showModal()">open modal</button>
//     <dialog id="my_modal_1" class="modal">
//       <div class="modal-box">
//         <h3 class="text-lg font-bold">Hello!</h3>
//         <p class="py-4">Press ESC key or click the button below to close</p>
//         <div class="modal-action">
//           <form method="dialog">
//             <!-- if there is a button in form, it will close the modal -->
//             <button class="btn">Close</button>
//           </form>
//         </div>
//       </div>
//     </dialog>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

// `;

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);

// Mount your component
const appComponent = new AppComponent();
appComponent.mount(document.querySelector<HTMLDivElement>('#app')!);

// const threeComponent = new ThreeComponent();
// threeComponent.mount(document.querySelector<HTMLDivElement>('#app')!);

// const ThreeModule = await import('./three/three.ts/ThreeComponent');
// const ThreeComponent = ThreeModule.ThreeComponent;