import React, {useState } from 'react'
import { CategoryNavLink, FilterContainer, FilterView, PriceView } from './ProductFilter.style'
import { ProductCategory } from '@/models/product_category_model'

type productFilterProp = {
  category: ProductCategory
  parentCategory?: ProductCategory | null,
  minPrice: number,
  maxPrice: number,
  applyPriceFilter: (price: number)=>void
}


function ProductFilter(props: productFilterProp) {
  const [price, setprice] = useState(props.maxPrice)
  const changePrice=(event:React.ChangeEvent<HTMLInputElement>)=>{
    event.preventDefault()
    setprice(parseInt(event.target.value))
    props.applyPriceFilter(parseInt(event.target.value))
  }
  return (
    <FilterContainer>
      <FilterView>
        <h1>Filters</h1>
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
    </FilterContainer>
  )
}

export default ProductFilter
