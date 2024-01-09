import { useContext } from "react"
import { UserContext } from "../../context/userContext"
import { Link } from "react-router-dom";
import ProductCardForWishlist from "../../components/wishlist/productCardForWishlist";






export default function Wishlist() {

    const {whishlistItems, isAuthenticated}= useContext(UserContext);

    

    return (
        <div className="w-full h-full flex items-center justify-center">
            {
                whishlistItems?.length === 0 ?
                // empty whishlist
                <div className="flex flex-col items-center justify-center my-[50px] mx-[1rem]">
                    <div className="w-[190px] h-[190px] lg:w-[290px] lg:h-[290px]">
                        <img src="https://www.thesouledstore.com/static/img/wishList-empty-icon.fd2a993.png" alt="whishlist-image" />
                    </div>

                    <div className="flex flex-col items-center justify-center my-[2rem]">
                        <p className="text-[16px] font-bold lg:text-[20px]">
                           Your wishlist is lonely and looking for love. 
                        </p>
                        
                        <p className="text-[14px] font-grey mt-[1rem] lg:text-[16px]">
                            Add products to your wishlist, review them anytime and easily move to cart.
                        </p>
                    </div>

                    <div className="flex justify-center items-center text-[14px] font-bold">
                        <Link to={"/men"}>
                            <div 
                                className="border border-[#117a7a] rounded-[5px] font-green px-[10px] py-[10px] 
                                hover:bg-[#117a7a] hover:text-white duration-500">
                                CONTINUE SHOPPING
                            </div>
                        </Link>
                        
                        {
                            !isAuthenticated &&
                            <Link to={"/authentication"}>
                                <div className="bg-[#117a7a] text-white px-[2rem] py-[10px] rounded-[5px] ml-[1rem]
                                    hover:border hover:border-[#117a7a] hover:bg-white hover:text-[#117a7a]">
                                    LOGIN
                                </div>
                            </Link>
                            
                        }
                    </div>
                </div>

                :
                
                // non-empty whishlist
                <div className="w-full flex flex-col justify-center items-center h-full px-[5px] pb-[1rem]
                    sm:px-[1rem] md:px-[2px] xl:max-w-[1500px]">
                    <div className="w-full py-[1rem] text-[18px] font-grey flex justify-center md:justify-start md:px-[1rem] 2xl:text-[25px] 2xl:py-[2rem]">
                        <p className="font-bold">My Wishlist</p>
                        <p className="font-semibold ml-[5px]">({whishlistItems?.length} items)</p>
                    </div>

                    <div className="flex items-center justify-center">
                        <ul className="flex flex-row flex-grow items-center flex-wrap">
                            {
                                whishlistItems.map(item => {

                                    return (
                                        <ProductCardForWishlist key={item?.productId} product= {item} />
                                    )
                                })
                            }
                        </ul>
                    </div>
                    
                </div>       
            }
        </div>
    )
}
