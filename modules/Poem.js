import Experience from './Experience.js'
import { scrollTo } from "./utils/dom.js";


export default class Poem {
  constructor(el) {
    this.experience = new Experience();
    this.poemsEl = this.experience.poemsEl
    this.el = el;
    this.el.addEventListener('click', () => {
      scrollTo(this.el, this.poemsEl, 60, () => {
      });
      this.experience.twirl();
    })
  }

  create() {

  }

  highlight() {
    history.pushState(null, null, "#shnurp")
  }
}