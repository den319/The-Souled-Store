import RenderProductsInCategory from "./productsInCategoryForMen";
import { productUrl } from "../../utils/apiUrl";






export default function JoggersForMen() {

    return (
        <RenderProductsInCategory 
            subCategory= {["jogger"]} 
            heading={"Men's Joggers'"} 
            url={productUrl.filterProduct}
            gender={"Men"}/>

    )
}