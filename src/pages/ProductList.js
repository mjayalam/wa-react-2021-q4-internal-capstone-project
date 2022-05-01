import React, { useState, useEffect } from 'react';
import Grid from '../components/common/Grid';
import Card from '../components/common/Card';
import Flex from '../components/common/Flex';
import Sidebar from '../components/common/Sidebar';
import Pagination from '../components/common/Pagination';
import ImageContainer from '../components/common/Image';
import {results as products} from '../utils/products.json';


const ProductListPage = () => {
	const [filters, setFilters] = useState(new Set());
	useEffect(() => {
		console.log('filters from product list', filters);
	},[filters]);
	return (
		<>
		<Flex direction={"row"}>
			<Card>
				<Sidebar setFilters={setFilters} filters={filters}/>
			</Card>
			<Grid>
				{products.map((product) => 
					((filters.has(product.data.category.id) || filters.size === 0) && (
						<Card key={product.data.name}>
							<ImageContainer width={40} src={product.data.mainimage.url}/>
							<Flex direction={'row'} justifyContent={'space-between'} alignItems={"flex-start"}>
								<p>{product.data.name}</p>
								<p>{product.data.price}</p>
								<p>{product.data.category.slug}</p>
							</Flex>
						</Card>
					)
				))}
			</Grid>	

		</Flex>
		<Pagination count={10} page={1}/>
		</>
	)
}

export default ProductListPage;
