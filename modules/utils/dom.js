import anime from "../../libs/anime.es.js";

export function scrollTo(el, container, offset, callback) {
  offset = offset || 0;
  let scrollAnim = anime({
    targets: { scroll: container.scrollTop },
    scroll: el.offsetTop - offset,
    duration: 1000,
    easing: 'easeInOutQuart',
    update: (a) => {
      let scrollPos = a.animations[0].currentValue;
      container.scrollTop = scrollPos
    },
    complete: () => {
      if (callback) { callback() }
    }
  })
}
