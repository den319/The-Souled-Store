import { useContext, useState } from "react";
import FacebookIcon from "../../assets/svg/facebookIcon";
import InstagramIcon from "../../assets/svg/instagramIcon";
import RefreshIcon from "../../assets/svg/refreshIcon";
import Rupee from "../../assets/svg/rupee";
import SnapchatIcon from "../../assets/svg/snapchatIcon";
import TwitterIcon from "../../assets/svg/twitterIcon";
import PaymentImage from "../../assets/png/payments-icon.png";
import CopyrightIcon from "../../assets/svg/copyrightIcon";
import { UserContext } from "../../context/userContext";





export default function Footer() {

    const {isMobile}= useContext(UserContext);

    const [date, setDate]= useState(new Date);
    const [year, setYEar]= useState(date.getFullYear());

    const shippingPartners= [
        "https://tss-static-images.gumlet.io/icons/fedex.png",
        "https://tss-static-images.gumlet.io/icons/dtdc.png",
        "https://tss-static-images.gumlet.io/icons/delivery.png",
        "https://prod-img.thesouledstore.com/public/theSoul/images/icons/ECOM-Express.png?format=webp&w=100&dpr=2.0",
        "https://prod-img.thesouledstore.com/public/theSoul/images/icons/XPRESSBEES.png?format=webp&w=100&dpr=2.0"
    ];

    const footerTags= [
        {heading: "NEED HELP", tagList: [
           "contact Us", "Track Order", "Returns & Refunds", "FAQs", "My Account" 
        ]},
        {heading: "COMPANY", tagList: [
            "About US", "Careers", "Community Initiatives", "Souled Army"
        ]},
        {heading: "MORE INFO", tagList: [
            "T&C", "Privacy Policy", "Sitemap"
        ]},
        {heading: "STORE NEAR ME", tagList: [
            "Bandra", "Thane", "Colaba", "Palladium", "Pune", "Bangalore", "Malad", "Ghatkopar",
            "Goregaon", "Ahmedabad", "Haryana", "Bhopal", "Surat" 
        ]},
    ]

    function renderShippingPartners() {
        return (
            shippingPartners.map(item => {
                return(
                    <div key={item} className="ml-[1rem] w-[60px] h-[30px]">
                        <img src={item} alt="image" />
                    </div>
                )
            })
        )
    }
    return (
        <footer className="w-full">
            <div className="text-[15px] bg-[#e71318] text-white flex justify-center
                source-sans-3 py-[10px] md:text-[24px] lg:text-[39px]">
                HOMEGROWN INDIAN BRAND
            </div>

            <div className="flex justify-center text-[19px] py-[18px] source-sans-3
                md:text-[30px] lg:text-[48px]">
                <p>Over</p>
                <p className="font-bold ml-[10px]">6 Million</p>
                <p className="ml-[10px]">Happy Customers</p>
            </div>

                {/* app store */}

            {
                isMobile && 
                <div className="flex items-center justify-center py-[1.5rem] bg-[#dddddd]">
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-[16px] font-bold">EXPERIENCE THE SOULED STORE APP</p>
                        <div className="flex items-center my-[5px]">
                            <div className="w-[126px] h-[40px]">
                                <img src="https://tss-static-images.gumlet.io/icons/play-store.png" alt="play-store" />
                            </div>

                            <div className="w-[126px] h-[40px] ml-[1rem]">
                                <img src="https://tss-static-images.gumlet.io/icons/app-store.png" alt="app-store" />
                            </div>
                        </div>
                    </div>
                </div>
            }

            <div className="bg-[#e6e7e8] font-grey w-full px-[1rem] py-[1rem]
                border-b-[2px] border-b-[#a3a3a8]
                sm:px-[2rem] md:px-[3rem] lg:px-[4rem] xl:px-[10rem]">

                    {/* tags */}
                <div className="flex flex-col items-center justify-center w-full">
                    <div className="font-bold text-[14px] grid grid-cols-2 gap-[1rem] 
                        justify-between lg:grid-cols-4 w-full">
                        {
                            footerTags.map(item => {
                                const {heading, tagList}= item;

                                return (
                                    <div key={heading} className="flex flex-col justify-start">
                                        <p className="pl-0 font-red text-[20px] p-[10px]">
                                            {heading}
                                        </p>

                                        <ul>
                                            {
                                                tagList.map(item => {
                                                    return (
                                                        <li key={item} className="py-[5px] hover:text-[#e71318] cursor-pointer">
                                                            {item}
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                {/* return policy */}

                <div className="text-[15px]">
                    <div className="flex items-center my-[10px]">
                        <div className="border border-[#999] rounded-full p-[4px]">
                            <Rupee width={"16px"} height={"16px"} />
                        </div>
                        <p className="ml-[10px]">COD Available</p>
                    </div>

                    <div className="flex items-center my-[10px]">
                        <div className="border border-[#999] rounded-full">
                            <RefreshIcon width={"24px"} height={"24px"} />
                        </div>
                        <p className="ml-[10px]">30 Days Easy Return</p>
                    </div>
                </div>


                {/* app store */}

                {
                    !isMobile && 
                    <div className="mt-[2rem] flex items-center justify-center">
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-[16px] font-bold">EXPERIENCE THE SOULED STORE APP</p>
                            <div className="flex items-center my-[5px]">
                                <div className="w-[126px] h-[40px]">
                                    <img src="https://tss-static-images.gumlet.io/icons/play-store.png" alt="play-store" />
                                </div>

                                <div className="w-[126px] h-[40px] ml-[1rem]">
                                    <img src="https://tss-static-images.gumlet.io/icons/app-store.png" alt="app-store" />
                                </div>
                            </div>
                        </div>
                    </div>
                }


                {/* social media icons */}

                <div className="flex items-center justify-end text-[14px] mt-[1rem]">
                    <p>
                        Follow Us:
                    </p>

                    <div className="flex items-center">
                        <div className="rounded-full ml-[10px] p-[8px] bg-[#6081c0]">
                            <FacebookIcon color={"#ffffff"} />
                        </div>

                        <div className="rounded-full ml-[10px] p-[8px] bg-[#c03694]">
                            <InstagramIcon color={"#ffffff"} />
                        </div>

                        <div className="rounded-full ml-[10px] p-[8px] bg-[#f9b927]">
                            <SnapchatIcon color={"#ffffff"} />
                        </div>

                        <div className="rounded-full ml-[10px] p-[8px] bg-[#4abbe9]">
                            <TwitterIcon color={"#ffffff"} />
                        </div>
                    </div>
                </div>

                {/* shipping partners */}

                <div className="flex flex-col items-start justify-start text-[14px] mt-[2rem]
                    lg:flex-row lg:items-center lg:justify-start">
                    <div className="flex items-center">
                        <span className="w-fit">100% Secure Payment:</span>

                        <div className="w-[200px] md:w-[500px] md:h-[100px] lg:w-[300px] lg:h-[60px]">
                            <img src={PaymentImage} alt="payment-image" />
                        </div>
                    </div>

                    <div className="flex items-center flex-wrap lg:ml-[1rem] lg:pl-[1rem] 
                        lg:border-l lg:border-[#585958] ">
                        <p>Shipping Partners</p>
                        {
                            renderShippingPartners()
                        }
                    </div>
                </div>
            </div>    

                {/* copyright section */}

            <div className="font-grey text-[14px] font-bold">
                <div className="bg-[#e6e7e8] flex items-center justify-center py-[1rem]">
                    <div>
                        <CopyrightIcon color={"#58595b"} />
                    </div>
                    <p className="ml-[5px]">The Souled Store</p>
                    <p className="ml-[5px]">{year}-{year+1}</p>
                </div>
            </div>
        </footer>
    )
}