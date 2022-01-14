import * as THREE from '../libs/three/three.module.js'
import anime from '../libs/anime.es.js'
import Poem from './Poem.js'

let instance = null

window.poemsEl = document.querySelector('.poems')

class Experience {

  constructor() {
    if (instance) {
      return instance;
    }
    instance = this
    window.experience = this

    document.body.classList.add('ready')

    let moonPoem1 = new Poem();
    moonPoem1.highlight();

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
  }

  twirl() {
    console.log('twirl');

  }

  // have poems on left, canvas middle, and words of poems on right
  scrollTo(selector, offset, callback) {
    offset = offset || 0;
    let el = document.querySelector(selector);
    let scrollAnim = anime({
      targets: { scroll: poemsEl.scrollTop },
      scroll: el.offsetTop - offset,
      duration: 2000,
      easing: 'easeInOutQuart',
      update: (a) => {
        let scrollPos = a.animations[0].currentValue;
        console.log(scrollPos);
        poemsEl.scrollTop = scrollPos
      },
      complete: () => {
        if (callback) { callback() }
      }
    })
  }

  addEventListeners() {
    this.boundTwirl = this.twirl.bind(this);
    window.addEventListener('hashchange', this.boundTwirl)
  }

  removeEventListeners() {
    window.removeEventListener('hashchange', this.boundTwirl);
  }
}

const experience = new Experience();

let selector = "#domNode"



// let dropGeo = new THREE.SphereGeometry(1, 10, 10)
