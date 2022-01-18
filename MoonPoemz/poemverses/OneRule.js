import Experience from "../../modules/Experience.js"
import * as THREE from '../../libs/three/three.module.js'
import { animateScrollTo } from '../../modules/utils/dom.js'
import anime from "../../libs/anime.es.js"

// register canvas with experience so it can be updated
export class OneRule {
  constructor() {
    this.experience = new Experience
    this.poemsEl = this.experience.poemsEl

    this.id = 'oneRule';
    this.containerEl = document.querySelector(`#${this.id}`);

    this.containerEl.addEventListener('click', () => {
      animateScrollTo(this.containerEl, this.poemsEl, 60)

      anime({
        targets: { height: this.containerEl.clientHeight },
        height: window.innerHeight,
        duration: 700,
        update: (a) => {
          let height = a.animations[0].currentValue;
          this.containerEl.style.height = height + 'px';
        }
      })
    })
    this.init();
  }

  init() {
    this.scene = this.experience.scene;
    this.renderer = this.experience.renderer;


    this.devicePixelRatio = window.devicePixelRatio
    this.width = this.containerEl.offsetWidth * this.devicePixelRatio;
    this.height = this.containerEl.offsetHeight * this.devicePixelRatio;

    this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 100);

    this.canvasEl = document.createElement('canvas');
    this.context = this.canvasEl.getContext('2d');


    this.renderer.setSize(this.width, this.height, false)
    this.canvasEl.width = this.width;
    this.canvasEl.height = this.height;
    this.canvasEl.style.width = this.width / 2 + "px";
    this.canvasEl.style.height = this.height / 2 + "px";
    this.context.fillStyle = this.containerEl.style.backgroundColor;


    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0xff00ff, .1);
    this.scene.add(this.hemiLight);

    this.createFluidLightForm();


    this.containerEl.appendChild(this.canvasEl)
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
    this.renderer.render(this.scene, this.camera)
    this.context.fillRect(0, 0, this.width, this.height)
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

let oneRule = new OneRule();