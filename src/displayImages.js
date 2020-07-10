import React from 'react'

const style = { 
  width: 200, 
  height: 200, 
  objectFit: 'contain',
  boxSizing: 'border-box',
}

function DisplayImages(props) {
  return (
      <img
        style={style}
        src={props.cardStatus ? props.frontImg : props.backImg}
        onClick={props.onClick}
        alt="bla"
      />
    )
}

export default React.memo(DisplayImages)