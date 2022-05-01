import { useEffect, useState } from 'react';
import Flex from '../components/common/Flex';
import Slider from '../components/common/Slider';
import ImageContainer from '../components/common/Image';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { results as productCategoriesResults } from '../utils/product-categories.json';
import { results as featuredBannersResults } from '../utils/featured-banners.json';
import { results as featuredProductsResults } from '../utils/featured-products.json';

const Homepage = ({setAtHomePage}) => {
  const [productsCategories, setProductsCategories] = useState([]);
  const [featuredBanners, setFeaturedBanners] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  
  useEffect(() => {
    setProductsCategories(productCategoriesResults);
    setFeaturedBanners(featuredBannersResults);
    setFeaturedProducts(featuredProductsResults);
  },[])
  return (
    <>
     <Flex alignItems={"center"} justifyContent={"center"}>
        <Slider items={featuredBanners} />
      </Flex>
      <hr/>
      <Flex wrap={"wrap"} justifyContent={"space-around"} alignItems={"flex-start"}>
        {productsCategories.map((item) => (
          <Card key={item.id}>
            <ImageContainer width={100} src={item.data.main_image.url} alt={item.data.alt}/>
          </Card>
        ))}
      </Flex>
      <hr/>
      <Flex wrap={"wrap"} justifyContent={"space-around"} alignItems={"flex-start"}>
        {featuredProducts.map((item) => (
          <Card width={"15"} key={item.id}>
            <Flex direction={"column"} alignItems={"centerolv"}>
              <ImageContainer width={25} src={item.data.mainimage.url} alt={item.data.alt}/>
              <div>
                <Flex direction={"row"} justifyContent={"space-around"}>
                  <p>Product name: {item.data.name}</p>
                  <p>Price: ${item.data.price}</p>
                  <p>Category:{item.data.category.slug}</p>
                </Flex>
              </div>
           
            </Flex>
           
          </Card>
        ))}
      </Flex>
      <Button text="View all products" onClick={() => setAtHomePage(false)}/>
      <hr/>
    </>
  );
}

export default Homepage;
