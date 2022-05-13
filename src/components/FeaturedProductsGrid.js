import { useFetch } from "../utils/hooks/useFetch";
import Card from "./common/Card";
import Flex from "./common/StyledFlex";
import ImageContainer from "./common/Image";

const FeaturedProductGrid = () => {
    const { data, isLoading } = useFetch('product',true);

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
          <Card width={"15"} key={item.id}>
            <Flex direction={"column"} alignItems={"center"}>
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
			</>
		)
}

export default FeaturedProductGrid;