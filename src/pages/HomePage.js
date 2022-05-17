import { NavLink } from 'react-router-dom';
import ProductCategoriesList from '../components/ProductCategories';
import FeaturedProductsGrid from '../components/FeaturedProducts';
import Flex from '../components/common/StyledFlex';
import Slider from '../components/common/Slider';
import Button from '../components/common/Button';
import { useFetch } from '../utils/hooks/useFetch';

const Homepage = () => {
  const { data: bannersList, isLoading } = useFetch('banner');
  const { data: productCategories, isLoading: loadingProductCategories } = useFetch('category',false,16);  
  const { data: featuredProducts, isLoading: loadingFeaturedProducts } = useFetch('product',true);

  return (
    <>
     <Flex alignItems={"center"} justifyContent={"center"}>
        <Slider images={bannersList} isLoading={isLoading} />
      </Flex>
      <hr/>
      <ProductCategoriesList productCategories={productCategories} isLoading={loadingProductCategories} />
      <hr/>
     
      <FeaturedProductsGrid featuredProducts={featuredProducts} isLoading={loadingFeaturedProducts} />
      <NavLink to="/product-list" activeClassName="hurray">
        <Button text={"View all products"}/>
      </NavLink>
      <hr/>
    </>
  );
}

export default Homepage;
