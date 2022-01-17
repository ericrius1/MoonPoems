import Experience from "../../modules/Experience.js"
import * as THREE from '../../libs/three/three.module.js'


// register canvas with experience so it can be updated
export class WildPlayground {
  constructor() {
    this.experience = new Experience

    this.id = 'wildPlayground';
    this.containerEl = document.querySelector(`#${this.id}`);
    this.init();
  }

  init() {
    this.scene = this.experience.scene;
    this.renderer = this.experience.renderer;


    this.width = this.containerEl.offsetWidth;
    this.height = this.containerEl.offsetHeight;

    this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 100);
    // this.camera.position.z += 5;
    // this.camera.position.y += .2;
    // this.camera.lookAt(new THREE.Vector3());
    this.canvasEl = document.createElement('canvas');
    this.context = this.canvasEl.getContext('2d');

    // this.renderer.setSize(this.width * 2, this.height * 2, false)
    this.canvasEl.style.width = this.width + "px";
    this.canvasEl.style.height = this.height + "px";

    this.containerEl.appendChild(this.canvasEl)
    this.experience.registerView(this);
  }

  render() {
    this.renderer.render(this.scene, this.camera)
    this.context.drawImage(this.renderer.domElement, 0, 0);
  }

  start() {

  }

  play() {

  }
  pause() {

  }
  stop() {

  }


}

let wildPlayground = new WildPlayground();