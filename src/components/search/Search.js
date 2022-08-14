import React from 'react'
import { GrSearch } from 'react-icons/gr'
import MainContext from '../../MainContext'
import { useContext } from 'react'
function Search() {

    const { search, setSearch } = useContext(MainContext);

    return (
        <div className='search'>
            <div className="icon">
                <GrSearch />
            </div>
            <input type="text" placeholder='Search Brands' onChange={(e) => setSearch(e.target.value)} />
        </div>
    )
}

export default Search