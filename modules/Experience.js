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
    let $canvas = document.createElement('canvas')
    $canvas.setAttribute('id', 'webgl_canvas');
    $canvas.width = canvasContainer.clientWidth;
    $canvas.height = canvasContainer.clientHeight

    canvasContainer.appendChild($canvas);

    let devicePixelRatio = window.devicePixelRatio;

  }
}

const experience = new Experience();



// let dropGeo = new THREE.SphereGeometry(1, 10, 10)
