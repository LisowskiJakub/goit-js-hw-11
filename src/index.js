import { fetchPictures } from "./js/fetchPictures";
import Notiflix from "notiflix";
import debounce from 'lodash.debounce';
const { log } = console;
const headerForm = document.querySelector('.header__form');
const gallery = document.querySelector('.gallery');
const NotiflixOptions = { distance: '2px', cssAnimationStyle: 'from-right' };
// const loadMoreBtn = document.querySelector('.load-more');
const SCROLL_MARGIN = 1000;
const DEBOUNCE_TIME = 300;
let pageNumber = 1;
let searchData = '';
const search = document.querySelector('.header__input')
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
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);

}


headerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  gallery.innerHTML = '';
  const { search } = e.currentTarget;
  searchData = search.value.trim();
  fetchPictures(searchData, pageNumber)
    .then((data) => {
      log(data)
      if (data.hits.length === 0) return Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.', NotiflixOptions);
      renderGallery(data.hits);
    })
    .catch((err) => console.log(err))
})

window.addEventListener("scroll", debounce(() => {

  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;

  if (scrolled > scrollable - SCROLL_MARGIN) {

    log('ponizej 500')
    pageNumber++;
    fetchPictures(searchData, pageNumber)
      .then((data) => {
        if (data.hits.length === 0) return Notiflix.Notify.warning('Sorry, there are no more images matching your search query. Please try again.', NotiflixOptions)
        renderGallery(data.hits);
      })
      .catch((err) => console.log(err))
  }

}, DEBOUNCE_TIME)
);