import React from "react";
import Card from "../common/Card";
import StyledFlex from "../common/StyledFlex";
import ImageContainer from "../common/Image";

const FeaturedProductsGrid = ({featuredProducts, isLoading}) => {
  if(isLoading) {
    return (
      <p>Loading...</p>
    )
  }
  if(featuredProducts.results && featuredProducts.results.length === 0) {
    return <p>Empty list</p>
  }
  return (
    <StyledFlex wrap={"wrap"} justifyContent={"space-around"} alignItems={"flex-start"} data-testid="featured-products">
      {featuredProducts.results && featuredProducts.results.map((item) => (
        <Card width={"15"} key={item.id}>
          <StyledFlex direction={"column"} alignItems={"center"}>
            <ImageContainer width={25} src={item.data.mainimage.url} alt={item.data.alt} />
            <div>
              <StyledFlex direction={"column"} justifyContent={"space-around"}>
                <p>Product name: {item.data.name} </p>
                <p>Price: ${item.data.price} </p>
                <p>Category:{item.data.category.slug} </p>
              </StyledFlex>
            </div>
          
          </StyledFlex>
          
        </Card>
      ))}
    </StyledFlex>
   
  )
}

export default FeaturedProductsGrid;
