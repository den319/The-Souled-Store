import RenderProductsInCategory from "../clothCategoryForMen/productsInCategoryForMen";
import { productUrl } from "../../utils/apiUrl";





export default function JeansForWomen() {

    return (
        <RenderProductsInCategory 
            subCategory= {["jeans"]} 
            heading={"Womens' Jeans'"} 
            url={productUrl.filterProduct}
            gender={"Women"}/>

    )
}