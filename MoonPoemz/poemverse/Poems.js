import anime from "../../libs/anime.es.js"
import { animateScrollTo } from "../../modules/utils/dom.js";
export function createPoems() {
  createPoem({
    title: 'bhnoop'
  });

  createPoem({
    title: 'skiing'
  });

  createPoem({
    title: 'helicopter'
  })
}

function createPoem(options) {
  options = options || {
    title: "Shnur",
    color: "purple"
  }

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
  context.fillStyle = poemEl.style.backgroundColor;
  context.fillStyle = "purple";

  poemEl.appendChild(canvasEl);


  poemEl.addEventListener('pointerup', (event) => {
    if (!full) {
      targetHeight = window.innerHeight;
      startingHeight = poemEl.clientHeight
      savedHeight = poemEl.clientHeight
      overflow = "hidden";
      poemEl.classList.add('full');
      animateScrollTo(poemEl, poemsEl, 60);
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
      }
    })
    full = !full;

  })
  window.addEventListener('resize', resize);

  function resize() {
    canvasEl.width = poemEl.clientWidth * devicePixelRatio;
    canvasEl.height = poemEl.clientHeight * devicePixelRatio;
  }
}