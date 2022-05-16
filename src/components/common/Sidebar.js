import React from 'react';
import styled from 'styled-components';
import Button from './Button';


const Wrapper = styled.div`
	max-width: 500px;
`;

const ListWrapper = styled.ul`
	margin: 0px;
	padding: 0px;
	list-style-type: none;
	width: 90%;
`;
const ListItem = styled.li`
	list-style-type: none;
	margin: 0px;
	padding: 10px;
	width: 90%;
	cursor: pointer;
	&:hover {
		background-color: #B8B8B8;
	}
	${props => props.active && 'background-color: #1111;'}
`;

const Sidebar = (props) => {
	const { categories, filters, setFilters } = props;
	const handleFilter = (category) => {
		if(!filters.has(category.slugs[0])) {
			setFilters(prev => new Set([...prev, category.slugs[0]]))
		} else {
			setFilters((prev => new Set([...prev].filter(x => x !== category.slugs[0]))))
		}
	}
	return (
		<Wrapper>
			<h1>Categories</h1>
			{<Button onClick={() => setFilters(new Set([]))} text={"Clear filters"} disabled={filters.size === 0}/>}

			<ListWrapper>
				{categories.results && categories.results.map((category) => 
				<ListItem  active={filters.has(category.slugs[0])} onClick={() => handleFilter(category)} key={category.id}>{category.data.name}</ListItem> )}
			</ListWrapper>
		</Wrapper>
	)
};

export default Sidebar;
