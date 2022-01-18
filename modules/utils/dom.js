import anime from "../../libs/anime.es.js";

export function animateScrollTo(el, container, offset, callback) {
  offset = offset || 0;
  let scrollAnim = anime({
    targets: { scroll: container.scrollTop },
    scroll: el.offsetTop - offset,
    duration: 500,
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
