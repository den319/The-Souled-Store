import { Link } from "react-router-dom";





export default function Error404() {
    return (
        <div className="flex flex-col items-center justify-center my-[50px] mx-[1rem]">
            <div className="w-[100px] h-[85px] sm:w-[145px] sm:h-[120px]">
                <img src="https://tss-static-images.gumlet.io/notfound.png" alt="error-404"
                    className="w-full h-full" />
            </div>

            <div className="flex flex-col justify-center items-center mb-[2rem]">
                <p className="text-[14px] mt-[1rem] font-grey lg:text-[16px]">
                    We can't seem to find the page you are looking for
                </p>
            </div>

            <button className="cursor-pointer border border-[#117a7a] rounded-[5px] 
                bc-green text-white font-bold duration-500 px-[1rem] py-[5px]
                hover:bg-white hover:text-[#117a7a]">  
                <Link to={"/"}>
                    Go Back Home
                </Link>
            </button>
        </div>
    )
}