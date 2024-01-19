import { Link } from "react-router-dom";
import useFetchSingleProduct from "../../customHooks/useFetchSingleProduct";
import { useContext, useEffect, useState } from "react";
import CloseButton from "../../assets/svg/closeButton";
import SizeModal from "../modals/sizeModal";
import { manageWhishlist } from "../../utils/utilities";
import { UserContext } from "../../context/userContext";
import { productUrl } from "../../utils/apiUrl";





export default function ProductCardForWishlist({product}) {

    const {whishlistItems, setWhishlistItems, itemsInCart, token, projectId}= useContext(UserContext);

    const {productId, displayImage, price, productName, ratings}= product;

    const [isModalOpen, setIsModalOpen]= useState(false);

    const [isPresentInCart, setIsPresentInCart]= useState(false);

    const [productDetails, error, isLoading]= useFetchSingleProduct(productUrl.getProduct + `${productId}`);

    function handleEvent(event) {
        event.preventDefault();
        event.stopPropagation();

        manageWhishlist(whishlistItems, setWhishlistItems, product, token, projectId);
    }

    useEffect(() => {
        const found= itemsInCart.find((item) => item.productId === product.productId);

        if(!found) {
            setIsPresentInCart(false);
        } else {
            setIsPresentInCart(true);
        }
    },[])

    return (
        <li key= {productId} className="relative m-[5px] cursor-pointer border border-[#999] rounded-[3px] sm:m-[10px] md:m-[1rem]">
            <Link to={`/product/${productId}`}>
                <div className="relative flex items-center justify-center bg-[#f2f2f2] w-[125px] h-[165px]
                    bg-[#3d3c3c] overflow-hidden
                    md:w-[220px] md:h-[285px]
                    lg:w-[300px] lg:h-[390px]
                    xl:w-[250px] xl:h-[325px]
                    2xl:w-[250px] 2xl:h-[310px]" >
                    
                    <img src={displayImage} alt= "Image Not Available" 
                        className="w-full h-full rounded-t-[2px] duration-500 hover:scale-110" />

                    <div className="absolute top-[7px] right-[7px] rounded-full bg-white z-60
                        opacity-60 cursor-pointer hover:opacity-100"
                        onClick={(e) => handleEvent(e)}>
                        <CloseButton width={"22px"} height={"22px"} color={"#000000"} />
                    </div>
                </div>

                <div className="font-medium text-[12px] text-[#737577] px-[3px] py-[7px]
                    md:py-[10px] md:px-[1rem] 2xl:py-[1rem]
                    md:text-[14px] lg:text-[15px] 2xl:text-[18px]">
                    <p className="font-bold font-grey text-ellipsis overflow-hidden">
                        {
                            productDetails?.productName?.length > 20 ? productDetails?.productName.slice(0,18) + "..." : productDetails?.productName
                        }
                    </p>
                    <p>
                        ₹ {price}
                    </p>
                    
                    <div className="flex items-center">
                        <p className={`font-semibold ${ratings >= 3.5 ? "font-green" : ratings > 2 ? "text-[#fc8a08]" : "font-red"}`}>
                            {ratings?.toFixed(1)}
                        </p>

                        <p>/5.0</p> 
                    </div> 
                </div>
            </Link>

            {
                isPresentInCart ?
                    <Link to={"/cart"}>
                        <div className="flex items-center justify-center w-full font-bold text-[15px] border-t border-[#999] 
                            py-[5px] font-green rounded-b-[2px] duration-500
                            hover:text-white hover:bg-[#117a7a] 
                            lg:py-[10px] 2xl:py-[12px] 2xl:text-[18px]">
                            GO TO CART
                        </div>
                    </Link>
                    
                    :
                    <div className="flex items-center justify-center w-full font-bold text-[15px] border-t border-[#999] 
                        py-[5px] font-green rounded-b-[2px] duration-500
                        hover:text-white hover:bg-[#117a7a] 
                        lg:py-[10px] 2xl:py-[12px] 2xl:text-[18px]"
                        onClick={() => setIsModalOpen(true)}>
                        MOVE TO CART
                    </div>
            }

            

            {
                isModalOpen &&  
                <div className="absolute">
                    <SizeModal item= {productDetails} isOpen= {isModalOpen} onClose= {() => setIsModalOpen(false)} />
                </div>
            }            
        </li>
    )
}


