import RenderProductsInCategory from "../clothCategoryForMen/productsInCategoryForMen";
import { productUrl } from "../../utils/apiUrl";





export default function JumpsuitForWomen() {

    return (
        <RenderProductsInCategory 
            subCategory= {["jumpsuit"]} 
            heading={"Womens' Jumpsuits'"} 
            url={productUrl.filterProduct}
            gender={"Women"}/>

    )
}