import RenderProductsInCategory from "../clothCategoryForMen/productsInCategoryForMen";
import { productUrl } from "../../utils/apiUrl";





export default function JoggersForWomen() {

    return (
        <RenderProductsInCategory 
            subCategory= {["jogger"]} 
            heading={"Womens' Joggers'"} 
            url={productUrl.filterProduct}
            gender={"Women"}/>

    )
}