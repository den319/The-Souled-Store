import { Link } from "react-router-dom";
import ArrowLeft from "../../assets/svg/arrowLeft";
import Logo from "../../assets/svg/logo";
import Empty_heart from "../../assets/svg/emptyHeart";
import CartIcon from "../../assets/svg/cartIcon";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Searchbar from "../homePage/searchBar";






export default function NavbarForProfile() {

    const {whishlistItems, itemsInCart}= useContext(UserContext);

    return (
        <div className="flex items-center justify-between px-[10px] border-b-[2px] border-[#117a7a] py-[5px] mb-[10px]">

            <Link to={"/profile"}>
                <div className="p-[5px] group rounded-full hover:bg-[#e11b23] duration-500">
                    <ArrowLeft width={"20px"} height={"20px"} color={"#000000"} effect={"group-hover:fill-white"} />
                </div>
            </Link>
            
            <Link to={"/"}>
                <div className="ml-[2rem]">
                    <Logo color={"#e11b23"} />
                </div>
            </Link>
            

            <div className="flex items-center text-[11px]">

                <Searchbar />
                
                <Link to={"/wishlist"}>
                    <div className="relative px-[8px] lg:px-[1rem] py-[16px] border-b-[5px] border-white 
                        hover:border-b-[5px] hover:border-[#e11b23] hover:bg-[#fbfbfb]">
                        <Empty_heart width={"22px"} height={"22px"} color={"#585958"} />

                        {
                            whishlistItems.length > 0 &&
                            <div className="absolute top-[15px] right-[5px] text-white bc-red rounded-full font-bold px-[5px]">
                                {whishlistItems.length}
                                
                            </div>
                        }
                    </div>
                </Link>
                
                
                <Link to={"/cart"}>
                    <div className="relative px-[8px] lg:px-[1rem] py-[19px] border-b-[5px] border-white 
                        hover:border-b-[5px] hover:border-[#e11b23] hover:bg-[#fbfbfb]">
                        <CartIcon width={"22px"} height={"22px"} color={"#585958"} />
                        {
                            itemsInCart.length > 0 &&
                            <div className="absolute top-[15px] right-[5px] text-white bc-red rounded-full font-bold px-[5px]">
                                {itemsInCart.length}
                                
                            </div>
                        }
                    </div>
                </Link>
            </div>
        </div>
    )
}