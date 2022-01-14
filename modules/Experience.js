import * as THREE from '../libs/three/three.module.js'
import anime from '../libs/anime.es.js'

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
    this.canvas.width = canvasContainer.clientWidth;
    this.canvas.height = canvasContainer.clientHeight;
    // this.canvas.focus();

    this.renderer = new THREE.WebGLRenderer({
      // antialias: true,
      canvas: this.canvas,
      powerPreference: 'high-performance'
    })

    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.setSize(this.canvas.width * devicePixelRatio, this.canvas.height * devicePixelRatio, false);


    this.camera = new THREE.PerspectiveCamera(70, this.canvas.width / this.canvas.height, .1, 100);
    this.camera.position.z += 10;
    // this.camera.updateProjectionMatrix()
    this.camera.lookAt(new THREE.Vector3())
    this.scene = new THREE.Scene();
    this.scene.add(this.camera);
    this.renderer.setClearColor(0x1101222, 1);

    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);

    this.scene.add(this.hemiLight)

    let sphereGeo = new THREE.SphereGeometry(1, 30, 30);
    let mat = new THREE.MeshBasicMaterial();
    mat.color.setHex(0x5A87FF).convertSRGBToLinear();
    this.mesh = new THREE.Mesh(sphereGeo, mat)
    this.scene.add(this.mesh);

    this.renderer.render(this.scene, this.camera)

  }
}

const experience = new Experience();



// let dropGeo = new THREE.SphereGeometry(1, 10, 10)
