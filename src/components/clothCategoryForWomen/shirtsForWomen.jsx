import RenderProductsInCategory from "../clothCategoryForMen/productsInCategoryForMen";
import { productUrl } from "../../utils/apiUrl";





export default function ShirtsForWomen() {

    return (
        <RenderProductsInCategory 
            subCategory= {["shirt"]} 
            heading={"Womens' Shirts'"} 
            url={productUrl.filterProduct}
            gender={"Women"}/>

    )
}