import { useContext } from "react";
import Categories from "../../components/homePage/categories";
import OfficialMerchandise from "../../components/homePage/officialMerchandise";
import ProductList from "../../components/homePage/productList";
import Carousel from "../../components/carousel/carousel";
import { bigCorousalForMen, categories, merchandise } from "../../utils/imageLinks";
import { UserContext } from "../../context/userContext";
import { productUrl } from "../../utils/apiUrl";





export default function PageForMen() {

    const {isMobile}= useContext(UserContext);
    const trendingUrl= productUrl.filterProduct + `{"sellerTag":"trending", "gender":"Men"}&page=1&limit=20`;
    const bestSellerUrl= productUrl.filterProduct + `{"sellerTag":"best seller", "gender":"Men"}&page=1&limit=20`;
    const newArrivalUrl= productUrl.filterProduct + `{"sellerTag":"new arrival", "gender":"Men"}&page=1&limit=20`;
    const topRatedUrl= productUrl.filterProduct + `{"sellerTag":"top rated", "gender":"Men"}&page=1&limit=20`;

    return (
        <div className="relative w-full flex flex-col items-center justify-between font-grey font-bold text-[14px]">

            <Carousel 
                list={isMobile ? bigCorousalForMen.smallSize : bigCorousalForMen.largeSize}
                effect={"h-[16rem] min-[425px]:h-[20rem] sm:h-[30rem] lg:h-[350px] xl:h-[490px] 2xl:h-[510px]"} />

            <div className="w-full xl:max-w-[1500px] flex flex-col justify-center items-center">
                <ProductList url= {trendingUrl} heading= {"TRENDING"} />
                <ProductList url= {newArrivalUrl} heading= {"NEW ARRIVAL"} />
                <ProductList url= {topRatedUrl} heading= {"TOP RATED"} />

                <Categories list={categories[0].men} />

                <ProductList url={bestSellerUrl} heading={"TOP SELLING"} />
                <OfficialMerchandise list={merchandise} />
            </div>

           
        </div>
    )
}