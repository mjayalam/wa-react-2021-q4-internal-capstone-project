import { useEffect, useState, useContext } from "react";
import { useProductSearch } from "../utils/hooks/useProductSearch";
import useQuery from "../utils/hooks/useQuery";
import Card from "../components/common/Card";
import ImageContainer from "../components/common/Image";
import StyledFlex from "../components/common/StyledFlex";
import StyledGrid from "../components/common/StyledGrid";
import Pagination from "../components/common/Pagination";
import ItemCounter from "../components/common/ItemCounter";
import ShoppingCartContext from "../utils/state/ShoppingCartContext";

const SearchPage = () => {
    let query = useQuery();
    const { state, dispatch } = useContext(ShoppingCartContext)
    const [itemCount, setItemCount] = useState([]);
    const { data: searchResults, isLoading } = useProductSearch(query.get('q'))
    const [products, setProducts] = useState([]);

    useEffect(() => {
		if(!isLoading) {
			setProducts(searchResults);
		}
	},[searchResults,isLoading]);
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
    if(isLoading) {
      return <h3>Loading search results..</h3>
    }
    if(products.results && products.results.length === 0) {
      return <h3>There are no matches for {query.get('q') ? query.get('q') : 'your search'}</h3>
    }
	return (
		<>
			<h1>Results for:  {query.get('q')}</h1>
			<StyledGrid>
				{products.results && products.results.map((product,index) => ((
					<Card key={`${product.data.name}-${index * 100}`}>
						<ItemCounter
							value={itemCount[index]}
							disabled={(checkAvailability(product,itemCount[index])) <= 0}
							add={() => handleAddItem(index)}
							onChange={(e) => handleOnChange(e,index)}
						/>
						<ImageContainer width={40} src={product.data.mainimage.url}/>
						<StyledFlex direction={'row'} justifyContent={'space-between'} alignItems={"flex-start"}>
							<p>{product.data.name}</p>
							<p>{product.data.price}</p>
							<p>{product.data.category.slug}</p>
						</StyledFlex>
						<h3>Description</h3>
						<p>{product.data.short_description}</p>
					</Card>
				)))}
			</StyledGrid>
			<Pagination
				disabledPrev={products.prev_page == null}
				disabledNext={products.next_page == null}
				nextRequest={nextPageRequest}
				previousRequest={previousPageRequest}
			/>
		</>
	)
}

export default SearchPage;
