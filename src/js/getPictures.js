import Notiflix from "notiflix";
import axios from "axios";
const NotiflixOptions = { distance: '2px', cssAnimationStyle: 'from-right', showOnlyTheLastOne: 'true' };

const keyApi = '34496784-5c04c6808b45fff2d8f218602';
const getPictures = async (name, page = 1, per_page = 40, message) => {
    return await axios.get(`https://pixabay.com/api/?key=${keyApi}&q=${name}&page=${page}&per_page=${per_page}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(data => {
            if (data.status !== 200) throw new Error(data.status);
            console.log(data.data.hits);
            if (data.data.hits.length === 0) Notiflix.Notify.warning(message, NotiflixOptions);

            return data.data;
        })
        .catch(err => console.error(err))
}
export { getPictures } 