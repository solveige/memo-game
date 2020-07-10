export const apiCall = (url, params = {}) => {

}

const extractImgurSources = data => {
  const newImgArray = data.data.map(element => {
    return element.images && element.images.length > 0 ? element.images[0].link : null
  })
    .filter(item => item)
    .splice(0, 8)

  return Promise.resolve(newImgArray)
}

export const fetchImgs = () =>
  fetch(`https://api.imgur.com/3/gallery/search/top/all/${Math.random() * 100}?q=animals&q_type=jpg|png&q_size_px=small`, {
    headers: {
      'Authorization': 'Client-ID 1b23790c0a2db2d'
    }
  })
    .then(response => response.json())
    .then(extractImgurSources)

export const shuffleArray = (array) => {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export const delay = (ms = 1000) => new Promise(res => setTimeout(res, ms)) 