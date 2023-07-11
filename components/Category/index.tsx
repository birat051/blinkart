import React from 'react'
import { CategoryBlock, CategoryContainer, CategorySpacer } from './Category.style'
import { ProductCategory } from '@/models/product_category_model'
import Image from 'next/image'

type categoryPropType=
{
  category: ProductCategory[]
}

function CategoryDisplay(props: categoryPropType) {
  return (
    <CategoryContainer>
      {props.category.map(function(data) {
      return (
        <CategoryBlock key={data.name}>
          <Image src={data.imageUrl??''} height={50} alt={`category image for ${data.name}`} width={50}/>
          <CategorySpacer />
          <h1>{data.name}</h1>
        </CategoryBlock>
      )
    })}
    </CategoryContainer>
  )
}

export default CategoryDisplay
