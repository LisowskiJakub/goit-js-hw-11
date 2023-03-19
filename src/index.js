import { fetchPictures } from "./js/fetchPictures";
import Notiflix from "notiflix";
const { log } = console
const headerForm = document.querySelector('.header__form');
const gallery = document.querySelector('.gallery')
const NotiflixOptions = { distance: '2px', cssAnimationStyle: 'from-right' }
const loadMoreBtn = document.querySelector('.load-more');
let pageNumber = 1;
let searchData = ''
const renderGallery = picturesArr => {
  const markup = picturesArr
    .map((picture) => `
       <div class="photo-card">
    <img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" />
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
        </div>`)
    .join('')
  gallery.insertAdjacentHTML('beforeend', markup);

}


headerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  gallery.innerHTML = '';
  const { search } = e.currentTarget;
  searchData = search.value.trim();
  fetchPictures(searchData, pageNumber)
    .then((data) => {
      if (data.hits.length === 0) return Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.', NotiflixOptions)
      renderGallery(data.hits);
    })
    .catch((err) => console.log(err))
})


loadMoreBtn.addEventListener('click', () => {
  pageNumber++;
  fetchPictures(searchData, pageNumber)
    .then((data) => {
      if (data.hits.length === 0) return Notiflix.Notify.warning('Sorry, there are no more images matching your search query. Please try again.', NotiflixOptions)
      renderGallery(data.hits);
    })
    .catch((err) => console.log(err))
})