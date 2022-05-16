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
import ItemCounter from '../components/common/ItemCounter';
import { useContext } from 'react';
import ShoppingCartContext from '../utils/state/ShoppingCartContext';



const ProductListPage = () => {
	let query = useQuery();
	let history = useHistory();
	const { state, dispatch } = useContext(ShoppingCartContext);
	const [itemCount, setItemCount] = useState([]);
	const { data: categoriesList, isLoading } = useFetch('category');
	const { data: productList, isLoading: loadingProductList } = useFetch('product',false,12)
	const [products, setProducts] = useState([]);
	const [filters, setFilters] = useState(new Set(query.get('category') ? [query.get('category') ] : []));

	useEffect(() => {
		if(!loadingProductList) {
			setProducts(productList);
		}
	},[productList,loadingProductList]);
	useEffect(() => {
		let counters = []
		if(products.results && itemCount.length === 0) {
			for(let i = 0; i < products.results.length; i++) {
				counters.push(0);
			}
			setItemCount(counters)
		}
	},[products])
	const handleAddItem = (indexToUpdate) => {
		const newProducts = products.results.map((item, index) => {
			if(indexToUpdate === index) {
				return {
					...item,
					data: {
						...item.data,
						stock: item.data.stock - itemCount[indexToUpdate],

					}
				}
			}
			return item;
		});
		dispatch({
			type: "ADD_ITEM",
			payload: {
				product: newProducts[indexToUpdate], 
				itemCount: itemCount[indexToUpdate],
			},
		})
		setProducts({...products, results: newProducts});
	}
	const handleOnChange = (e, indexToUpdate) => {
		const newCounters = itemCount.map((item, index) => {
			if(indexToUpdate === index) {
				return parseInt(e.target.value);
			}
			return item;
		});
		setItemCount(newCounters);
	}
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
	const checkAvailability = (product,numberBefore) => {
		let element = state.items.find(item => product.id === item.id);
		return  product.data.stock - (element === undefined ? 0 : element.count) - numberBefore
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
					{itemCount.length > 0 && products.results && products.results.map((product,index) =>
						((filters.has(product.data.category.slug) || filters.size === 0) && (
							<Card key={`${product.data.name}-${index}`}>
								<p>{product.data.name}</p>
								<ItemCounter
									value={itemCount[index]}
									disabled={(checkAvailability(product,itemCount[index])) <= 0}
									add={() => handleAddItem(index)}
									onChange={(e) => handleOnChange(e,index)}
								/>
								<ImageContainer 
									onClick={() => history.push(`/product-detail/${product.id}`)} 
									width={40} src={product.data.mainimage.url}
								/>
								<StyledFlex direction={'row'} justifyContent={'space-between'} alignItems={"flex-start"}>	
									<p><strong>Price: </strong>${product.data.price}</p>
									<p><strong>Category: </strong>{product.data.category.slug}</p>
								</StyledFlex>
								<button onClick={() => history.push(`/product-detail/${product.id}`)}>See more details of this product</button>
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
