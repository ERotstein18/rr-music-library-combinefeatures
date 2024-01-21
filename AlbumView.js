import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from "./Spinner";

function AlbumView() {
    const navigate = useNavigate ()
    const { id } = useParams()
    const [albumData, setAlbumData] = useState([])

    useEffect(() => {
        const API_URL = `http://localhost:4000/song/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            setAlbumData(resData.results)
        }
        fetchData()
    },[id])
    
    const allSongs = albumData.filter(entity => entity.kind === 'song')
    .map((album, i) => {
        return (
            <div key={i}>
                {album.trackName}
            </div>
        )
    })

    const navButtons = () => {
        return(
            <div>
                <button onClick={() => {navigate.push('/')}}>Home</button> |
                <button onClick={() => {navigate.goBack()}}>Back</button>
            </div>
        )
    }
    
    return (
        <div>
            {albumData.length > 0 ? <h2>{albumData[0].collectionName}</h2> :<Spinner />}
            {navButtons()}
            {allSongs}
        </div>
    )
    
}

export default AlbumView
