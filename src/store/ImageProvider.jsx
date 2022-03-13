import React, { useState } from 'react'
import ImageContext from './ImageContext'

const ImageProvider = (props) => {
    const [imageState, setImageState] = useState({imageurl: ''})

    const updateImageItemHandler = imageItem => {
      setImageState({imageurl: imageItem});
    }


    const imageContext = {
      imageurl: imageState.imageurl,
      updateImage: updateImageItemHandler
    }

  return (
    <ImageContext.Provider value={imageContext}>{props.children}</ImageContext.Provider>
  )
}

export default ImageProvider;