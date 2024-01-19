import React, { useState } from "react";



const UserContext= React.createContext();

function UserProvider({children}) {

    const [projectId, setProjectId]= useState("y0fejcvlysl6");

    const [isAuthenticated, setIsAuthenticated]= useState(false);

    const [itemsInCart, setItemsInCart]= useState([]);
    const [whishlistItems, setWhishlistItems]= useState([]);
    const [orderList, setOrderList]= useState([]);

    const [totalPrice, setTotalPrice]= useState(0);

    const [user, set_user]= useState(null);
    const [token, set_token]= useState(null);

    const [username, setUserName]= useState(user?.name);

    const [activeTab, setActiveTab]= useState("men");

    const [isMobile, setIsMobile]= useState(false);
    const [isMenuOpened, setIsMenuOpened]= useState(false);
    
    function save_user_and_token(user, token) {
        set_user(user);
        set_token(token);
    }

    function saveUser(user) {
        set_user(user);
    }
    
    return(
        <UserContext.Provider value={{isMobile, setIsMobile, isMenuOpened, setIsMenuOpened, 
            isAuthenticated, setIsAuthenticated, itemsInCart, setItemsInCart,
            whishlistItems, setWhishlistItems, projectId, username, setUserName, 
            save_user_and_token, saveUser, activeTab, setActiveTab, orderList, setOrderList,
            user, set_user, token, set_token, totalPrice, setTotalPrice}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}