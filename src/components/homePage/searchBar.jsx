import { useContext, useState } from "react";
import SearchIcon from "../../assets/svg/searchIcon";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";




export default function Searchbar() {

    const {isMobile}= useContext(UserContext);

    const [isHovered, setIsHovered]= useState(false);

    return (
            !isMobile ?
            <div onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
                className={`flex items-center font-medium text-[14px] rounded-[4px] overflow-hidden
                ${isHovered ? "bg-[#e6e7e8] animate-opacity" : ""}`}>

                {
                isHovered && 
                    <input type="search" placeholder="What are you looking for?" 
                        className="bg-[#e6e7e8] px-[1rem] py-[10px] animate-search"/>
                }
                <div className="px-[1rem] z-10">
                    <SearchIcon width={"22px"} height={"22px"} color={"#585958"} />
                </div>
            </div>
            :
            <Link to={"/search"}>
                <div className="px-[1rem]">
                    <SearchIcon width={"22px"} height={"22px"} color={"#585958"} />
                </div>
            </Link>

        
    )
}