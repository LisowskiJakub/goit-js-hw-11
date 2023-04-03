import { getPictures } from './js/getPictures';
import { renderGallery } from './js/renderGallery';
import debounce from 'lodash.debounce';
import 'simplelightbox/dist/simple-lightbox.min.css'
import simpleLightbox from 'simplelightbox';
const headerForm = document.querySelector('.header__form');
const gallery = document.querySelector('.gallery');
const SCROLL_MARGIN = 1000;
const DEBOUNCE_TIME = 200;
const PER_PAGE = 40;
let pageNumber = 1;
let lightbox = new simpleLightbox('.gallery a');

headerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  gallery.innerHTML = '';
  const { search } = e.currentTarget;
  let searchInput = search.value.trim();

  getPictures(searchInput, pageNumber, PER_PAGE, 'Sorry, there are no images matching to your search query.')
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
    getPictures(searchInput, pageNumber, PER_PAGE, `That's all we have`)
      .then((data) => {
        renderGallery(data.hits, gallery);
        lightbox.refresh();
        const { height: cardHeight } = document
          .querySelector(".gallery")
          .firstElementChild.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * 2,
          behavior: "smooth",
        });
      })
      .catch((err) => console.log(err))
  }
}, DEBOUNCE_TIME)
);
