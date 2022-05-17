import React from 'react';
import Card from '../common/Card';
import ImageContainer from '../common/Image';
import { useHistory } from 'react-router-dom';
import { StyledIconWrapper } from '../common/StyledIconWrapper';
import StyledFlex from '../common/StyledFlex';
const ProductCategoriesList = ({productCategories, isLoading}) => {

  let history = useHistory();

  if(isLoading) {
    return (
      <p>Loading...</p>
    )
  }
  if(productCategories.results && productCategories.results.length === 0) {
    return <p>Empty list</p>
  }
  return (
    <StyledFlex wrap={"wrap"} justifyContent={"space-around"} alignItems={"flex-start"} data-testid="categories-list">
      {productCategories.results && productCategories.results.map((item) => (
        <Card key={item.id}>
          <StyledIconWrapper>
            <ImageContainer width={100} src={item.data.main_image.url} alt={item.data.alt} onClick={() => history.push(`product-list?category=${item.slugs[0]}`)}/>
          </StyledIconWrapper>
          <label>{item.data.name}</label>
        </Card>
      ))}
    </StyledFlex>
  )
}

export default ProductCategoriesList;
