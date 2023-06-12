import React, {useState} from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Search,SearchInput} from './search.style';
import { StyledFontAwesomeIcon } from '@/styles/globals.style';

type searchBarProps=
{
    onSearch: (query:string) => void
}

function SearchBar(props:searchBarProps) {
  const [search, setsearch] = useState('')

  const onInputChange=(e: React.ChangeEvent<HTMLInputElement>)=>
  {
    setsearch(e.target.value)
  }

  const handleKeyPress=(e: React.KeyboardEvent<HTMLInputElement>)=>
  {
    if(e.key==='Enter')
    props.onSearch(search)
  }
  return (
    <Search>
        <SearchInput type='text' value={search} onChange={onInputChange} onKeyDown={handleKeyPress} placeholder='Search for products,brands and more...'/>
        <StyledFontAwesomeIcon icon={faSearch} width='15px' height='15px' color='#2974F1'/>
    </Search>
  )
}

export default SearchBar