import Experience from "../../modules/Experience.js"
import * as THREE from '../../libs/three/three.module.js'
import { animateScrollTo } from "../../modules/utils/dom.js";

// register canvas with experience so it can be updated
export class WildPlayground {
  constructor() {
    this.experience = new Experience();
    this.id = 'wildPlayground';
    this.poemsEl = this.experience.poemsEl
    this.containerEl = document.querySelector(`#${this.id}`);

    this.containerEl.addEventListener('click', () => {
      animateScrollTo(this.containerEl, this.poemsEl, 60)
    })

    this.init();
  }

  init() {
    this.scene = this.experience.scene;
    this.renderer = this.experience.renderer;


    this.width = this.containerEl.offsetWidth;
    this.height = this.containerEl.offsetHeight;

    this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 100);


    this.canvasEl = document.createElement('canvas');
    this.context = this.canvasEl.getContext('2d');
    this.devicePixelRatio = window.devicePixelRatio

    this.renderer.setSize(this.width * this.devicePixelRatio, this.height * this.devicePixelRatio, false)
    this.canvasEl.width = this.width * this.devicePixelRatio;
    this.canvasEl.height = this.height * this.devicePixelRatio;
    this.canvasEl.style.width = this.width + "px";
    this.canvasEl.style.height = this.height + "px";

    this.createFluidLightForm();

    this.containerEl.appendChild(this.canvasEl)
    this.experience.registerView(this);

  }

  render() {
    this.renderer.render(this.scene, this.camera)
    this.context.drawImage(this.renderer.domElement, 0, 0);
  }

  createFluidLightForm() {
    let geo = new THREE.IcosahedronGeometry(0.95, 0);
    let mat = new THREE.MeshStandardMaterial({
      // flatShading: true,
      color: 0x00ff00
    });
    this.centerMesh = new THREE.Mesh(geo, mat);
    this.centerMesh.position.set(0, -2, -7)
    this.camera.position.y = this.centerMesh.position.y;
    this.scene.add(this.centerMesh);
    this.centerMesh.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, 0);

    // this.camera.lookAt(this.centerMesh.position)

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