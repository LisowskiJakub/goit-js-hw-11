import { fetchPictures } from './js/fetchPictures';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import 'simplelightbox/dist/simple-lightbox.min.css'
import simpleLightbox from 'simplelightbox';
const { log } = console;
const headerForm = document.querySelector('.header__form');
const gallery = document.querySelector('.gallery');
const NotiflixOptions = { distance: '2px', cssAnimationStyle: 'from-right', showOnlyTheLastOne: 'true' };
const SCROLL_MARGIN = 700;
const DEBOUNCE_TIME = 100;
let pageNumber = 1;
let searchData = '';
let lightbox = new simpleLightbox('.gallery a');
const renderGallery = picturesArr => {
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
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}


headerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  gallery.innerHTML = '';
  const { search } = e.currentTarget;
  searchData = search.value.trim();
  fetchPictures(searchData, pageNumber)
    .then((data) => {
      log(data)
      if (data.hits.length === 0) return Notiflix.Notify.warning('Sorry, there are no images matching to your search query.', NotiflixOptions);
      renderGallery(data.hits);

    })
    .catch((err) => console.log(err))
})

window.addEventListener("scroll", debounce(() => {

  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;

  if (scrolled > scrollable - SCROLL_MARGIN) {

    pageNumber++;
    fetchPictures(searchData, pageNumber)
      .then((data) => {
        if (data.hits.length === 0) return Notiflix.Notify.warning('Sorry, there are no more images matching your search query. Please try again.', NotiflixOptions)
        renderGallery(data.hits);

      })
      .then(console.log('refresh'))

      .catch((err) => console.log(err))
  }

}, DEBOUNCE_TIME)
);
