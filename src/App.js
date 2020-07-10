import React, { useState, useCallback } from 'react';
import * as R from 'ramda'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';

import { shuffleArray, fetchImgs, delay } from './helpers'

import './App.css';
import DisplayImages from './displayImages'
import logo192 from './logo192.png';

function App() {
  const [imgArray, setImgArray] = useState([])
  const [loading, setLoading] = useState(false)
  const [openedCardIndex, setOpenedCardIndex] = useState(null)
  const [allowClick, setAllowClick] = useState(true)

  const loadImages = useCallback(() => {
    fetchImgs()
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
      })
  }, [])

  const changeCardStatus = useCallback((index) => {
    const newImgArray = R.update(
      index,
      {
        ...imgArray[index],
        status: !imgArray[index].status
      },
      imgArray
    )

    setImgArray(newImgArray);
  }, [imgArray])

  const handleClick = useCallback((index) => () => {
    const selectedElement = imgArray[index]

    changeCardStatus(index);

    if (openedCardIndex === null) {
      setOpenedCardIndex(index);

    } else if (imgArray[openedCardIndex].matchId === selectedElement.matchId) {
      setOpenedCardIndex(null);

    } else if (imgArray[openedCardIndex].matchId !== selectedElement.matchId) {
      setAllowClick(false)

      delay().then(() => {
        changeCardStatus(index)
        changeCardStatus(openedCardIndex)

        setOpenedCardIndex(null)
        setAllowClick(true)
      })
    }
  }, [changeCardStatus, imgArray, openedCardIndex])

  const handleLoadImageClick = useCallback(() => {
    setLoading(true)
    setAllowClick(true)
    setOpenedCardIndex(null)

    loadImages()
  }, [loadImages])

  const innerTheme = createMuiTheme({
    palette: {
      secondary: {
        main: '#00BFFF',
      },
      primary: {
        main: '##00FFFF',
      }
    },
  });
  

  return (
    <div className="App">
      <div className="button-wrapper">
      <ThemeProvider theme={innerTheme}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLoadImageClick}
          disabled={loading}
        >
          Start game

          {
            loading && <CircularProgress size={20} />
          }
        </Button>
        </ThemeProvider>
      </div>

      {
        !loading && <Box className="img-wrapper"
        display="flex" flexWrap="wrap" justifyContent="space-between" width="820px" height="820px">
          {
            imgArray.map(({ url, status }, index) => {
              const couldPlayerClick = allowClick && !status

              return (
                <Paper key={url + index} square elevation={3} className="styled-paper">
                  <DisplayImages
                    frontImg={url}
                    backImg={logo192}
                    cardStatus={status}
                    onClick={couldPlayerClick ? handleClick(index) : undefined}
                  />
                </Paper>
              )
            })
          }
        </Box>
      }

    </div>
  );
}

export default App;
