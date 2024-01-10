import React, { useState } from "react";




const ModalContext= React.createContext();


function ModalProvider({children}) {

  const [isMobile, setIsMobile]= useState(false);
  const [isMenuOpened, setIsMenuOpened]= useState(false);

  const [cartUrl, setCartUrl]= useState({
    addItem: "https://academics.newtonschool.co/api/v1/ecommerce/cart/",
    getList: "https://academics.newtonschool.co/api/v1/ecommerce/cart",
    deleteItem: "https://academics.newtonschool.co/api/v1/ecommerce/cart/",
    deleteAll: "https://academics.newtonschool.co/api/v1/ecommerce/cart",
  });

  const [whishlistUrl, setWishlistUrl]= useState({
    getList: "https://academics.newtonschool.co/api/v1/ecommerce/wishlist",
    addProduct: "https://academics.newtonschool.co/api/v1/ecommerce/product/wishlist/",
    removeProduct: "https://academics.newtonschool.co/api/v1/ecommerce/wishlist/",
    removeAllProducts: "https://academics.newtonschool.co/api/v1/ecommerce/wishlist",
  });

  const [orderListUrl, setOrderListUrl]= useState({
    getList: "https://academics.newtonschool.co/api/v1/ecommerce/order",
    addOrder: "https://academics.newtonschool.co/api/v1/ecommerce/order",
    getOrder: "https://academics.newtonschool.co/api/v1/ecommerce/order/",
  });

  const [userData, setUserData]= useState({
    updateData: "https://academics.newtonschool.co/api/v1/user/updateme",
    deleteUser: "https://academics.newtonschool.co/api/v1/user/deleteMe",
  });

  const [reviewUrl, setReviewUrl]= useState({
    getReviewsOfProduct: "https://academics.newtonschool.co/api/v1/ecommerce/review/",
    addReview: "https://academics.newtonschool.co/api/v1/ecommerce/review/",
    deleteReview: "https://academics.newtonschool.co/api/v1/ecommerce/review/",
  });

  const [productUrl, setProductUrl]= useState({
    getList: "https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?",
    getProduct: "https://academics.newtonschool.co/api/v1/ecommerce/product/",
    searchProduct: "https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?search=",
    filterProduct: "https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?filter=",
  });



    return (
        <ModalContext.Provider value={{isMobile, setIsMobile, isMenuOpened, setIsMenuOpened,
        cartUrl, whishlistUrl, orderListUrl, userData, reviewUrl, productUrl}}>
            {children}
        </ModalContext.Provider>
    )
}

export {ModalContext, ModalProvider};