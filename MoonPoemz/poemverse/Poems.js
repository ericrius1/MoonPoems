import anime from "../../libs/anime.es.js"
import { animateScrollTo } from "../../modules/utils/dom.js";
import { OneRule } from "./OneRule.js";
import Experience from "../Experience.js";
export function createPoems() {
  let experience = new Experience();
  let renderer = experience.renderer;
  createPoem({
    title: 'bhnoop',
    viz: OneRule
  });

  createPoem({
    title: 'skiing'
  });

  createPoem({
    title: 'helicopter'
  })


  function createPoem(options) {

    let defaultOptions = {
      title: "Shnur",
      color: "purple",
      viz: OneRule
    }
    options = { ...defaultOptions, ...options }

    let articleEl = document.querySelector('#blueOcean');
    let poemsEl = document.querySelector('.poems');
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

    let devicePixelRatio = 2
    let canvasEl = document.createElement('canvas');
    let context = canvasEl.getContext('2d');
    canvasEl.width = poemEl.clientWidth * devicePixelRatio
    canvasEl.height = poemEl.clientHeight * devicePixelRatio;
    canvasEl.style.width = canvasEl.width / 2 + 'px';
    canvasEl.style.height = canvasEl.height / 2 + 'px';
    canvasEl.id = options.title
    poemEl.appendChild(canvasEl);
    poemEl.viz = new options.viz(canvasEl);
    resize();


    poemEl.addEventListener('pointerup', (event) => {
      if (!full) {
        targetHeight = window.innerHeight;
        startingHeight = poemEl.clientHeight
        savedHeight = poemEl.clientHeight
        overflow = "hidden";
        poemEl.classList.add('full');
        animateScrollTo(poemEl, poemsEl, 60);
        poemEl.viz.play();
      } else {
        poemEl.classList.remove('full');
        startingHeight = targetHeight;
        targetHeight = savedHeight;
        poemEl.classList.remove('full')
        overflow = 'auto';
      }
      document.body.style.overflow = overflow
      poemsEl.style.overflow = overflow;
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
      renderer.setSize(canvasEl.width, canvasEl.height)
      poemEl.viz.camera.aspect = canvasEl.width / canvasEl.height;
      poemEl.viz.camera.updateProjectionMatrix();
      // renderer.setSize(canvasEl.width, canvasEl.height)
      poemEl.viz.render();

    }


  }
}