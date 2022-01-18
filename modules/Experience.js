import * as THREE from '../libs/three/three.module.js'
import anime from '../libs/anime.es.js'

let instance = null

export default class Experience {

  constructor() {
    if (instance) {
      return instance;
    }
    instance = this
    window.experience = this

    this.views = [];

    this.poemsEl = document.querySelector('.poems');
    this.articleEls = document.querySelectorAll('article')

    document.body.classList.add('ready')

    this.renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      alpha: true
    })

    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.setClearColor(0x1101222, 0);

    this.devicePixelRatio = window.devicePixelRatio;

    this.scene = new THREE.Scene();

    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
    this.hemiLight.color.convertSRGBToLinear();
    this.hemiLight.groundColor.convertSRGBToLinear();

    this.scene.add(this.hemiLight)

    let moonGeo = new THREE.IcosahedronGeometry(1, 0, 30);
    let moonMat = new THREE.MeshStandardMaterial({
      flatShading: true
    });
    moonMat.color.setHex(0x5A87FF).convertSRGBToLinear();
    this.moon = new THREE.Mesh(moonGeo, moonMat)
    this.scene.add(this.moon);

  }

  registerView(poemVerse) {
    this.views.push(poemVerse);
    poemVerse.render()
  }

}

const experience = new Experience();




// let dropGeo = new THREE.SphereGeometry(1, 10, 10)
