import { useState } from "react"
import ChevronUp from "../../assets/svg/chevronUp";
import ChevronDown from "../../assets/svg/chevronDown";
import RenderModal from "./renderModal";




export default function RenderNavbarTag(props) {

    const category= props.category;
    const list= props.list;
    const effect= props.effect;

    const handleState= props.handleState;

    const [isHovered, setIsHovered]= useState(false);

    return (
        <div className={`${effect} relative group flex justify-between items-center cursor-pointer`}
            onClick={() => setIsHovered((old) => !old)}>
            <p className="group-hover:text-[#e11b23]">{category}</p>

            {
                <div className="ml-[8px]">
                    {
                        isHovered ? 
                            <ChevronUp width={"15px"} height={"15px"} effect={"group-hover:fill-[#e11b23]"} color={"#585958"} />
                        :
                            <ChevronDown width={"15px"} height={"15px"} effect={"group-hover:fill-[#e11b23]"} color={"#585958"} />

                    }
                </div>
            }
            
            {
                isHovered && <RenderModal list={list} handleState= {handleState} />
            }
        </div>
    )
}