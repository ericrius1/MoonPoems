import * as THREE from '../libs/three/three.module.js'

let instance = null

class Experience {

  constructor() {
    if (instance) {
      return instance;
    }
    instance = this
    window.experience = this

    document.body.classList.add('ready')

    let canvasContainer = document.querySelector('div.canvas-container');
    this.canvas = document.createElement('canvas')
    this.canvas.setAttribute('id', 'webgl_canvas');


    canvasContainer.appendChild(this.canvas);

    let devicePixelRatio = window.devicePixelRatio;

    this.canvas.setAttribute('tabindex', 0); // adds focus to canvas so keyboard events work
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    // this.canvas.focus();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      powerPreference: 'high-performance'
    })

    this.renderer.setSize(this.canvas.width * devicePixelRatio, this.canvas.height * devicePixelRatio, false);

    this.camera = new THREE.PerspectiveCamera(70, this.canvas.width / this.canvas.height, .1, 100);
    this.scene = new THREE.Scene();
    this.scene.add(this.camera);
    this.renderer.setClearColor(0x1101233, 1);
    this.renderer.render(this.scene, this.camera)

  }
}

const experience = new Experience();



// let dropGeo = new THREE.SphereGeometry(1, 10, 10)
