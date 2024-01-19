import RenderProductsInCategory from "./productsInCategoryForMen";
import { productUrl } from "../../utils/apiUrl";






export default function TrackPantsForMen() {

    return (
        <RenderProductsInCategory 
            subCategory= {["tracksuit"]} 
            heading={"Men's Track Suits'"} 
            url={productUrl.filterProduct}
            gender={"Men"}/>

    )
}