const input = document.querySelector("input");
const defaultText = document.getElementById("default");
const debounceText = document.getElementById("debounce");
const throttleText = document.getElementById("throttle");

const updateDebounce = debounce(() => {
  incrementCount(debounceText);
});

const updateThrottle = throttle(() => {
  incrementCount(throttleText);
});

input.addEventListener("input", (e) => {
  // defaultText.textContent = e.target.value;
  // debounceText.textContent = updateDebounce(e.target.value);
  // throttleText.textContent = updateThrottle(e.target.value);
});

function debounce(cb, delay = 500) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

function throttle(cb, delay = 500) {
  let waitingArgs;
  let shouldWait = false;
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    cb(...args);
    shouldWait = true;

    setTimeout(timeoutFunc, delay);
  };
}

document.addEventListener("mousemove", e => {
  incrementCount(defaultText);
  updateDebounce();
  updateThrottle();
})

function incrementCount(element) {
  element.textContent = (parseInt(element.innerText) || 0) + 1;
}