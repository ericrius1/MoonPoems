export default class Poem {
  constructor(el) {
    this.el = el;
    this.el.addEventListener('click', () => {
      console.log('yah')
    })

  }

  create() {

  }

  highlight() {
    history.pushState(null, null, "#shnurp")
  }
}