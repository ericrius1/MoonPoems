import * as THREE from '../libs/three/three.module.js'
import anime from '../libs/anime.es.js'
import Poem from './Poem.js'

let instance = null




export default class Experience {

  constructor() {
    if (instance) {
      return instance;
    }
    instance = this
    window.experience = this

    this.poemsEl = document.querySelector('.poems')
    this.articleEls = document.querySelectorAll('article')

    document.body.classList.add('ready')


    this.canvasContainer = document.querySelector('div.canvas-container');
    this.canvas = document.createElement('canvas')
    this.canvas.setAttribute('id', 'webgl_canvas');

    this.canvasContainer.appendChild(this.canvas);

    this.devicePixelRatio = window.devicePixelRatio;

    this.canvas.setAttribute('tabindex', 0); // adds focus to canvas so keyboard events work
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    // this.canvas.focus();

    this.renderer = new THREE.WebGLRenderer({
      // antialias: true,
      canvas: this.canvas,
      powerPreference: 'high-performance'
    })

    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.setSize(this.canvasContainer.clientWidth * this.devicePixelRatio, this.canvasContainer.clientHeight * this.devicePixelRatio, false);


    this.camera = new THREE.PerspectiveCamera(70, this.canvas.width / this.canvas.height, .1, 100);
    this.camera.position.z += 10;
    this.camera.updateProjectionMatrix()
    this.camera.lookAt(new THREE.Vector3())
    this.scene = new THREE.Scene();
    this.scene.add(this.camera);
    this.renderer.setClearColor(0x1101222, 1);

    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
    this.hemiLight.color.convertSRGBToLinear();
    this.hemiLight.groundColor.convertSRGBToLinear();

    this.scene.add(this.hemiLight)

    let moonGeo = new THREE.IcosahedronGeometry(1, 0, 30);
    let moonMat = new THREE.MeshStandardMaterial();
    moonMat.color.setHex(0x5A87FF).convertSRGBToLinear();
    this.moon = new THREE.Mesh(moonGeo, moonMat)
    this.scene.add(this.moon);
    this.renderer.render(this.scene, this.camera)
    this.addEventListeners();
    this.createPoems();
  }

  createPoems() {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < this.articleEls.length; i++) {
      let articleEl = this.articleEls[i];
      let poemEls = articleEl.querySelectorAll('.poem');
      for (let j = 0; j < poemEls.length; j++) {
        let poemEl = poemEls[j];
        let poem = new Poem(poemEl);
      }
    }
  }

  twirl() {
    let twirlAnim = anime({
      targets: {
        rotationX: this.moon.rotation.x,
        rotationY: this.moon.rotation.y,
        rotationZ: this.moon.rotation.z
      },
      rotationX: Math.random() * Math.PI * 2,
      rotationY: Math.random() * Math.PI * 2,
      rotationZ: Math.random() * Math.PI * 2,
      duration: 1000,
      easing: "easeInOutQuart",
      update: (a) => {
        this.moon.rotation.x = a.animations[0].currentValue;
        this.moon.rotation.y = a.animations[1].currentValue;
        this.moon.rotation.z = a.animations[2].currentValue;
        this.renderer.render(this.scene, this.camera)
      }

    })
  }

  resize() {
    this.renderer.setSize(this.canvasContainer.clientWidth * this.devicePixelRatio, this.canvasContainer.clientHeight * this.devicePixelRatio, false)

    this.camera.aspect = this.canvas.width / this.canvas.height;
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera)

  }

  // have poems on left, canvas middle, and words of poems on right

  addEventListeners() {
    this.boundTwirl = this.twirl.bind(this);
    this.boundResize = this.resize.bind(this);

    window.addEventListener('hashchange', this.boundTwirl)
    window.addEventListener('resize', this.boundResize)
  }

  removeEventListeners() {
    window.removeEventListener('hashchange', this.boundTwirl);
    window.removeEventListener('resize', this.boundResize)
  }
}

const experience = new Experience();

let selector = "#domNode"



// let dropGeo = new THREE.SphereGeometry(1, 10, 10)
