import RenderProductsInCategory from "./productsInCategoryForMen";
import { productUrl } from "../../utils/apiUrl";







export default function HoodiesForMen() {

    return (
        <RenderProductsInCategory 
            subCategory= {["hoodie"]} 
            heading={"Men's Hoodies"} 
            url={productUrl.filterProduct}
            gender={"Men"}/>

    )
}