import React from 'react'
import { CategoryBlock, CategoryContainer, CategorySpacer } from './Category.style'
import { ProductCategory } from '@/models/product_category_model'
import Image from 'next/image'
import { useRouter } from 'next/router'

type categoryPropType=
{
  category: ProductCategory[]
}

function CategoryDisplay(props: categoryPropType) {
  const router=useRouter()
  const goToCategory=(value:string)=>
  {
    router.push(value)
  }
  return (
    <CategoryContainer>
      {props.category.map(function(data) {
      return (
        <CategoryBlock key={data.name} onClick={()=>goToCategory(data.categoryURL)}>
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
