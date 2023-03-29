import Notiflix from "notiflix";
import axios from "axios";
const NotiflixOptions = { distance: '2px', cssAnimationStyle: 'from-right', showOnlyTheLastOne: 'true' };

const keyApi = '34496784-5c04c6808b45fff2d8f218602';
const getPictures = (name, page = 1, per_page = 40, message) => {
    return axios.get(`https://pixabay.com/api/?key=${keyApi}&q=${name}&page=${page}&per_page=${per_page}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(data => {
            if (data.data.total === 0) return Notiflix.Notify.warning(message, NotiflixOptions);
            return data.data;
        })
        .catch(err => console.error(err))
}
export { getPictures } 