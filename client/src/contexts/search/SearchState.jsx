import React, { useState, useContext } from 'react'
import SearchContext from './SearchContext'

const SearchState = ({children}) => {
  const [ searchQuery, setSearchQuery ] = useState('')

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  )
}

export default SearchState
