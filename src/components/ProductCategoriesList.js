import React from 'react';
import Card from './common/Card';
import ImageContainer from './common/Image';
import { useHistory } from 'react-router-dom';
import { useFetch } from '../utils/hooks/useFetch';
import { StyledIconWrapper } from './common/StyledIconWrapper';
const ProductCategoriesList = () => {
    const { data, isLoading } = useFetch('category',false,16);  
    let history = useHistory();

    if(isLoading) {
      return (
        <p>Loading...</p>
      )
    }
    if(data.results && data.results.length === 0) {
      return <p>Empty list</p>
    }
    return (
      <>
        {data.results && data.results.map((item) => (
          <Card key={item.id}>
            <StyledIconWrapper>
              <ImageContainer width={100} src={item.data.main_image.url} alt={item.data.alt} onClick={() => history.push(`product-list?category=${item.slugs[0]}`)}/>
            </StyledIconWrapper>
            <label>{item.data.name}</label>
          </Card>
        ))}
      </>
    )
}

export default ProductCategoriesList;
