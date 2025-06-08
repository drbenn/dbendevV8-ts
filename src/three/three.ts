import * as THREE from 'three';
import html from './three.html?raw';
import './three.css';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class ThreeComponent {
  element: HTMLElement;
  container: HTMLElement;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  cube: THREE.Mesh;
  animationFrameId: number | undefined;
  onProgress!: (percent: number) => void;

  constructor(onProgress: (percent: number) => void) {
    this.onProgress = onProgress;
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

    // light is required to view textures on models!!! otherwise they will be black
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 10);
    this.scene.add(light);

    // Handle window resize
    window.addEventListener('resize', this.onWindowResize);
  }

  mount(parent: HTMLElement) {
    parent.appendChild(this.element);

    // Now the container is in the DOM → update size and aspect properly
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();

    this.loadAssets();
    this.animate();
  }

  loadAssets() {
    const manager = new THREE.LoadingManager();

    manager.onStart = (url, itemsLoaded, itemsTotal) => {
      console.log('Started loading file: ' + url);
    };

    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const percent = (itemsLoaded / itemsTotal) * 100;
      console.log(`Loading: ${percent.toFixed(2)}%`);
      this.onProgress(percent);
    };

    manager.onLoad = () => {
      console.log('All assets loaded.');
      this.onProgress(100);
    };

    // load textures
    const textureLoader = new THREE.TextureLoader(manager);
    this.loadBackground(textureLoader)

    // load models
    const gltfLoader = new GLTFLoader(manager);
    this.loadDuck(gltfLoader);
    this.loadTruck(gltfLoader);
  }

  loadBackground(textureLoader: THREE.TextureLoader) {
    textureLoader.load(
      '/textures/lavafull.jpg',
      (texture) => {
        const geometry = new THREE.PlaneGeometry(10, 10);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const plane = new THREE.Mesh(geometry, material);
        plane.position.set(0, 0, -5); // background plane
        this.scene.add(plane);
        console.log('Background texture loaded!');
      },
      undefined,
      (error) => {
        console.warn('Background texture failed to load.');
      }
    );
  }

  loadDuck(gltfLoader: GLTFLoader) {
    gltfLoader.load(
      '/models/duck/Duck.gltf',
      (gltf) => {
        const duck = gltf.scene;
        duck.position.set(-2, 0, 0); // move Duck to left
        this.scene.add(duck);
        console.log('Duck loaded!');
      },
      undefined,
      (error) => {
        console.warn('Duck failed to load.');
      }
    );
  }

  loadTruck(gltfLoader: GLTFLoader) {
  gltfLoader.load(
    '/models/cesium-milk-truck/CesiumMilkTruck.gltf', // example — you can add any second model here
    (gltf) => {
      const tree = gltf.scene;
      tree.position.set(2, 0, 0); // move Tree to right
      this.scene.add(tree);
      console.log('Tree loaded!');
    },
    undefined,
    (error) => {
      console.warn('Tree failed to load.');
    }
  );
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