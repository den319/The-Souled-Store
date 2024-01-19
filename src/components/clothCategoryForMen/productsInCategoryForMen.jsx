import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { mapDataForHomePage } from "../../utils/filterFunctions";
import RenderProducts from "./renderProducts";
import { fetch_data } from "../../utils/utilities";
import CloseButton from "../../assets/svg/closeButton";






export default function RenderProductsInCategory({url, subCategory, heading, gender}) {

    const {projectId, isMobile}= useContext(UserContext);


    const brands= [
        `Bewakoof®`, `TISTABENE`, `7 Shores`, `Campus Sutra`, `Style Quotient`, `breakbounce`, 
        `chkokko`, `XYXX`, `Rigo`, `Alstyle`, `Brown Mocha`, `Hubberholme`, `CHIMPAAANZEE`, 
        `Smugglerz`, `Blue Tyga`, `TALES and STORIES`, `Belliskey`, `ANGEL FAB`, `Kotty`, 
        `Thomas Scott`, `Old Grey`, `BLANCK`, `Urban Scottish`, `THE DAILY OUTFITS`, 
        `INDICLUB`, `TrueBuyWorld`, `Bstories`, `Shopolics`, `THE DRY STATE`, `OFFICIAL NARUTO MERCHANDISE`
        ];

    const size= ["S", "M", "L", "XL", "XXL"];

    const [brandState, setBrandState]= useState([]);
    const [sizeState, setSizeState]= useState([]);

    const [productList, setProductList]= useState([]);
    const [isLoading, setIsLoading]= useState(false);

    const [sortType, setSortType]= useState("productName");

    const [filterModal, setFilterModal]= useState(false);
    const [sortModal, setSortModal]= useState(false);

    function handleBrandChange(e) {
        const isChecked= e.target.checked;
        const name= e.target.name;

        if(isChecked) {
            setBrandState((old) => [...old, `${name}`]);
        } else {
            setBrandState(brandState.filter(item => item !== `${name}`))
        }
    }

    function handleSizeChange(e) {
        const isChecked= e.target.checked;
        const name= e.target.name;

        if(isChecked) {
            setSizeState((old) => [...old, `${name}`]);
        } else {
            setSizeState(sizeState.filter(item => item !== `${name}`))
        }
    }

    function handleModal(event) {
        const value= event.currentTarget.value;
        if(value === "filter") {
            setFilterModal(old => !old);
            setSortModal(false);
        } else {
            setSortModal(old => !old);
            setFilterModal(false);
        }
    }

    // to fetch data
    useEffect(() => {
        const brandParam= brandState.length !== 0 ? `,"brand":${JSON.stringify(brandState)}` : "";
        const sizeParam= sizeState.length !== 0 ? `,"size":${JSON.stringify(sizeState)}` : "";

        const newUrl= url + `{"gender":${JSON.stringify(gender)},"subCategory":${JSON.stringify(subCategory)}${brandParam}${sizeParam}}&page=1&limit=20`;

        setIsLoading(true);
        try {
            fetch_data(newUrl, projectId)
            .then((data) => {
                const modifiedData= mapDataForHomePage(data);
                setProductList(modifiedData);
            })
            .catch((error) => {
                console.log("error in processing the data: ", error);
            })
        } catch(error) {
            console.log("error in fetching: ", error);
        } finally {
            setIsLoading(false);
        }
    }, [brandState, sizeState])
    
    // to sort data
    useEffect(() => {
        const types= {
            productName: "productName",
            price: "price",
        };

        const sortProperty= types[sortType];

        if(sortProperty === "productName") {
            setProductList((prevState) => {
                const sortedList= [...prevState].sort((a,b) => {if(a.productName < b.productName) {return -1}; 
                    if(a.productName > b.productName) {return 1}; return 0;});
                return sortedList;
            });
        } else if(sortProperty === "price") {
            setProductList((prevState) => {
                const sortedList= [...prevState].sort((a,b) => a[sortProperty] - b[sortProperty]);
                return sortedList;
            });
        }  
    }, [sortType, brandState, sizeState])

    return (
        <div className="relative py-[1rem] px-[5px] flex sm:px-[1rem] flex-col md:flex-row">
            {/* aside section for desktop */}
            {
                !isMobile &&
                    <div className="min-w-[15rem] px-[1rem] border-r border-[#eee]">
                        <div className="border-b-[2px] border-[#ccc] py-[10px]">
                            <p className="font-bold mx-[10px] border-b border-[#eee] py-[10px]">BRANDS</p>

                            <div className="w-full mt-[10px]">
                                <ul className="w-full">
                                    {
                                        brands.map(brand => {
                                            return (
                                                <li key={brand} className="flex w-full rounded-[4px] px-[10px] py-[5px]
                                                    hover:bg-[#f9f9f9]">
                                                    <input type="checkbox" name={brand} id={brand} 
                                                        className="cursor-pointer"
                                                        onChange={(e) => handleBrandChange(e)} />
                                                    <label htmlFor={brand} className="pl-[10px] cursor-pointer w-full">{brand}</label>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>

                        <div className="w-full py-[10px]">
                            <p className="font-bold mx-[10px] border-b border-[#eee] py-[10px]">SIZE</p>

                            <div className="mt-[10px]">
                                <ul className="w-full">
                                    {
                                        size.map(item => {
                                            return (
                                                <li key={item} className="flex w-full rounded-[4px] px-[10px] py-[5px]
                                                hover:bg-[#f9f9f9]" >
                                                    <input type="checkbox" name={item} id={item} 
                                                        className="cursor-pointer"
                                                        onChange={(e) => handleSizeChange(e)} />
                                                    <label htmlFor={item} className="pl-[10px] cursor-pointer w-full">{item}</label>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
            }
            
            {/* product section */}
            <div className="w-full sm:px-[1.5rem]">
                {
                    !isMobile &&
                        <div className="w-full p-[1rem] flex items-center justify-between"> 
                            <p className="font-bold">{heading}</p>

                            <select className="border border-[#ccc] rounded-[5px] px-[10px] py-[5px]"
                                onChange={(e) => {setSortType(() => e.target.value)}}>
                                <option value={"none"}>Sort By</option>
                                <option value="productName">Name: A-Z</option>
                                <option value="price">Price: Low to High</option>
                            </select>
                        </div>
                }

                
                <div>
                    <RenderProducts list={productList} isLoading={isLoading} />
                </div>
                
            </div>

{/* --------------- modal section for mobile view ---------------------------------- */}
            {
                (isMobile && !filterModal && !sortModal) &&
                <div className="fixed bottom-0 left-0 flex w-full bg-white font-bold border-t-[2px] border-[#f2f2f2]">
                    <button value="filter"
                        onClick={(e) => handleModal(e)}
                        className="w-1/2 flex items-center justify-center py-[10px] cursor-pointer border-r-[1px] border-[#f2f2f2]">
                        <div className="w-[1rem] h-[1rem]">
                            <img src="https://prod-img.thesouledstore.com/public/theSoul/images/filterIcons/ic_filter.png?format=webp&w=160&dpr=1.3" 
                                alt="No Image" />
                        </div>
                        <p className="ml-[10px]">FILTER</p>
                    </button>

                    <button value="sort"
                        onClick={(e) => handleModal(e)}
                        className="w-1/2 flex items-center justify-center py-[10px] cursor-pointer border-l-[1px] border-[#f2f2f2]">
                        <div className="w-[1.5rem] h-[1.5rem] flex items-center">
                            <img src="https://prod-img.thesouledstore.com/public/theSoul/images/filterIcons/ic_sort.png?format=webp&w=160&dpr=1.3" 
                                alt="No Image" />
                        </div>
                        <p className="ml-[10px]">SORT</p>
                    </button>
                </div>
            } 

            {
                filterModal &&
                <div className="fixed bottom-0 right-0 w-full h-full bg-white">
                    <div className="w-full flex items-center justify-between p-[10px] border-b border-[#f2f2f2]">
                        <div className="flex items-center font-bold">
                            <div className="w-[1rem] h-[1rem]">
                                <img src="https://prod-img.thesouledstore.com/public/theSoul/images/filterIcons/ic_filter.png?format=webp&w=160&dpr=1.3" 
                                    alt="No Image" />
                            </div>
                            <p className="ml-[10px]">FILTER</p> 
                        </div>
                        <div className="flex items-center cursor-pointer group mr-[10px] rounded-full hover:bg-[#e11b23]" 
                            onClick={() => setFilterModal(false)}>
                            <CloseButton width={"30px"} height={"30px"} effect={"group-hover:fill-white"} />
                        </div>
                    </div>
                    
                    <div>
                        {/* brand section */}
                        <div className="border-b-[2px] border-[#ccc] py-[10px]">
                            <p className="font-bold mx-[10px] border-b border-[#eee] py-[10px]">BRANDS</p>

                            <div className="w-full mt-[10px]">
                                <ul className="w-full max-h-[20rem] overflow-y-auto">
                                    {
                                        brands.map(brand => {
                                            const isPresent= brandState?.some(item => item ===brand);
                                            return (
                                                <li key={brand} className="flex w-full rounded-[4px] px-[1rem] py-[10px]
                                                    hover:bg-[#f9f9f9]">
                                                    <label htmlFor={brand} className="cursor-pointer w-full">{brand}</label>

                                                    <input type="checkbox" name={brand} id={brand} 
                                                        className="cursor-pointer" checked= {isPresent}
                                                        onChange={(e) => handleBrandChange(e)} />
                                                    
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>

                        {/* size section */}
                        <div className="w-full py-[10px]">
                            <p className="font-bold mx-[10px] border-b border-[#eee] py-[10px]">SIZE</p>

                            <div className="mt-[10px]">
                                <ul className="w-full">
                                    {
                                        size.map(item => {
                                            const isPresent= sizeState?.some(state => item ===state);
                                            return (
                                                <li key={item} className="flex w-full rounded-[4px] px-[1rem] py-[10px]
                                                hover:bg-[#f9f9f9]" >
                                                    <label htmlFor={item} className="cursor-pointer w-full">{item}</label>

                                                    <input type="checkbox" name={item} id={item} 
                                                        className="cursor-pointer"
                                                        checked= {isPresent}
                                                        onChange={(e) => handleSizeChange(e)} />
                                                    
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                </div>
            }

            {
                sortModal && 
                    <div className="fixed bottom-0 right-0 w-full h-full bg-white">
                        <div className="w-full flex items-center justify-between p-[10px] border-b border-[#f2f2f2]">
                            <div className="flex items-center font-bold">
                                <div className="w-[1.5rem] h-[1.5rem] flex items-center">
                                    <img src="https://prod-img.thesouledstore.com/public/theSoul/images/filterIcons/ic_sort.png?format=webp&w=160&dpr=1.3" 
                                        alt="No Image" />
                                </div>
                                <p className="ml-[10px]">SORT</p> 
                            </div>
                            <div className="flex items-center cursor-pointer group mr-[10px] rounded-full hover:bg-[#e11b23]" 
                                onClick={() => setSortModal(false)}>
                                <CloseButton width={"30px"} height={"30px"} effect={"group-hover:fill-white"} />
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="flex items-center justify-between px-[1rem] py-[10px] hover:bg-[#f2f2f2] cursor-pointer"
                                onClick={(e) => {setSortType(() => e.target.value)}}>
                                <label htmlFor="price" className="w-full cursor-pointer">Price-Low to High</label>

                                <input type="radio" id="price" name="price" value="price" 
                                    checked= {sortType === "price"}
                                    className="w-[1rem] h-[1rem] cursor-pointer"/>
                            </div>
                            <div className="flex items-center justify-between px-[1rem] py-[10px] hover:bg-[#f2f2f2] cursor-pointer"
                                onClick={(e) => {setSortType(() => e.target.value)}}>
                                <label htmlFor="productName" className="w-full cursor-pointer">A-Z</label>

                                <input type="radio" id="productName" name="productName" value="productName" 
                                    checked= {sortType === "productName"}
                                    className="w-[1rem] h-[1rem] cursor-pointer"/>
                            </div>
                        </div>
                    </div>
            }

        </div>
    )
}