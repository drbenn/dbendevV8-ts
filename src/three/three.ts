import * as THREE from 'three';
import html from './three.html?raw';
import './three.css';

export class ThreeComponent {
  element: HTMLElement;
  container: HTMLElement;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  cube: THREE.Mesh;
  animationFrameId: number | undefined;

  constructor() {
    // Create component root
    this.element = document.createElement('div');
    this.element.innerHTML = html;

    // Get the container where Three.js canvas will be injected
    this.container = this.element.querySelector('.three-container')!;

    // Initialize Three.js
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);


    this.container.appendChild(this.renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.camera.position.z = 5;

    // Handle window resize
    window.addEventListener('resize', this.onWindowResize);
  }

  mount(parent: HTMLElement) {
    parent.appendChild(this.element);

    // Now the container is in the DOM → update size and aspect properly
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();

    this.animate();
  }

  animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  };

  onWindowResize = () => {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  };

  // Optional cleanup method — useful if you want to unmount the component later
  unmount() {
    cancelAnimationFrame(this.animationFrameId!);
    this.renderer.dispose();
    window.removeEventListener('resize', this.onWindowResize);
    this.element.remove();
  }
}