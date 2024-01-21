import './App.css';
import { useEffect, useState, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import Spinner from './components/Spinner';
import { SearchContext } from './contexts/SearchContext'
import { DataContext } from './contexts/DataContext'
import {createResource as fetchData } from './Helper'

function App(){
    const [search, setSearch] = useState('')
  const [message, setMessage] = useState('Search for Music!')
  const [data, setData] = useState([])

  const API_URL = `https://itunes.apple.com/search?term=`
  
  useEffect(() => {
    if(search) {
    const fetchData = async () => {
      document.title = `${search} Music`
      const response = await fetch(API_URL + search)
      const resData = await response.json()

      if (resData.results.length > 0) {
        setData(resData.results)
      } else {
        setMessage('No results found')
      }
    }
    fetchData()
    }
  }, [search]) //eslint-disable-line react-hooks/exhaustive-deps
    
  const handleSearch = async (e, term) => {
    e.preventDefault()
    setSearch(fetchData(term, 'main'))
  }
  
  const renderGallery = () => {
    if(data) {
      return (
        <Suspense fallback={<Spinner />}>
          <Gallery />
        </Suspense>
      )
    }
  }

return (
  <div className='App'>
    {message}
    <Router>
      <Routes exact path={'/'}>
        <SearchContext.Provider value={{term: SearchBar, handleSearch: handleSearch}} />
          <DataContext.Provider value={data}>
            {renderGallery()}
          </DataContext.Provider>
      </Routes>
      <Route path='/album/:id'>
        <AlbumView />
      </Route>
      <Route path='/artist/:id'>
        <ArtistView />
      </Route>
    </Router>
  </div>
  );
}

export default App