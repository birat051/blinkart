import { ProductCategory } from '@/models/product_category_model'
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { CategoryBlock, CategorySpacer, SubcategoryMenu } from '../Category/Category.style'
import { Category } from './CategoryDisplay.style'

type categoryProp = {
  subcategories: ProductCategory[],
  category: ProductCategory
}

function CategoryView(props: categoryProp) {
  const [subCatVisible, setsubCatVisible] = useState(false)
  const router = useRouter()

  const goToCategory = (value: string) => {
    router.push(value)
  }

  const handleMouseEnter = () => {
    if (props.subcategories.length === 0)
      return
    setsubCatVisible(true)
    console.log('Category visible for: ', props.category.name)
  }

  const handleMouseLeave = () => {
    setsubCatVisible(false)
  }

  return (
    <Category onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <CategoryBlock onClick={() => goToCategory(`/categories/${props.category._id}/1`)} >
        <Image src={props.category.imageUrl ?? ''} height={50} alt={`category image for ${props.category.name}`} width={50} />
        <CategorySpacer />
        <h1>{props.category.name}</h1>
      </CategoryBlock>
      {props.subcategories.length != 0 && subCatVisible && <SubcategoryMenu>
      {props.subcategories.map((item)=>{
        return (
          <div key={item.name+item._id} onClick={()=>goToCategory(`/categories/${item._id}`)}>{item.name}</div>
        )
      })}
    </SubcategoryMenu>}
    </Category>
  )
}

export default CategoryView

