window.addEventListener('DOMContentLoaded', () => {
  function video() {
    let videoControls = document.querySelector('.video-control'),
      video = document.querySelector('#video');

    videoControls.addEventListener('click', function () {
      if (video.paused) {
        video.play();
        videoControls.classList.add('video-control-play');
      } else {
        video.pause();
        videoControls.classList.remove('video-control-play');
        video.load();
      }
    })

  }
  video();
});