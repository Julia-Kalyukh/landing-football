window.addEventListener('DOMContentLoaded', () => {

  function onPhotoReplacement(btnClass, linkImgId, photoId) {
    let btns = document.querySelectorAll(btnClass),
      photo = document.querySelector(photoId),
      linkImg = document.querySelector(linkImgId);
  
    btns.forEach(btn => {
      btn.addEventListener('click', function () {
        let idBtn = this.getAttribute('id');
    
        switch (idBtn) {
          case 'childlike':
            photo.setAttribute('src', 'img/images/slider/img01.png');
            linkImg.setAttribute('href', '#1');
            break;
          case 'friends':
            photo.setAttribute('src', 'img/images/slider/img02.png');
            linkImg.setAttribute('href', '#2');
            break;
          case 'pro':
            photo.setAttribute('src', 'img/images/slider/img03.png');
            linkImg.setAttribute('href', '#3');
            break;
          case 'constructor':
            photo.setAttribute('src', 'img/images/slider/img001.png');
            linkImg.setAttribute('href', '#1');
            break;
          case 'printing':
            photo.setAttribute('src', 'img/images/slider/img002.png');
            linkImg.setAttribute('href', '#2');
            break;
          case 'delivery':
            photo.setAttribute('src', 'img/images/slider/img003.png');
            linkImg.setAttribute('href', '#3');
            break;
        }
      })
    });
  }

  onPhotoReplacement('.js-btn-photo01', '#photoLink01', '#photoSrc01');
  onPhotoReplacement('.js-btn-photo02', '#photoLink02', '#photoSrc02');
});