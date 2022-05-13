import { NavLink } from 'react-router-dom';
import ProductCategoriesList from '../components/ProductCategoriesList';
import FeaturedProductGrid from '../components/FeaturedProductsGrid';
import Flex from '../components/common/StyledFlex';
import Slider from '../components/common/Slider';
import Button from '../components/common/Button';
import { useFetch } from '../utils/hooks/useFetch';

const Homepage = () => {
  const  { data: bannersList, isLoading } = useFetch('banner');

  return (
    <>
     <Flex alignItems={"center"} justifyContent={"center"}>
        <Slider images={bannersList} isLoading={isLoading} />
      </Flex>
      <hr/>
      <Flex wrap={"wrap"} justifyContent={"space-around"} alignItems={"flex-start"}>
        <ProductCategoriesList />
      </Flex>
      <hr/>
      <Flex wrap={"wrap"} justifyContent={"space-around"} alignItems={"flex-start"}>
        <FeaturedProductGrid />
      </Flex>
      <NavLink to="/product-list" activeClassName="hurray">
        <Button text={"View all products"}/>
      </NavLink>
      <hr/>
    </>
  );
}

export default Homepage;
