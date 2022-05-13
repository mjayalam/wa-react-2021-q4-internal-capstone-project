import React, { useState, useEffect } from 'react';
import useQuery from '../utils/hooks/useQuery';
import { useFetch } from '../utils/hooks/useFetch';
import { useHistory } from 'react-router-dom';
import StyledGrid from '../components/common/StyledGrid';
import Card from '../components/common/Card';
import StyledFlex from '../components/common/StyledFlex';
import Sidebar from '../components/common/Sidebar';
import Pagination from '../components/common/Pagination';
import ImageContainer from '../components/common/Image';
import AddToCart from '../components/common/AddToCart';



const ProductListPage = () => {
	let query = useQuery();
	let history = useHistory();
	const { data: categoriesList, isLoading } = useFetch('category');
	const { data: productList, isLoading: loadingProductList } = useFetch('product',false,12)
	const [products, setProducts] = useState([]);
	const [filters, setFilters] = useState(new Set(query.get('category') ? [query.get('category') ] : []));

	useEffect(() => {
		if(!loadingProductList) {
			setProducts(productList);
		}
	},[productList,loadingProductList]);

	const nextPageRequest =  async () => {
		if(products.next_page == null) return;
		try {
			const response = await fetch(products.next_page);
			const newProducts = await response.json();
			setProducts(newProducts);
		} catch(error) {
			console.error(error);
		}
	}

	const previousPageRequest = async () => {
		if(products.prev_page == null) return;
		try {
			const response = await fetch(products.prev_page);
			const newProducts = await response.json();
			setProducts(newProducts);
		} catch(error) {
			console.error(error);
		}
	}
	if(isLoading || loadingProductList) {
		return <h3>Loading data..</h3>
	}
	return (
		<>
			<StyledFlex direction={"row"}>
				<Card>
					<Sidebar categories={categoriesList} setFilters={setFilters} filters={filters}/>
				</Card>
				<StyledGrid>
					{products.results && products.results.map((product,index) => 
						((filters.has(product.data.category.slug) || filters.size === 0) && (
							<Card key={`${product.data.name}-${index}`}>
								<p>{product.data.name}</p>
								<AddToCart onClick={() => {}} />
								<ImageContainer 
									onClick={() => history.push(`/product-detail/${product.id}`)} 
									width={40} src={product.data.mainimage.url}
								/>
								<StyledFlex direction={'row'} justifyContent={'space-between'} alignItems={"flex-start"}>	
									<p><strong>Price: </strong>${product.data.price}</p>
									<p><strong>Category: </strong>{product.data.category.slug}</p>
								</StyledFlex>
							</Card>
						)
					))}
				</StyledGrid>	

			</StyledFlex>
			{products.results && <Pagination
				disabledPrev={products.prev_page == null}
				disabledNext={products.next_page == null}
				nextRequest={nextPageRequest} 
				previousRequest={previousPageRequest}
			/>}
		</>
	);
}

export default ProductListPage;
