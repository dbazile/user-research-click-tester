const LITERALLY_A_MAGIC_NUMBER = 8;
const DELAY = 500;

export function animateScroll(element) {
  const destination = element.offsetTop;
  let safety = 100;
  let handle;

  const delay = setTimeout(() => requestAnimationFrame(tick), DELAY);

  function tick() {
    safety -= 1;
    if (!safety) {
      console.debug('bailed after too many ticks');
      return;
    }
    const distance = destination - window.scrollY;
    const step = Math.ceil(distance / LITERALLY_A_MAGIC_NUMBER);
    window.scrollBy(0, step);  // bootleg easing
    if (Math.abs(step) > 0) {
      handle = requestAnimationFrame(tick);
    }
  }

  function cancel() {
    clearTimeout(delay);
    cancelAnimationFrame(handle);
  }

  return cancel;
}
