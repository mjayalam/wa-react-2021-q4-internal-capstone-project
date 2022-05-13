import { useParams } from "react-router-dom";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../components/common/Card";
import StyledFlex from "../components/common/StyledFlex";
import ItemCounter from "../components/common/ItemCounter";
import { useProduct } from "../utils/hooks/useProduct";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
const ProductDetailPage = () => {
    let { id } = useParams();
    const { data: productInfo, isLoading } = useProduct(id);
    const [itemCount, setItemCount] = useState(0);

    const onChangeInput =  (e) => {
        setItemCount(e.target.value)
    }
    if(isLoading) {
        return <p>Loading product information...</p>
    }
    if(productInfo.results && productInfo.results.length === 0) {
        return <p>There is no data for this product</p>
    }
    return (
        <>  
            {productInfo.results && (
                <>
                    <Swiper navigation pagination loop={true} slidesPerView={3}>
                        {productInfo.results[0].data.images.map(image => (
                            <SwiperSlide key={image.image.url}>
                                <img 
                                    style={{height: "400px", width: "500px", objectFit: "cover"}} 
                                    alt={image.image.url} src={image.image.url}
                                />
                            </SwiperSlide>
                            ))}
                    </Swiper>
                    <hr/>
                    <Card>
                        <StyledFlex direction={"row"} justifyContent={"space-between"}>
                            <p><strong>Name:</strong> {productInfo.results[0].data.name}</p>
                            <p><strong>Category:</strong> {productInfo.results[0].data.category.slug}</p>
                            <p><strong>Price:</strong> ${productInfo.results[0].data.price}</p>
                            <p><strong>Sku:</strong> {productInfo.results[0].data.sku}</p>
                            <ItemCounter value={itemCount} add={() => {}} onChange={onChangeInput}/>
                        </StyledFlex>
                        <p>{productInfo.results[0].data.description[0].text}</p>
                        <StyledFlex direction={"row"} justifyContent={"space-between"}>
                            <div>
                                <h3>Tags</h3>
                                <ul>
                                    {productInfo.results[0].tags.map((tag,index) => <li key={index}>{tag}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h3>Product specs</h3>
                                <ul>
                                    {productInfo.results[0].data.specs.map((spec,index) => <li key={index}>{`${spec.spec_name}: ${spec.spec_value} `}</li>)}
                                </ul>
                            </div>
                        </StyledFlex>
                    </Card>
                </>
            )}
           
        </>
        
    );
};

export default ProductDetailPage;