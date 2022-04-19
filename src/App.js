import { useEffect, useState } from 'react';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Flex from './components/common/Flex';
import Slider from './components/common/Slider';
import ImageContainer from './components/common/Image';
import Card from './components/common/Card';
import { results as productCategoriesResults } from './utils/product-categories.json';
import { results as featuredBannersResults } from './utils/featured-banners.json';
import { results as featuredProductsResults } from './utils/featured-products.json';

function App() {
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
      <Header/>
      <Flex>
        <Slider items={featuredBanners} />
      </Flex>
      <hr/>
      <Flex wrap={"wrap"} justifyContent={"space-around"} alignItems={"flex-start"}>
        {productsCategories.map((item) => (
          <Card>
            <ImageContainer width={100} key={item.id} src={item.data.main_image.url} alt={item.data.alt}/>
          </Card>
        ))}
      </Flex>
      <hr/>
      <Flex wrap={"wrap"} justifyContent={"space-around"} alignItems={"flex-start"}>
        {featuredProducts.map((item) => (
          <Card>
            <Flex direction={"column"} alignItems={"centerolv"}>
              <ImageContainer width={35} key={item.id} src={item.data.mainimage.url} alt={item.data.alt}/>
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
      <hr/>
      <Footer/>
    </>
  );
}

export default App;
