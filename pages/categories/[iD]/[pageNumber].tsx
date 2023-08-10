import ProductFilter from '@/components/ProductFilter';
import ProductView from '@/components/ProductView';
import ProductCategoryModel, { ProductCategory } from '@/models/product_category_model';
import ProductDataModel, { Product } from '@/models/product_data_model';
import { CategoryPageContainer, PageLink, PageNumberContainer, PageNumberRow, PageSpacer, ProductColumn, ProductListView } from '@/styles/categorypage.style';
import connectToDatabase from '@/utils/connectDB';
import mongoose from 'mongoose';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import LoadingOverlayWrapper from 'react-loading-overlay-ts';

type productType={
    products: Product[],
    pageNumber: string,
    totalPages: number,
    category: ProductCategory,
    parentCategory: ProductCategory | null,
    minPrice: number,
    maxPrice: number
  }
  
  function CategoryPage(props:productType) {
    const router= useRouter()
    const currentPage = parseInt(props.pageNumber);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(props.products);
    const getPageNumbers = () => {
        const totalPages = props.totalPages;
        const displayPages = 4; // Number of pages to display
        const pages: number[] = [];
    
        let start = currentPage - Math.floor(displayPages / 2);
        let end = currentPage + Math.floor(displayPages / 2);
    
        if (start < 1) {
          start = 1;
          end = start + displayPages - 1;
        }
    
        if (end > totalPages) {
          end = totalPages;
          start = end - displayPages + 1;
          if (start < 1) {
            start = 1;
          }
        }
    
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
    
        return pages;
      };
    const goToNext=()=>{
        router.push(`/categories/${router.query.iD}/${(currentPage+1).toString()}`)
    }
    const goToPrev=()=>{
        router.push(`/categories/${router.query.iD}/${(currentPage-1).toString()}`)
    }
    const applyPriceFilter = (price: number) => {
      const filteredProducts = props.products.filter((product) => product.price <= price);
      console.log('Filtered products are: ',filteredProducts)
      setFilteredProducts(filteredProducts);
    };
    if(router.isFallback)
      return (
          <CategoryPageContainer>
              <LoadingOverlayWrapper active={true}>
              </LoadingOverlayWrapper>
          </CategoryPageContainer>
    )
    return (
      <CategoryPageContainer>
        <Head>
          <title>Blinkart: {props.category.name}</title>
        </Head>
        <ProductFilter category={props.category} parentCategory={props.parentCategory} minPrice={props.minPrice} maxPrice={props.maxPrice} applyPriceFilter={applyPriceFilter}/>
        <ProductColumn>
        {props.products.length > 0 && (
          <ProductListView>
            {props.products.map((product) => {
              return <ProductView product={product} key={product._id} />;
            })}
          </ProductListView>
        )}
        <PageNumberRow>
            <p>
                Page {props.pageNumber} of {props.totalPages.toString()}
            </p>
            <PageNumberContainer>
            {props.pageNumber!='1' && <button onClick={goToPrev}>PREVIOUS</button>}
            {getPageNumbers().map((pageNumber) => (
              <PageLink
                href={`/categories/${router.query.iD}/${pageNumber}`}
                key={pageNumber}
                className={pageNumber.toString() == props.pageNumber ? 'active' : ''}
                passHref
              >
                {pageNumber}
              </PageLink>
            ))}
            {props.pageNumber<props.totalPages.toString() && <button onClick={goToNext}>NEXT</button>}
            </PageNumberContainer>
            <PageSpacer/>
        </PageNumberRow>
        </ProductColumn>
      </CategoryPageContainer>
    )
  }

export async function getStaticPaths() {
    await connectToDatabase();
  
    const categories = await ProductCategoryModel.find();
  
    const paths = [];
  
    for (const category of categories) {
      const totalProducts = await ProductDataModel.countDocuments({
        category: category._id,
      });
      const totalPages = Math.ceil(totalProducts / 5); // Calculate total number of pages
  
      for (let i = 1; i <= totalPages; i++) {
        paths.push({
          params: {
            iD: category._id.toString(),
            pageNumber: i.toString(), // Include the page number in the path
          },
        });
      }
    }
  
    return {
      paths,
      fallback: true, // or true if you want to enable fallback rendering
    };
  }

  export async function getStaticProps(context: GetStaticPropsContext) {
    const { params } = context;
    await connectToDatabase();
    const page = parseInt(params?.pageNumber as string); // Parse the page number from the params
    const products = await ProductDataModel.find({ category: params?.iD })
      .skip((page - 1) * 5) // Skip the products on previous pages
      .limit(5); // Fetch a maximum of 5 products for the current page
    const totalProducts = await ProductDataModel.countDocuments({ category: params?.iD });
    const totalPages = Math.ceil(totalProducts / 5);
    const category = await ProductCategoryModel.findOne({ _id: params?.iD });
    // console.log('Got category: ',category)
    let parentCategory = null
    if(category.parentCategory!=null)
    parentCategory = await ProductCategoryModel.findOne({_id: category.parentCategory})
    const priceStats = await ProductDataModel.aggregate([
      { $match: { category: new mongoose.Types.ObjectId(params?.iD as string) } },
      {
        $group: {
          _id: null,
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
    ]);
    // console.log('Products are: ',products)
    // console.log('Price stats are: ',priceStats)
    // console.log('Got parentCategory: ',parentCategory)
    let minPrice = 0;
    let maxPrice = 0;

    if (priceStats.length > 0) {
      minPrice = priceStats[0].minPrice || 0;
      maxPrice = priceStats[0].maxPrice || 0;
    }
    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
        pageNumber: page,
        totalPages: totalPages,
        category: JSON.parse(JSON.stringify(category)),
        parentCategory: JSON.parse(JSON.stringify(parentCategory)),
        minPrice: minPrice,
        maxPrice: maxPrice,
      },
    };
}


export default CategoryPage
