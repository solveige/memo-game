
  const extractImgurSources = data => {
    const newImgArray = data.data.map(element => {
      return element.images && element.images.length > 0 ? element.images[0].link : null
    })
      .filter(item => item)
      .splice(0, 8)

    return Promise.resolve(newImgArray)
  }

  const randomPage = Math.random() * 100


    const fetchImg = () => {
    fetch(`https://api.imgur.com/3/gallery/search/top/all/${randomPage}?q=animals&q_type=jpg|png&q_size_px=small`, {
      headers: {
        'Authorization': 'Client-ID 1b23790c0a2db2d'
      }
    })
      .then(response => response.json())
      .then(extractImgurSources)
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