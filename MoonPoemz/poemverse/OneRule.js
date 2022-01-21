import Experience from "../Experience.js"
import * as THREE from '../../libs/three/three.module.js'
import { randomIntInRange as RI } from "../../modules/utils/math.js"
import anime from "../../libs/anime.es.js"

// register canvas with experience so it can be updated
export class OneRule {
  constructor(canvasEl) {
    this.experience = new Experience()
    this.canvas = canvasEl
    this.context = this.canvas.getContext('2d');
    this.fillStyle = `rgb(${RI(0, 255)}, ${RI(0, 255)}, ${RI(0, 255)})`
    this.context.fillStyle = this.fillStyle;
    this.init();
  }

  init() {
    this.scene = this.experience.scene;
    this.renderer = this.experience.renderer;

    this.camera = new THREE.PerspectiveCamera(60, this.canvas.width / this.canvas.height, 0.1, 100);

    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0xff00ff, .1);
    this.scene.add(this.hemiLight);

    this.createFluidLightForm();

    this.experience.registerView(this);

  }

  createFluidLightForm() {
    let geo = new THREE.IcosahedronGeometry(1, 0);
    let mat = new THREE.MeshStandardMaterial({
      flatShading: true,
    });
    mat.color.setHex(0x5A87FF).convertSRGBToLinear();
    this.centerMesh = new THREE.Mesh(geo, mat);
    this.centerMesh.position.set(0, 0, -7)
    this.scene.add(this.centerMesh);

  }

  update() {
    this.centerMesh.rotation.y += .01;
    this.render();
  }

  render() {
    this.context.fillStyle = this.fillStyle;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.renderer.setSize(this.canvas.width, this.canvas.height)
    this.renderer.render(this.scene, this.camera)
    this.context.drawImage(this.renderer.domElement, 0, 0, this.canvas.width, this.canvas.height);
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
