
const extractImageSources = data => {
  const newImgArray = data.map(element => {
    return element.urls.custom;
  })
  console.log(newImgArray)
  return Promise.resolve(newImgArray)
}

const fetchImgs = () => {
  fetch('https://api.unsplash.com/photos/random?query=animal&count=8&client_id=cfuoe0Fs7vuxfg8cRRnKqzH8_hkAeKtS4pFg9eb16mk&w=200&h=200&fit=clamp')
    .then(response => response.json())
    .then(extractImageSources)
    .then(data => {
      const cards = data.map((img, idx) => ({
        matchId: idx,
        url: img,
        status: false
      }))

      const dCards = [...cards, ...cards]
      const shuffledDCards = shuffleArray(dCards)

      setImgArray(shuffledDCards)
      setLoading(false)

      return Promise.resolve()
    })
}