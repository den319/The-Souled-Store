import RenderProductsInCategory from "./productsInCategoryForMen";
import { productUrl } from "../../utils/apiUrl";






export default function TshirtsForMen() {

    return (
        <RenderProductsInCategory 
            subCategory= {["tshirt"]} 
            heading={"Men T-Shirts"} 
            url={productUrl.filterProduct}
            gender={"Men"}/>

    )
}