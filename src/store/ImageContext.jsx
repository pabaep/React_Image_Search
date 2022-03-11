import React from "react";

const ImageContext = React.createContext({
    imageurl: "",
    updateImage: (imageItem) => {}
});

export default ImageContext;