import React from 'react'
import { CategoryContainer } from './Category.style'
import { ProductCategory } from '@/models/product_category_model'

type categoryPropType=
{
  category: ProductCategory[]
}

function CategoryDisplay(props: categoryPropType) {
  return (
    <CategoryContainer>
        
    </CategoryContainer>
  )
}

export default CategoryDisplay
