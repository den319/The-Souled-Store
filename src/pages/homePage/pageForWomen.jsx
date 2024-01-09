import { useContext } from "react";
import Apparel from "../../components/homePage/apparel";
import Categories from "../../components/homePage/categories";
import OfficialMerchandise from "../../components/homePage/officialMerchandise";
import { TagContext } from "../../context/tagContext";
import { ImageContext } from "../../context/imageContext";
import { ModalContext } from "../../context/modalContext";
import ProductList from "../../components/homePage/productList";
import Carousel from "../../components/carousel/carousel";





export default function PageForWomen() {
    const {productUrl, isMobile}= useContext(ModalContext);
    const {bigCorousalForWomen, categories, merchandise}= useContext(ImageContext);
    const trendingUrl= productUrl.filterProduct + `{"sellerTag":"trending", "gender":"Women"}&page=1&limit=20`;
    const bestSellerUrl= productUrl.filterProduct + `{"sellerTag":"best seller", "gender":"Women"}&page=1&limit=20`;
    const newArrivalUrl= productUrl.filterProduct + `{"sellerTag":"new arrival", "gender":"Women"}&page=1&limit=20`;
    const topRatedUrl= productUrl.filterProduct + `{"sellerTag":"top rated", "gender":"Women"}&page=1&limit=20`;

    return (
        <div className="relative w-full flex flex-col items-center justify-between font-grey font-bold text-[14px]">

            <div className="w-full xl:max-w-[1500px] flex flex-col justify-center items-center">

                <Carousel 
                    list={isMobile ? bigCorousalForWomen.smallSize : bigCorousalForWomen.largeSize} 
                    effect={"h-[16rem] min-[425px]:h-[20rem] sm:h-[30rem] lg:h-[350px] xl:h-[490px] 2xl:h-[510px]"}/>
                    
                <ProductList url= {trendingUrl} heading= {"TRENDING"} />
                <ProductList url= {newArrivalUrl} heading= {"NEW ARRIVAL"} />
                <ProductList url= {topRatedUrl} heading= {"TOP RATED"} />

                <Categories list={categories[0].women} />

                <ProductList url={bestSellerUrl} heading={"TOP SELLING"} />
                <OfficialMerchandise list={merchandise} />
            </div>

            
        </div>
    )
}