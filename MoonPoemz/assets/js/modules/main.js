import { create } from "./canvas.js"



export function addCanvas(parent, width, height) {
  let ele = document.getElementById('domNode');
  create(1, parent, width, height)
}

let ele = document.getElementById('domNode');
addCanvas(ele, 256, 256);


function newCanvas() {
  let ele = document.querySelector('.demo-info')
  ele.replaceWith('yo')
}

window.addEventListener('hashchange', newCanvas)

// window.onhashchange = newCanvas