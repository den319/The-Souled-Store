import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowLeft from "../../assets/svg/arrowLeft";
import SearchIcon from "../../assets/svg/searchIcon";






export default function SearchSection() {

    const navigate= useNavigate();


    return (
        <div className="w-full min-h-[20rem]">
            <div className="flex items-center justify-between py-[10px] px-[7px]
                shadow-[0_2px_3px_rgba(0,0,0,0.2)]">
                <div className="p-[5px] group rounded-full hover:bg-[#e11b23] duration-500"
                    onClick={() => navigate(-1)}>
                    <ArrowLeft width={"20px"} height={"20px"} color={"#000000"} effect={"group-hover:fill-white"} />
                </div>

                <div className="flex items-center w-full">
                    <input type="text" placeholder="Enter Product Name" 
                        className="bg-[#f2f2f2] text-black px-[10px] py-[5px] rounded-[4px] 
                            w-full mx-[14px] text-[15px] font-semibold
                            placeholder:text-[#999]" />

                    <div className="mr-[5px] cursor-pointer">
                        <SearchIcon />
                    </div>
                </div>
            </div>

            <div className="min-h-[15rem] font-bold text-[#999] text-[25px] flex items-center justify-center">
                No Product Found
            </div>
        </div>    
    )
}