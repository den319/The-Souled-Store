import RenderProductsInCategory from "../clothCategoryForMen/productsInCategoryForMen";
import { productUrl } from "../../utils/apiUrl";





export default function TshirtsForWomen() {

    return (
        <RenderProductsInCategory 
            subCategory= {["tshirt"]} 
            heading={"Womens' T-Shirts"} 
            url={productUrl.filterProduct}
            gender={"Women"}/>

    )
}