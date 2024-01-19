import { useContext, useState } from "react";
import ChevronLeft from "../../assets/svg/chevronLeft";
import ChevronRight from "../../assets/svg/chevronRight";
import useInterval from "../../customHooks/useInterval";
import { UserContext } from "../../context/userContext";







export default function Carousel({list, effect}) {

    const {isMobile}= useContext(UserContext);
    
    const [idx, setIdx]= useState(0);

    const n= list?.length;

    useInterval(() => {
        setIdx((old) => (old === n-1 ? 0 : old+1));
    }, 4000)

    function previous() {
        if(idx == 0) {
            setIdx(old => old= n-1);
        } else {
            setIdx(old => old - 1);
        }
    }

    function next() {
        if(idx === n-1) {
            setIdx(old => old= 0);
        } else {
            setIdx(old => old + 1);
        }   
    }

    return (
        (n !== 0 && n !== undefined) ? <div className="w-full xl:max-w-[1500px] flex flex-col items-center">
                <div className={`relative w-full bg-[#f9f9f9] ${effect}`}>

                    <img src= {list[idx]} alt="Slider Image" className="w-full h-full" />

                    {
                        !isMobile && 
                            <>
                                <div className="absolute top-[45%] left-[1rem] py-[10px] pl-[9px] pr-[10px] 
                                    rounded-full bg-black opacity-50 cursor-pointer sm:left-[2rem]" 
                                    onClick={() => previous()}>
                                    <ChevronLeft width={"20px"} height={"20px"} color={"#ffffff"} effect={"md:w-[35px] md:h-[35px]"} />
                                </div>

                                <div className="absolute top-[45%] right-[1rem] py-[10px] pl-[9px] pr-[10px] 
                                    rounded-full bg-black opacity-50 cursor-pointer sm:right-[2rem]" 
                                    onClick={() => next()}>
                                    <ChevronRight width={"20px"} height={"20px"} color={"#ffffff"} effect={"md:w-[35px] md:h-[35px]"} />
                                </div>
                            </>
                    }
                </div>

                <div className="flex items-center justify-center gap-[10px] mt-[1.5rem]">
                    {
                        list.map((item, index) => {
                            return (
                                <div key={item} className={`p-[5px] cursor-pointer rounded-full 
                                    hover:bg-[#999]
                                    xl:p-[8px]
                                    ${index === idx ? "bg-[#e11b23]" : "bg-[#f9f9f9]"}`}
                                    onClick={() => setIdx(index)}></div>
                            )
                        })
                    }
                </div>
            </div>
            :
            <div className={`w-full xl:max-w-[1500px] flex flex-col justify-center items-center
                bg-[#f9f9f9] ${effect}`}></div>
    )
}