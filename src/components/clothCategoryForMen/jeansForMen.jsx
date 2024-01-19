import RenderProductsInCategory from "./productsInCategoryForMen";
import { productUrl } from "../../utils/apiUrl";








export default function JeansForMen() {


    return (
        <RenderProductsInCategory 
            subCategory= {["jeans"]} 
            heading={"Men's Jeans"} 
            url={productUrl.filterProduct}
            gender={"Men"}/>

    )
}