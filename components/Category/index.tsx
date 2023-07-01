import React from 'react'
import CategoryModel from '@/models/category_model'
import { CategoryContainer } from './Category.style'

type categoryPropType={
    categoryName: string,
    categoryThumbnail: string,
    subcategories?: typeof CategoryModel,
    categoryUrl?: string,
}

function Category(props: categoryPropType) {
  return (
    <CategoryContainer>
        
    </CategoryContainer>
  )
}

export default Category
