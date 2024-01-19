import RenderProductsInCategory from "./productsInCategoryForMen";
import { productUrl } from "../../utils/apiUrl";








export default function ShortsForMen() {

    return (
        <RenderProductsInCategory 
            subCategory= {["shorts"]} 
            heading={"Men's Shorts'"} 
            url={productUrl.filterProduct}
            gender={"Men"}/>

    )
}