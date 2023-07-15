import { CategoryContainer} from './Category.style'
import { ProductCategory } from '@/models/product_category_model'
import CategoryView from '../CategoryDisplay'

type categoryPropType=
{
  category: ProductCategory[],
  subcategories: {
    [key: string]: any // Replace 'any' with the type of your subcategory object
  }
}

function CategoryDisplay(props: categoryPropType) {
  return (
    <CategoryContainer>
      {props.category.map(function(data) {
      return (
        <CategoryView key={data.name} category={data} subcategories={props.subcategories[data.name]}/>
      )
    })}
    </CategoryContainer>
  )
}

export default CategoryDisplay
