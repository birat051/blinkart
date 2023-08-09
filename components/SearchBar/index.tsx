import React, {useEffect, useRef, useState} from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Search,SearchContainer,SearchInput, SearchResultContainer} from './search.style';
import { StyledFontAwesomeIcon } from '@/styles/globals.style';
import { Product } from '@/models/product_data_model';
import { ProductCategory } from '@/models/product_category_model';
import { useRouter } from 'next/router';
import RouteHelper from '@/services/routerHelper';

type searchBarProps=
{
    onSearch: (query:string) => void
}

function SearchBar(props:searchBarProps) {
  const [search, setsearch] = useState('')
  const [categoryResult, setCategoryResult] = useState<ProductCategory[]>([])
  const [productResult, setproductResult] = useState<Product[]>([])
  const [resultVisible, setresultVisible] = useState(false)
  const router=useRouter()
  const searchBarRef = useRef<HTMLDivElement | null>(null);
  const onInputChange=(e: React.ChangeEvent<HTMLInputElement>)=>
  {
    setsearch(e.target.value)
  }
  useEffect(() => {
    if(search.length<3)
    {
      setCategoryResult([])
      setproductResult([])
    return
    }
    setresultVisible(true)
    async function getSearchResults(){
      try{
      const response = await fetch(`/api/search?term=${search}&limit=${5}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if(response.status===200)
      {
        const data=await response.json()
        const {categoryResults, productResults}=data
        // console.log('Got category result: ',categoryResults)
        // console.log('Got product result: ',productResults)
        setproductResult([...productResults])
        setCategoryResult([...categoryResults])
      }
    }
    catch(error)
    {
      console.log(error)
    }
    }
    getSearchResults()
  }, [search])
  useEffect(() => {
    // Add click event listener to the document
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setresultVisible(false)
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const goToProduct=(productId:string)=>{
    setCategoryResult([])
    setproductResult([])
    setsearch('')
    router.push(RouteHelper.getProductRoute(productId))
  }
  const goToCategory=(categoryId:string)=>{
    setCategoryResult([])
    setproductResult([])
    setsearch('')
    router.push(RouteHelper.getCategoryRoute(categoryId,'1'))
  }
  return (
    <SearchContainer>
    <Search ref={searchBarRef} >
        <SearchInput type='text' value={search} onChange={onInputChange}  placeholder='Search for products,brands and more...' onClick={()=>setresultVisible(true)}/>
        <StyledFontAwesomeIcon icon={faSearch} width='15px' height='15px' color='#2974F1'/>
        </Search>
         {(categoryResult.length>0 || productResult.length>0) && resultVisible && <SearchResultContainer>
            {productResult.map((product:Product,index)=>{
              return (
                <div key={product._id+index} onClick={()=>goToProduct(product._id)}>
                  <img alt={`Product image for ${product.name}`} src={product.imageUrls[0]} />
                  <p>{product.name.toLowerCase()}</p>
                </div>
              )
            })}
            {categoryResult.map((category:ProductCategory,index)=>{
              return (
                <div key={category._id+index} onClick={()=>goToCategory(category._id)}>
                  {category.imageUrl && <img alt={`Product image for ${category.name.toLowerCase()}`} src={category.imageUrl} />}
                  <p>{category.name.toLowerCase()}</p>
                </div>
              )
            })}
          </SearchResultContainer>}
     </SearchContainer>
  )
}

export default SearchBar