import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";





export default function RenderProducts({list, isLoading}) {

    const {isMobile}= useContext(UserContext);

    const arr= new Array(19).fill("");

    return (
        <div>
                <div>
                    {
                        (list.length > 0)?
                            <ul className="flex flex-wrap items-center justify-center gap-[1rem]">
                                {
                                    list.map((product) => {
                                        const {productName, image, price, subCategory, productId}= product;

                                        return (
                                            <li key= {productId} className="cursor-pointer border border-[#f2f2f2] rounded-[5px] hover:bg-[#f2f2f2]">
                                                <Link to={`/product/${productId}`}>
                                                    <div className="relative flex items-center justify-center bg-[#f2f2f2] 
                                                        w-[120px] h-[150px]
                                                        bg-[#3d3c3c] overflow-hidden
                                                        sm:w-[180px] sm:h-[220px]
                                                        md:w-[230px] md:h-[290px]
                                                        lg:w-[340px] lg:h-[420px]" >
                                                        <img src={image} alt= "Image Not Available" 
                                                            className="w-full h-full duration-500 hover:scale-110" />
                                                    </div>

                                                    <div className="p-[10px] font-medium text-[12px] text-[#737577] mt-[10px] 
                                                        md:text-[14px] lg:text-[15px]">
                                                            
                                                            <p className="font-bold font-grey text-ellipsis overflow-hidden">
                                                                {
                                                                    isMobile ? (productName?.length > 15 ? productName?.slice(0,15) + "..." : productName)
                                                                    :
                                                                    productName.slice(0, 25) + "..."
                                                                }
                                                            </p>
                                                        <p>
                                                            {subCategory}
                                                        </p>
                                                        <p className="font-bold">
                                                            ₹ {price}
                                                        </p>
                                                    </div>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            :
                            <ul className="flex flex-wrap items-center justify-center gap-[1rem] animate-pulse">
                                {
                                    arr.map((_, index) => {
                                        return (
                                            <li key= {index} className="border border-[#f2f2f2] rounded-[5px]">
                                                <div className="relative flex items-center justify-center bg-gray-200 bg-gray-300
                                                    w-[120px] h-[150px]
                                                    sm:w-[180px] sm:h-[220px]
                                                    md:w-[230px] md:h-[290px]
                                                    lg:w-[340px] lg:h-[420px]" >
                                                </div>

                                                <div className="p-[10px] mt-[10px]">
                                                        
                                                    <p className="w-full h-[1rem bg-gray-200 bg-gray-300]">
                                                    </p>
                                                        
                                                    
                                                    <p className="mt-[10px] w-full h-[1rem bg-gray-200 bg-gray-300]"></p>
                                                    <p className="mt-[10px] w-full h-[1rem bg-gray-200 bg-gray-300]"></p>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                    }
                    
                </div>
        </div>
    )
}