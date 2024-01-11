import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./styles/App.css";
import { useContext, useEffect, useState } from "react";
import Navbar from "./components/homePage/navbar";
import PageForMen from "./pages/homePage/pageForMen";
import PageForWomen from "./pages/homePage/pageForWomen";
import PageForKids from "./pages/homePage/pageForKids";
import { ModalContext } from "./context/modalContext";
import Footer from "./components/homePage/footer";
import AuthenticationPage from "./pages/loginPage/authenticationPage";
import SignUp from "./components/authenticationPage/signUp";
import LogIn from "./components/authenticationPage/logIn";
import Cart from "./pages/user/cart";
import Error404 from "./pages/errorPage/error404";
import ProfilePageForDeskTop from "./pages/profilePage/profilePageForDesktop";
import ProfilePageForMobile from "./pages/profilePage/profilePageForMobile";
import OrderSection from "./components/profilePage/orderSection/ordersSection";
import VoucherSection from "./components/profilePage/voucherSection";
import PointsSection from "./components/profilePage/pointsSection";
import MoneySection from "./components/profilePage/moneySection";
import SaveCardSection from "./components/profilePage/saveCardSection";
import EditProfileSection from "./components/profilePage/editProfileSection";
import MembershipPage from "./pages/membershipPage/membershipPage";
import { UserContext } from "./context/userContext";
import ShirtsForMen from "./components/clothCategoryForMen/shirtsForMen";
import TshirtsForMen from "./components/clothCategoryForMen/tshirtsForMen";
import HoodiesForMen from "./components/clothCategoryForMen/hoodiesForMen";
import TrackPantsForMen from "./components/clothCategoryForMen/trackPantsForMen";
import ShortsForMen from "./components/clothCategoryForMen/shortsForMen";
import JoggersForMen from "./components/clothCategoryForMen/joggersForMen";
import JeansForMen from "./components/clothCategoryForMen/jeansForMen";
import Product from "./pages/productPage/product";
import { filterCartData, filterwishlistData } from "./utils/filterFunctions";
import { fetchAuthorizedData, fetchOrderList } from "./utils/utilities";
import Wishlist from "./pages/user/wishlist";
import ArtSection from "./components/profilePage/artSection";
import AddressSection from "./components/profilePage/addressSection";
import DeliveryAddress from "./components/cart/deliveryAddress";
import Checkout from "./components/cart/checkout";
import TshirtsForWomen from "./components/clothCategoryForWomen/tshirtsForWomen";
import ShirtsForWomen from "./components/clothCategoryForWomen/shirtsForWomen";
import JeansForWomen from "./components/clothCategoryForWomen/jeansForWomen";
import JumpsuitForWomen from "./components/clothCategoryForWomen/jumpsuitsForWomen";
import JoggersForWomen from "./components/clothCategoryForWomen/joggersForWomen";
import PantsForWomen from "./components/clothCategoryForWomen/pantsForWomen";
import Apparel from "./components/homePage/apparel";
import { TagContext } from "./context/tagContext";
import SearchSection from "./components/profilePage/searchSection";

function App() {

  const {setIsMobile, isMobile, cartUrl, whishlistUrl, orderListUrl}= useContext(ModalContext);
  const {save_user_and_token, isAuthenticated, setIsAuthenticated, projectId, user,
        setItemsInCart, setWhishlistItems, whishlistItems, itemsInCart, 
        setTotalPrice, activeTab, orderList, setOrderList}= useContext(UserContext);
  const {apparelForWomen, apparelForMen}= useContext(TagContext);


  const navigate= useNavigate();
  const path= useLocation();

  const [pathArr, setPathArr]= useState([]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
  
    window.addEventListener("resize", handleResize);
  
    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    navigate("/men");
  }, []);

  // to get user info from local storage
  
  useEffect(() => {
    const authToken= localStorage.getItem("authToken");

    if(authToken) {
    const user= localStorage.getItem("userInfo");
    const parsedUser= JSON.parse(user);

      save_user_and_token(parsedUser, authToken);
      setIsAuthenticated(true);
      navigate("/men");
    }
  }, [])

  // te get cart items
  useEffect(() => {
    const authToken= localStorage.getItem("authToken");

    if(authToken) {
      try {
        fetchAuthorizedData(cartUrl.getList, authToken, projectId, filterCartData, setItemsInCart, setTotalPrice);

      } catch(error) {
          console.log("error while fetching cart items: ", error);
      }
    }
  }, []);

  // to get whishlist items
  useEffect(() => {
    const authToken= localStorage.getItem("authToken");

    if(authToken) { 
      try {
        fetchAuthorizedData(whishlistUrl.getList, authToken, projectId, filterwishlistData, setWhishlistItems);      
      } catch(error) {
          console.log("error while fetching cart items: ", error);
      }
    }
  }, []);

  // to get order list
  useEffect(() => {
    const authToken= localStorage.getItem("authToken");

    if(authToken) {
      try {
        fetchOrderList(orderListUrl.getList, authToken, projectId, setOrderList);
      } catch(error) {
          console.log("error while fetching order list: ", error);
      }
    }
  }, []);
  
  // console.log("hi");
  // console.log(orderList);

  useEffect(() => {
    const arr= path.pathname.split("/");

    setPathArr(arr);
  }, [path])


  return <div className="App">  
    <Navbar />   

    {
      (pathArr[1] !== "orders" && pathArr[1] !== "my-gift-voucher" && pathArr[1] !== "points" && pathArr[1] !== "money" && 
        pathArr[1] !== "my-saved-cards" && pathArr[1] !== "myprofile" && pathArr[1] !== "address" && pathArr[1] !== "search"  )
        && <Apparel list={activeTab === "men" ? apparelForMen : apparelForWomen} />
    }
    

    <Routes>
      <Route path="/" element={<PageForMen />} />
      <Route path="/men" element={<PageForMen />} />
      <Route path="/women" element={<PageForWomen />} />
      {/* <Route path="/kids" element={<PageForKids />} /> */}
      <Route path="/wishlist" element= {<Wishlist />} />
      <Route path="/cart" element= {<Cart />} />
      <Route path="/membership" element= {<MembershipPage />} />

      <Route path="/men-shirts" element= {<ShirtsForMen />} />
      <Route path="/men-tshirts" element= {<TshirtsForMen />} />
      <Route path="/men-hoodies" element= {<HoodiesForMen />} />
      <Route path="/men-jeans" element= {<JeansForMen />} />
      <Route path="/men-track-pants" element= {<TrackPantsForMen />} />
      <Route path="/men-shorts" element= {<ShortsForMen />} />
      <Route path="/men-joggers" element= {<JoggersForMen />} />

      <Route path="/women-tshirts" element={<TshirtsForWomen />} />
      <Route path="/women-shirts" element={<ShirtsForWomen />} />
      <Route path="/women-jeans" element={<JeansForWomen />} />
      <Route path="/women-jumpsuits" element={<JumpsuitForWomen />} />
      <Route path="/women-joggers" element={<JoggersForWomen />} />
      <Route path="/women-pants" element={<PantsForWomen />} />
      
      <Route path="/product/:productId" element= {<Product />} />
      <Route path="/submit-art-work" element= {<ArtSection />} />
      <Route path="/profile" element= {isMobile ? <ProfilePageForMobile/> : <ProfilePageForDeskTop />}>
        <Route path="orders" element= {<OrderSection />} />
        <Route path="my-gift-voucher" element= {<VoucherSection />} />
        <Route path="points" element= {<PointsSection />} />
        <Route path="money" element= {<MoneySection />} />
        <Route path="my-saved-cards" element= {<SaveCardSection />} />
        <Route path=":username" element= {<EditProfileSection />} />
        <Route path="address" element= {<AddressSection />} />
      </Route>
      <Route path="/orders" element= {<OrderSection />} />
      <Route path="/my-gift-voucher" element= {<VoucherSection />} />
      <Route path="/points" element= {<PointsSection />} />
      <Route path="/money" element= {<MoneySection />} />
      <Route path="/my-saved-cards" element= {<SaveCardSection />} />
      <Route path="/myprofile/:username" element= {<EditProfileSection />} />
      <Route path="/address" element= {<AddressSection />} />
      <Route path="/search" element= {<SearchSection />} />
      <Route path="/delivery-address/:true" element= {<DeliveryAddress />} />
      <Route path="/checkout/:true" element= {<Checkout />} />
      <Route path="/authentication" element= {<AuthenticationPage />} >
        <Route path="register" element= {<SignUp />} />
        <Route path="login" element= {<LogIn />} />
      </Route>
      <Route path="*" element= {<Error404 />} />
    </Routes>

    <Footer />
  </div>;
}

export default App;
