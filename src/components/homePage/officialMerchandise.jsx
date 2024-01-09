import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";





export default function OfficialMerchandise({list}) {

    const autoSlideRef= useRef(0);

    function slideRight() {
        const container= autoSlideRef.current;

        if(container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
            container.scrollTo({left: 0, behavior: "auto"})
        } else {
            container.scrollBy({left: 200, behavior:"smooth"})
        }
    }

    useEffect(() => {
        const interval= setInterval(() => slideRight(), 1000);

        return () => clearInterval(interval);
    }, [autoSlideRef.current])

    return (
        <>
            <div className="w-full flex flex-col items-center ">
                <p className="text-[18px] font-bold py-[1rem] w-full flex justify-center mt-[2rem] sm:text-[28px]">OFFICIAL MERCHANDISE</p>

                <div ref={autoSlideRef} className="overflow-x-hidden w-full">
                    <ul className="flex p-[1rem] w-max">
                        {
                            list.map(item => {
                                const {title, url}= item;

                                return (
                                    <li key={title} className="m-[10px] w-[10rem] h-[8rem] 
                                        md:w-[15rem] md:h-[13rem]">
                                        <img src={url} alt="merchandise" className="w-full h-full" />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>

            <Link to={"/membership"}>
                <div className="flex flex-col items-center justify-center mb-[2rem] sm:mt-[1rem]">
                    <p className="text-[18px] font-bold py-[1rem] sm:text-[28px] sm:">MEMBERSHIP</p>
                    
                    <div className="mt-[1rem] sm:mt-[2rem]">
                        <img src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Exclusive-Members-Tile_Desktop_vZfP1wQ.jpg?format=webp&w=1440&dpr=2.0" 
                            alt="membershipImage" />
                    </div>
                </div>
            </Link>

            
        </>
        
    )
}