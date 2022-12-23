if( window.innerWidth <= 1920 ){
  let tagsContainer = document.querySelectorAll('.js-tags-container');

  tagsContainer.forEach(item => {

    let btnMore = item.querySelector('.js-tag-more'),
      btnClose = item.querySelector('.js-tag-close'),
      tagsNone = item.querySelectorAll('.js-tag-none');
    
    btnMore.addEventListener('click', function () {
      tagsNone.forEach(tag => {
        tag.style.cssText = 'display: inline-block;';
      });
      this.style.cssText = "display: none";
    })
  
    btnClose.addEventListener('click', function () {
      tagsNone.forEach(tag => {
        tag.style.cssText = 'display: none;';
      });
      btnMore.style.cssText = "display: inline-block";
    })
  })
} 