export const requestFullScreen = (element: HTMLElement) => {
  let method : ?string = null;
  const prefix = [
    'requestFullscreen',
    'webkitRequestFullscreen',
    'webkitRequestFullScreen',
    'mozRequestFullScreen',
    'msRequestFullscreen',
  ].forEach((name) => {
    if (element[name]) {
      method = name;
    }
  });

  element[method]();
};

export const exitFullScreen = (element) => {
  let method : ?string = null;
  [
    'exitFullscreen',
    'webkitExitFullscreen',
    'webkitExitFullScreen',
    'mozCancelFullScreen',
    'msExitFullscreen',
  ].forEach((name) => {
    if (element[name]) {
      method = name;
    }
  });

  element[method]();
};

export const isFullScreen = () => Boolean(document.fullscreenElement
  || document.webkitFullscreenElement
  || document.webkitIsFullScreen);
