import Categories from "../../components/homePage/categories";
import OfficialMerchandise from "../../components/homePage/officialMerchandise";
import Apparel from "../../components/homePage/apparel";
import { apparelForKids } from "../../utils/tags";
import { categories, merchandise } from "../../utils/imageLinks";


export default function PageForKids() {

    return (
        <div className="relative w-full flex flex-col items-center justify-between font-grey font-bold text-[14px]">
            <Apparel list={apparelForKids} />

            <div className="max-w-[1500px] flex flex-col justify-center items-center">
                <Categories list={categories[0].kids} />
                <OfficialMerchandise list={merchandise} />
            </div>

        </div>
    )
}