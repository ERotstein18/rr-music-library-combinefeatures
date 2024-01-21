import { useContext } from "react"
import { DataContext } from "../contexts/DataContext"
import GalleryItem from "./GalleryItem"

function Gallery() {
    const dataFromContext = useContext(DataContext)
    
    const display = dataFromContext.map((item, i) => {
        return (
            <GalleryItem key={i} item={item} />
        )
    })
    
    return (
        <div>
            {display}
        </div>
    )
}

export default Gallery

//Hooks
//useState, useEffect, useContext