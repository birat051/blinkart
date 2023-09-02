import ProductFilter from '@/components/ProductFilter';
import ProductView from '@/components/ProductView';
import ProductCategoryModel, { ProductCategory } from '@/models/product_category_model';
import ProductDataModel, { Product } from '@/models/product_data_model';
import { CategoryPageContainer, FilterLinks, PageLinkButton, PageNumberContainer, PageNumberRow, PageSpacer, ProductColumn, ProductListView, SortProductContainer } from '@/styles/categorypage.style';
import connectToDatabase from '@/utils/connectDB';
import mongoose from 'mongoose';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
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

export enum SortType {
  Relevance = 'Relevance',
  SortLowtoHigh = 'Price -- Low to High',
  SortHightoLow = 'Price -- High to Low',
  NewestFirst = 'Newest First'
}
  
  function CategoryPage(props:productType) {
    const router= useRouter()
    const currentPage = parseInt(props.pageNumber);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(props.products);
    // console.log('Filtered products is: ',filteredProducts)
    const sortOptions=[SortType.Relevance,SortType.SortLowtoHigh,SortType.SortHightoLow,SortType.NewestFirst]
    const [sortType, setsortType] = useState(router.query.sortBy??SortType.Relevance)
    const [totalPageNumbers, settotalPages] = useState(props.totalPages)
    const includeOutOfStock = router.query.includeOutOfStock??false;
    const sortBy = router.query.sortBy;
    const maxPrice= router.query.maxPrice??props.maxPrice
    const getPageNumbers = () => {
        const totalPages = totalPageNumbers;
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
      const query = {
        sortBy: sortBy,
        maxPrice: encodeURIComponent(maxPrice.toString()),
        includeOutOfStock: encodeURIComponent(includeOutOfStock.toString()),
        };
        router.push({
          pathname: `/categories/${router.query.iD}/${(currentPage+1).toString()}`,
          query,
        },undefined,{shallow: false});
        // router.push(`/categories/${router.query.iD}/${(currentPage+1).toString()}`)
    }
    const goToPrev=()=>{
        const query = {
        sortBy: sortBy,
        maxPrice: encodeURIComponent(maxPrice.toString()),
        includeOutOfStock: encodeURIComponent(includeOutOfStock.toString()),
        };
        router.push({
          pathname: `/categories/${router.query.iD}/${(currentPage-1).toString()}`,
          query,
        },undefined,{shallow: false});
    }
    const applyPriceFilter = (price: number) => {
      const filteredProducts = props.products.filter((product) => product.price <= price);
      setFilteredProducts(filteredProducts);
    };
    useEffect(() => {
      async function getProductsByRelevance(){
        console.log('Fetching products by relevance')
        const response = await fetch(`/api/categories/getProductsByRelevance?categoryId=${props.category._id}&maxPrice=${maxPrice}&pageNumber=${props.pageNumber}&includeOutofStock=${includeOutOfStock}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const data=await response.json()
        if(response.status===200)
        {
          // console.log('Data is: ',data)
          setFilteredProducts(data.products)
          settotalPages(data.totalPages)
        }
        else
        alert(data.error)
      }
      async function getProductsByLowestPrice(){
        console.log('Fetching products by lowest price')
        const response = await fetch(`/api/categories/getProductsByLowPrice?categoryId=${props.category._id}&maxPrice=${maxPrice}&pageNumber=${props.pageNumber}&includeOutofStock=${includeOutOfStock}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const data=await response.json()
        if(response.status===200)
        {
          // console.log('Data is: ',data)
          setFilteredProducts(data.products)
          settotalPages(data.totalPages)
        }
        else
        alert(data.error)
      }
      async function getProductsByHighestPrice()
      {
        console.log('Fetching products by highest price')
        const response = await fetch(`/api/categories/getProductsByHighestPrice?categoryId=${props.category._id}&maxPrice=${maxPrice}&pageNumber=${props.pageNumber}&includeOutofStock=${includeOutOfStock}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const data=await response.json()
        if(response.status===200)
        {
          // console.log('Data is: ',data)
          setFilteredProducts(data.products)
          settotalPages(data.totalPages)
        }
        else
        alert(data.error)
      }
      async function getProductByNewestFirst()
      {
        console.log('Fetching products by newest first')
        const response = await fetch(`/api/categories/getProductsByNewestFirst?categoryId=${props.category._id}&maxPrice=${maxPrice}&pageNumber=${props.pageNumber}&includeOutofStock=${includeOutOfStock}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const data=await response.json()
        if(response.status===200)
        {
          // console.log('Data is: ',data)
          setFilteredProducts(data.products)
          settotalPages(data.totalPages)
        }
        else
        alert(data.error)
      }
      if(sortBy)
      {
        console.log('Sort by value is: ',sortBy)
        console.log('Max price is: ',maxPrice)
        console.log('Include out of stock is: ',includeOutOfStock)
        switch (sortBy) {
          case SortType.Relevance:
            getProductsByRelevance();
            break;
          case SortType.SortHightoLow:
            getProductsByHighestPrice();
            break;
          case SortType.SortLowtoHigh:
            getProductsByLowestPrice();
            break;
          default: 
          getProductByNewestFirst()
        }
      }
      else
      {
      setFilteredProducts(props.products)
      console.log('Using default product with no filters')
      }
    }, [includeOutOfStock,sortBy,maxPrice,props.pageNumber])
    const onSortByChange=(sortBy:SortType)=>
    {
      setsortType(sortBy)
      const query = {
        sortBy: sortBy,
        maxPrice: encodeURIComponent(maxPrice.toString()),
        includeOutOfStock: encodeURIComponent(includeOutOfStock.toString()),
      };
      router.push({
        pathname: `/categories/${props.category._id}/1`,
        query,
      });
    }
    const routeToPage=(pageNumber:number)=>{
      const query = {
        sortBy: sortBy,
        maxPrice: encodeURIComponent(maxPrice.toString()),
        includeOutOfStock: encodeURIComponent(includeOutOfStock.toString()),
      };
      const pathname=`/categories/${props.category._id}/${pageNumber}`
      router.push({
        pathname: pathname,
        query,
      });
    }
    if(router.isFallback)
      return (
          <CategoryPageContainer>
              <LoadingOverlayWrapper active={true}>
              </LoadingOverlayWrapper>
          </CategoryPageContainer>
    )
    if(filteredProducts.length===0)
    return (
      <CategoryPageContainer className='empty'>
        <p>Uh oh! we have run out of products to show for this category</p>
      </CategoryPageContainer>
      )
    return (
      <CategoryPageContainer>
        <Head>
          <title>Blinkart: {props.category.name}</title>
        </Head>
        <ProductFilter category={props.category} parentCategory={props.parentCategory} minPrice={props.minPrice} maxPrice={props.maxPrice} applyPriceFilter={applyPriceFilter} isOutOfStockMarked={includeOutOfStock!=false?true:false}/>
        <ProductColumn>
        <SortProductContainer>
          <h1>Sort By</h1>
          <ul>
            {sortOptions.map((sort)=>{ 
              return (
                <FilterLinks key={sort} className={sortType===sort?'active':''} onClick={()=>onSortByChange(sort)}>
                  {sort}
                </FilterLinks>
              )
            })}
          </ul>
        </SortProductContainer>
        {filteredProducts.length > 0 && (
          <ProductListView>
            {filteredProducts.map((product) => {
              return <ProductView product={product} key={product._id} />
            })}
          </ProductListView>
        )}
        <PageNumberRow>
            <p>
                Page {props.pageNumber} of {totalPageNumbers.toString()}
            </p>
            <PageNumberContainer>
            {props.pageNumber!='1' && <button onClick={goToPrev}>PREVIOUS</button>}
            {getPageNumbers().map((pageNumber) => (
              <PageLinkButton
                onClick={()=>routeToPage(pageNumber)}
                key={pageNumber}
                className={pageNumber.toString() == props.pageNumber ? 'active' : ''}
              >
                {pageNumber}
              </PageLinkButton>
            ))}
            {props.pageNumber<totalPageNumbers.toString() && <button onClick={goToNext}>NEXT</button>}
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
    // console.log('Getting products')
    const { params } = context;
    await connectToDatabase();
    const page = parseInt(params?.pageNumber as string); // Parse the page number from the params
    const products = await ProductDataModel.find({ category: params?.iD,
      quantity: { $gt: 0 } })
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
    // console.log('Products are: ',products)
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
      revalidate: 600
    };
}


export default CategoryPage
