import * as THREE from '../libs/three/three.module.js'
import Stats from '../libs/three/examples/jsm/Stats.js'
import { createPoems } from './poemverse/Poems.js'

let instance = null

export default class Experience {

  constructor() {
    if (instance) {
      return instance;
    }
    instance = this
    window.experience = this

    this.stats = new Stats();
    // document.body.appendChild(this.stats.dom);

    this.views = [];

    this.poemsEl = document.querySelector('.poems');
    this.articleEls = document.querySelectorAll('article')


    document.body.classList.add('ready')

    this.renderer = new THREE.WebGLRenderer({
      // powerPreference: 'high-performance',
      alpha: true,
      // antialias: true
    })

    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.setClearColor(0xff00ff, 0);

    this.devicePixelRatio = window.devicePixelRatio;

    this.scene = new THREE.Scene();

    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0xff0000, 0.1);
    this.hemiLight.color.convertSRGBToLinear();
    this.hemiLight.groundColor.convertSRGBToLinear();
    this.scene.add(this.hemiLight)


    // this.update();

  }

  init() {
    createPoems();
  }

  registerView(poemVerse) {
    this.views.push(poemVerse);
    poemVerse.render()
  }

  update() {
    for (let i = 0; i < this.views.length; i++) {
      this.views[i].update();
    }
    this.renderer.setAnimationLoop(this.update.bind(this))
  }

}

const experience = new Experience();
experience.init();




// let dropGeo = new THREE.SphereGeometry(1, 10, 10)
