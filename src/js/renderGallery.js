

const renderGallery = (picturesArr, element) => {
    const markup = picturesArr
        .map((picture) => `
  <div class="photo-card">
                <a  href="${picture.largeImageURL}"><img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" /></a>
      <div class="info">
        <p class="info-item">
          <span class="info-title"><b>Likes</b></span><span class="info-numbers">${picture.likes}</span>
        </p>
        <p class="info-item">
          <span class="info-title"><b>Views</b></span><span class="info-numbers">${picture.views}</span>
        </p>
        <p class="info-item">
          <span class="info-title"><b>Comments</b></span><span class="info-numbers">${picture.comments}</span>
        </p>
        <p class="info-item">
         <span class="info-title"><b>Downloads</b></span><span class="info-numbers">${picture.downloads}</span>
        </p>
      </div>
      </div> `)
        .join('');
    element.insertAdjacentHTML('beforeend', markup);

}
export { renderGallery }