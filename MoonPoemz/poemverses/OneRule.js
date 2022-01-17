import Experience from "../../modules/Experience.js"
import * as THREE from '../../libs/three/three.module.js'


// register canvas with experience so it can be updated
export class OneRule {
  constructor() {
    this.experience = new Experience

    this.id = 'oneRule';
    this.containerEl = document.querySelector(`#${this.id}`);
    this.init();

  }

  init() {
    this.scene = this.experience.scene;
    this.renderer = this.experience.renderer;


    this.width = this.containerEl.offsetWidth;
    this.height = this.containerEl.offsetHeight;

    this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 100);
    this.camera.position.z += 0
    this.camera.position.y += 0;
    this.camera.updateMatrixWorld();

    this.canvasEl = document.createElement('canvas');
    this.context = this.canvasEl.getContext('2d');

    this.devicePixelRatio = window.devicePixelRatio

    this.renderer.setSize(this.width * this.devicePixelRatio, this.height * this.devicePixelRatio, false)
    this.canvasEl.width = this.width * this.devicePixelRatio;
    this.canvasEl.height = this.height * this.devicePixelRatio;
    this.canvasEl.style.width = this.width + "px";
    this.canvasEl.style.height = this.height + "px";

    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, .1);
    this.scene.add(this.hemiLight);

    this.createFluidLightForm();


    this.containerEl.appendChild(this.canvasEl)
    this.experience.registerView(this);

  }

  createFluidLightForm() {
    let geo = new THREE.IcosahedronGeometry(1, 0);
    let mat = new THREE.MeshStandardMaterial({
      // flatShading: true,
      color: 0x1100ff
    });
    this.centerMesh = new THREE.Mesh(geo, mat);
    this.centerMesh.position.set(0, 0, -7)
    this.scene.add(this.centerMesh);

    // this.camera.lookAt(this.centerMesh.position)

  }

  render() {
    this.renderer.render(this.scene, this.camera)
    this.context.drawImage(this.renderer.domElement, 0, 0, this.width * this.devicePixelRatio, this.height * this.devicePixelRatio);
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

let oneRule = new OneRule();