import anime from "../../libs/anime.es.js"
import { animateScrollTo } from "../../modules/utils/dom.js";
import { OneRule } from "./OneRule.js";
import * as THREE from '../../libs/three/three.module.js'
import Experience from "../Experience.js";
export function createPoems() {
  let experience = new Experience();
  let renderer = experience.renderer;


  createPoem({
    title: 'bhnoop',
    viz: OneRule,
    position: new THREE.Vector3(2, 0, -7)
  });

  createPoem({
    title: 'skiing',
    position: new THREE.Vector3(0, -10, -4)
  })

  createPoem({
    title: 'helicopter',
    position: new THREE.Vector3(0, -20, -4),
    viz: OneRule,
  });

  function createPoem(options) {

    let defaultOptions = {
      title: "Shnur",
      color: "purple",
      viz: OneRule,
      position: new THREE.Vector3(0, 0, 0)
    }
    options = { ...defaultOptions, ...options }

    let articleEl = document.querySelector('#blueOcean');
    let poemEl = document.createElement('div');
    poemEl.id = options.title;
    poemEl.classList.add('poem');
    poemEl.style.color = options.color;
    articleEl.appendChild(poemEl);

    let titleEl = document.createElement('h3')
    titleEl.textContent = options.title;
    titleEl.classList.add('poem-title');;

    poemEl.appendChild(titleEl);
    let full = false;
    let targetHeight, startingHeight, savedHeight, overflow;

    let devicePixelRatio = 1
    let canvasEl = document.createElement('canvas');
    canvasEl.width = poemEl.clientWidth * devicePixelRatio
    canvasEl.height = poemEl.clientHeight * devicePixelRatio;
    canvasEl.style.width = canvasEl.width / 2 + 'px';
    canvasEl.style.height = canvasEl.height / 2 + 'px';
    canvasEl.id = options.title
    poemEl.appendChild(canvasEl);
    poemEl.viz = new options.viz(canvasEl, options.position);
    resize();


    poemEl.addEventListener('pointerup', (event) => {
      if (!full) {
        targetHeight = window.innerHeight;
        startingHeight = poemEl.offsetHeight
        savedHeight = poemEl.offsetHeight
        overflow = "hidden";
        poemEl.classList.add('full');
        // animateScrollTo(poemEl, poemsEl, 60);
        poemEl.viz.play();
      } else {
        poemEl.classList.remove('full');
        startingHeight = targetHeight;
        targetHeight = savedHeight;
        poemEl.classList.remove('full')
        overflow = 'auto';
      }
      // document.body.style.overflow = overflow
      // poemsEl.style.overflow = overflow;
      anime({
        targets: { height: startingHeight },
        height: targetHeight,
        duration: 1000,
        update: (a) => {
          let height = a.animations[0].currentValue;
          poemEl.style.height = height + 'px';
          resize();
        }
      })
      full = !full;

    })
    window.addEventListener('resize', resize);

    function resize() {
      canvasEl.width = poemEl.clientWidth * devicePixelRatio;
      canvasEl.height = poemEl.clientHeight * devicePixelRatio;
      canvasEl.style.width = canvasEl.width / 2 + 'px';
      canvasEl.style.height = canvasEl.height / 2 + 'px';
      poemEl.viz.camera.aspect = canvasEl.width / canvasEl.height;
      poemEl.viz.camera.updateProjectionMatrix();
      poemEl.viz.render();

    }


  }
}