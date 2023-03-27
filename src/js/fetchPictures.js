
const keyApi = '34496784-5c04c6808b45fff2d8f218602';
const fetchPictures = (name, page = 1, per_page = 40,) => {
    return fetch(`https://pixabay.com/api/?key=${keyApi}&q=${name}&page=${page}&per_page=${per_page}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.status)
        })
        .catch(err => console.error(err))
}



export { fetchPictures } 