import { useState } from "react"
import { SearchContext } from "../contexts/SearchContext"

function SearchBar (props) {
    const [searchTerm, handleSearch] = useState('')

    return (
        <form onSubmit={(e) => props.handleSearch(e,searchTerm)}>
            <input type="type" placeholder="Enter band name here"
                onChange={(e) => handleSearch(e.target.value)} />
            <input type="submit" />
        </form>
    )
}

export default SearchBar