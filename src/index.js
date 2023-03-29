import { getPictures } from './js/getPictures';
import { renderGallery } from './js/renderGallery';
import debounce from 'lodash.debounce';
import 'simplelightbox/dist/simple-lightbox.min.css'
import simpleLightbox from 'simplelightbox';
const headerForm = document.querySelector('.header__form');
const gallery = document.querySelector('.gallery');
const SCROLL_MARGIN = 700;
const DEBOUNCE_TIME = 500;
let pageNumber = 1;
let perPage = 40;
let lightbox = new simpleLightbox('.gallery a');

headerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  gallery.innerHTML = '';
  const { search } = e.currentTarget;
  searchInput = search.value.trim();

  getPictures(searchInput, pageNumber, perPage, 'Sorry, there are no images matching to your search query.')
    .then((data) => {
      renderGallery(data.hits, gallery);
      lightbox.refresh();
    })
    .catch((err) => console.log(err))
})

window.addEventListener("scroll", debounce(() => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;

  if (scrolled > scrollable - SCROLL_MARGIN) {
    pageNumber++;
    getPictures(searchInput, pageNumber, perPage, `That's all we have`)
      .then((data) => {
        renderGallery(data.hits, gallery);
      })
      .catch((err) => console.log(err))
  }
}, DEBOUNCE_TIME)
);
