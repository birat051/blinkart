import React, {useEffect, useState } from 'react'
import { CategoryNavLink, ClearAllLink, FilterContainer, FilterView, PriceView } from './ProductFilter.style'
import { ProductCategory } from '@/models/product_category_model'
import { useRouter } from 'next/router'
import { SortType } from '@/pages/categories/[iD]/[pageNumber]'

type productFilterProp = {
  category: ProductCategory
  parentCategory?: ProductCategory | null,
  minPrice: number,
  maxPrice: number,
  applyPriceFilter: (price: number)=>void,
  isOutOfStockMarked: boolean,
}


function ProductFilter(props: productFilterProp) {
  const router=useRouter()
  const sortBy=router.query.sortBy??SortType.Relevance
  const [price, setprice] = useState(router.query.maxPrice??props.maxPrice)
  const [isOutOfStockMarked, setisOutOfStockMarked] = useState<boolean>(router.query.includeOutOfStock?JSON.parse(router.query.includeOutOfStock.toString()):false)
  const [applyChanges, setapplyChanges] = useState(false)
  const changePrice=(event:React.ChangeEvent<HTMLInputElement>)=>{
    event.preventDefault()
    setprice(parseInt(event.target.value))
  }
  const handleCheckboxChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setisOutOfStockMarked(!isOutOfStockMarked)
  }
  useEffect(()=>{
    setprice(router.query.maxPrice??props.maxPrice)
    setisOutOfStockMarked(router.query.includeOutOfStock?JSON.parse(router.query.includeOutOfStock.toString()):false)
  },[router.query])
  useEffect(() => {
    const includeOutOfStock=router.query.includeOutOfStock?JSON.parse(router.query.includeOutOfStock.toString()):false
    const maxPrice=router.query.maxPrice??props.maxPrice
    if(isOutOfStockMarked!=includeOutOfStock || maxPrice!=price)
    setapplyChanges(true)
    else
    setapplyChanges(false)
  }, [price,isOutOfStockMarked,router.query])
  const routeToPage=()=>{
    const query = {
      sortBy: sortBy,
      maxPrice: encodeURIComponent(price.toString()),
      includeOutOfStock: encodeURIComponent(isOutOfStockMarked.toString()),
    };
    setapplyChanges(false)
    const pathname=`/categories/${props.category._id}/1`
    router.push({
      pathname: pathname,
      query,
    },undefined,{shallow: false});
  }
  return (
    <FilterContainer>
      <FilterView>
        <div>
        <h1>Filters</h1>
       {(isOutOfStockMarked || parseInt(price.toString())!==props.maxPrice) && <ClearAllLink href={`/categories/${props.category._id}/1?sortBy=${sortBy}`}>CLEAR ALL</ClearAllLink>}
        </div>
      </FilterView>
      <FilterView>
        <h3>CATEGORIES</h3>
        <div>
        {props.parentCategory && <span><CategoryNavLink href={`/categories/${props.parentCategory._id}/1`}>{props.parentCategory.name} &gt; </CategoryNavLink></span>}
        {props.category && <h2>{props.category.name}</h2>}
        </div>
      </FilterView>
      <FilterView>
      <h2>Price</h2>
      <input type='range' min={props.minPrice} max={props.maxPrice} step={50} onChange={changePrice} value={price}/>
      <PriceView>
        <h2>{props.minPrice}</h2>
        {/* <h2>{price}</h2> */}
        <h2>{price}</h2>
      </PriceView>
      </FilterView>
      <FilterView>
        <div>
          <h2>Include out of stock products</h2>
          <input type='checkbox' checked={isOutOfStockMarked} onChange={handleCheckboxChange}/>
        </div>
      </FilterView>
      {applyChanges &&<FilterView> <button onClick={routeToPage}>Apply</button> </FilterView>}
    </FilterContainer>
  )
}

export default ProductFilter
