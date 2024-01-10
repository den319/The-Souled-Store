import { useContext } from "react"
import { UserContext } from "../../context/userContext"
import { Link } from "react-router-dom";
import ProductCardForCart from "../../components/cart/productCardForCart";
import OrderSectionForCart from "../../components/cart/orderSectionForCart/orderSectionForCart";
import Empty_heart from "../../assets/svg/emptyHeart";
import ChevronRight from "../../assets/svg/chevronRight";






export default function Cart() {
    const {itemsInCart, setTotalPrice, isAuthenticated, user}= useContext(UserContext);

    return(
        <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center w-full font-bold text-[10px] 
                border-b border-[#eee] px-[5px] py-[1rem] 
                md:text-[14px] lg:px-[1rem]">
                <div className="font-green pointer-events-none">
                    <p className="px-[5px]">MY BAG</p>
                </div>

                <div className="flex items-center">
                    <p className="px-[5px]">- - - - - - - - - -</p>
                    <div className="pointer-events-none">
                        <p className="px-[5px]">ADDRESS</p>
                    </div>
                </div>
                
                <div className="flex items-center">
                    <p className="px-[5px]">- - - - - - - - - -</p>
                    <div className="pointer-events-none">
                        <p className="px-[5px]">PAYMENT</p>
                    </div>
                </div>
            </div>
            {
                itemsInCart.length === 0 ? 
                <div className="flex flex-col items-center justify-center my-[50px] mx-[1rem]">
                    <div className="w-[90px] h-[80px] lg:w-[120px] lg:h-[100px]">
                        <img src="https://tss-static-images.gumlet.io/emptyCart.png" alt="empty-cart" />
                    </div>

                    <div className="flex flex-col justify-center items-center mt-[3rem] mb-[2rem]">
                        <p className="text-[16px] font-bold lg:text-[20px]">Your shopping cart is empty. </p>

                        <p className="text-[14px] mt-[1rem] font-grey lg:text-[16px]">Please add something soon, carts have feelings too.</p>
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

                <div className="w-full xl:max-w-[1500px] flex flex-col justify-center items-center">
                    <div className="px-[5px] my-[1rem] flex flex-col md:flex-row">

                        {/* cart items */}
                        <div className="mb-[1rem] w-full lg:w-[500px] xl:w-[700px]">
                            {
                                itemsInCart.map((item, index) => {
                                    return (
                                        <ProductCardForCart key={index} product= {item} />
                                    )
                                })
                            }

                           <div className="mt-[1rem]">
                                <Link to={"/wishlist"}>
                                    <div className="flex justify-between items-center cursor-pointer border-[2px] border-[#f2f2f2]
                                        font-grey p-[1rem] text-[14px] font-bold duration-500
                                        group hover:bg-[#117a7a]">
                                        <div className="flex items-center">
                                            <div className="mt-[-3px] flex items-center">
                                                <Empty_heart width= {"20px"} height={"20px"} color= {"#58595b"}
                                                    effect={"group-hover:fill-white"} />
                                            </div>

                                            <p className="ml-[8px] group-hover:text-white">ADD FROM WISHLIST</p>
                                        </div>

                                        <div>
                                            <ChevronRight width= {"17px"} height={"17px"} color={"#58595b"} 
                                                effect={"group-hover:fill-white"}/>
                                        </div>
                                    </div>
                                </Link>
                           </div>
                            
                            
                        </div>
                        
                        {/* oreder section */}    
                        <OrderSectionForCart/>
                        
                    </div>
                </div>
            }
        </div>
    )
}
