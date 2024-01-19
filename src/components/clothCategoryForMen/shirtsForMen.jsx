import RenderProductsInCategory from "./productsInCategoryForMen";
import { productUrl } from "../../utils/apiUrl";






export default function ShirtsForMen() {


    return (
        <RenderProductsInCategory 
            subCategory= {["shirt"]} 
            heading={"Men Shirts"} 
            url={productUrl.filterProduct}
            gender={"Men"}/>

    )
}