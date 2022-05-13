import { useEffect, useState } from "react";
import { useProductSearch } from "../utils/hooks/useProductSearch";
import { useHistory } from "react-router-dom";
import useQuery from "../utils/hooks/useQuery";
import Card from "../components/common/Card";
import AddToCart from "../components/common/AddToCart";
import ImageContainer from "../components/common/Image";
import StyledFlex from "../components/common/StyledFlex";
import StyledGrid from "../components/common/StyledGrid";
import Pagination from "../components/common/Pagination";

const SearchPage = () =>{
    let query = useQuery();
    const { data: searchResults, isLoading } = useProductSearch(query.get('q'))
    const [products, setProducts] = useState([]);
    let history = useHistory();

    useEffect(() => {
		if(!isLoading) {
			setProducts(searchResults);
		}
	},[searchResults,isLoading]);

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
                {products.results && products.results.map((product,index) => 
                    ((
                        <Card key={`${product.data.name}-${index * 100}`} onClick={() => history.push(`/product-detail/${product.id}`)}>
                            <AddToCart/>
                            <ImageContainer width={40} src={product.data.mainimage.url}/>
                            <StyledFlex direction={'row'} justifyContent={'space-between'} alignItems={"flex-start"}>
                                <p>{product.data.name}</p>
                                <p>{product.data.price}</p>
                                <p>{product.data.category.slug}</p>
                            </StyledFlex>
                            <h3>Description</h3>
                            <p>{product.data.short_description}</p>
                        </Card>
                    )
                ))}
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