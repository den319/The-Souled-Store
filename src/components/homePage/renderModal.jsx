import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";





export default function RenderModal(props) {

    const list= props.list;
    const handleState= props.handleState;
    
    const {isMobile}= useContext(UserContext);

    let i=0;
    return (
        <ul className={`absolute top-[65px] left-0 font-semibold text-[15px] z-20 bg-white 
            ${isMobile ? "w-full" : "min-w-[10rem]"} 
            shadow-[0px_0px_20px_-5px_rgba(0,0,0,0.5)]`}>
            <div className="p-[10px] bg-white">
                {
                    list.map((item) => {
                        const {tag, routeName, isNewCollection}= item;
                        return (
                            <li key={i++} className="py-[3px] px-[10px] font-grey rounded-[5px]
                                hover:text-[#e11b23] hover:bg-[#f2f2f2]"
                                onClick={() => handleState(false)}>
                                <Link to={routeName}>
                                    <div className="flex">
                                        <p>{tag}</p>
                                        {
                                            isNewCollection && 
                                            <p className="text-red-500 text-[11px] ml-[5px]">New</p>
                                        }
                                    </div>
                                </Link>
                            </li>
                        )
                    })
                }
            </div>
        </ul>
    )
}

