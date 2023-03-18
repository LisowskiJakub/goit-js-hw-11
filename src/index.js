import { fetchPictures } from "./js/fetchPictures";
import { debounce } from "lodash";
const { log } = console
const headerInput = document.querySelector('.header__input');
const gallery = document.querySelector('.gallery')
const DEBOUNCE_DELAY = 500;

const renderGallery = picturesArr => {
  const markup = picturesArr
    .map((picture) => `
            <div class="photo-card">
          <img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>${picture.likes}
            </p>
            <p class="info-item">
              <b>Views</b>${picture.views}
            </p>
            <p class="info-item">
              <b>Comments</b>${picture.comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>${picture.downloads}
            </p>
             </div>
            </div>`)
    .join('')
  gallery.innerHTML = markup;

}


headerInput.addEventListener('input', debounce(() => {


  fetchPictures(headerInput.value.trim())
    .then((data) => {

      log(data)
      renderGallery(data.hits);
    })




}, DEBOUNCE_DELAY))



