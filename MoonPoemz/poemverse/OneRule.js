import Experience from "../Experience.js"
import * as THREE from '../../libs/three/three.module.js'
import { randomIntInRange as RI, randomInRange as RF } from "../../modules/utils/math.js"
import anime from "../../libs/anime.es.js"

// register canvas with experience so it can be updated
export class OneRule {
  constructor(canvasEl, position) {
    this.experience = new Experience()
    this.renderer = this.experience.renderer;
    this.canvas = canvasEl
    this.position = position.clone();
    this.context = this.canvas.getContext('2d');
    this.fillStyle = `rgb(${RI(0, 255)}, ${RI(0, 255)}, ${RI(0, 255)})`
    this.context.fillStyle = this.fillStyle;
    this.init();
  }

  init() {
    this.scene = this.experience.scene;
    this.renderer = this.experience.renderer;

    this.camera = new THREE.PerspectiveCamera(60, this.canvas.width / this.canvas.height, 0.1, 100);
    this.camera.position.y = this.position.y;
    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0xff00ff, .1);
    this.scene.add(this.hemiLight);

    this.createFluidLightForm();

    this.experience.registerView(this);

  }

  createFluidLightForm() {
    let geo = new THREE.IcosahedronGeometry(1, 0);
    let mat = new THREE.MeshStandardMaterial({
      flatShading: true,
      color: new THREE.Color(Math.random(), Math.random(), Math.random())
    });
    mat.color.convertSRGBToLinear();
    this.centerMesh = new THREE.Mesh(geo, mat);
    this.centerMesh.position.copy(this.position)
    this.scene.add(this.centerMesh);

  }

  update() {
    this.centerMesh.rotation.y += .01;
    this.render();
  }

  render() {
    this.context.fillStyle = this.fillStyle;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderer.setSize(this.canvas.width, this.canvas.height, false)

    this.renderer.render(this.scene, this.camera)
    this.context.drawImage(this.renderer.domElement, 0, 0);
  }

  start() {

  }

  play() {
    this.twirl();

  }

  twirl() {
    console.log('twirl')
    anime({
      targets: {
        rotateX: this.centerMesh.rotation.x,
        rotateY: this.centerMesh.rotation.y,
        rotateZ: this.centerMesh.rotation.z
      },
      easing: 'easeInOutCubic',
      rotateX: RF(0, Math.PI * 2),
      rotateY: RF(0, Math.PI * 2),
      rotateZ: RF(0, Math.PI * 2),
      duration: 4000,
      update: (a) => {
        this.centerMesh.rotation.x = a.animations[0].currentValue
        this.centerMesh.rotation.y = a.animations[1].currentValue
        this.centerMesh.rotation.z = a.animations[2].currentValue
        this.render();
      }


    })
  }
  pause() {

  }
  stop() {

  }


}
