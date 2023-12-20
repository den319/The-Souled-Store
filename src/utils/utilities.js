
import axios from "axios";



export function openTheModal(e, setModal) {
    if(e.stopPropogation) {
        e.stopPropogation();
    }
    
    setModal((old) => !old);
}

export function closeTheModal(e, setModal) {
    setModal(false);
}



export async function fetch_data(url, projectId) {
        
    try {
        const data= await axios.get(url, {headers:{"projectId":projectId}});
       
        return data.data.data;
    } catch(error) {
        console.log(error);
    }
}

export async function fetchAuthorizedData(url, authToken, projectId, filterFunction, setData, setPrice) {
    var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${authToken}`);
        myHeaders.append("projectID", projectId);

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const response= await fetch(url, requestOptions);
        const data= await response.json();

        // console.log(data.data)


        const modifiedData= filterFunction(data.data);
        // console.log("modified data: ", modifiedData);

        setData(modifiedData);   
        setPrice && setPrice(data?.data?.totalPrice)
}

export function findProduct(list, productId) {
    const isPresent= list.some(item => item.productId === productId);

    return isPresent;
}




export async function manageWhishlist(whishlistItems, setWhishlistItems, product, token, projectId) {
    const isPresent= whishlistItems.some(item => item.productId === product.productId);


    const baseUrl= "https://academics.newtonschool.co/api/v1/ecommerce/wishlist/"

    if(isPresent) {

        try{
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("projectID", `${projectId}`);

            var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
            };

            const response= await fetch(baseUrl + `${product.productId}`, requestOptions);

            if(response.ok) {
                const data= whishlistItems.filter(item => item.productId !== product.productId);
                setWhishlistItems(data);
            }
            
        } catch(error) {
            console.log("error in deleting item from wishlist: ", error);
        }
    } else {
        try{
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("projectID", `${projectId}`);

            var raw = JSON.stringify({
                "productId": `${product.productId}`
            });

            var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            const response= await fetch(baseUrl, requestOptions);

            if(response.ok) {
                const data= [...whishlistItems, {
                    productId: product.productId,
                    displayImage: product.displayImage,
                    productName: product.name,
                    price: product.price,
                    ratings: product.ratings,
                }];
                setWhishlistItems(data);
            }
        } catch(error) {
            console.log("error in deleting item from wishlist: ", error);
        }
    }
}



export async function addInCart(itemsInCart, setItemsInCart, product, setTotalPrice, token, projectId, quantity, size) {

    const baseUrl= "https://academics.newtonschool.co/api/v1/ecommerce/cart/"

    try{
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("projectID", `${projectId}`);

        var raw = JSON.stringify({
            "quantity" : quantity,
            "size": `${size}`
        });

        var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        const response= await fetch(baseUrl + `${product.productId}`, requestOptions);
        const data= await response.json();

        // console.log("added: ", data.data);
        // console.log("response: ", response)
        // console.log("product id: ", product.productId);

        if(response.ok) {
            const newList= [...itemsInCart, {
                productId: product.productId,
                displayImage: product.displayImage,
                productName: product.name,
                price: product.price,
                ratings: product.ratings,
                size: size,
                quantity: quantity,
            }];
            setItemsInCart(newList);

            setTotalPrice(data?.data?.totalPrice);
        }
    } catch(error) {
        console.log("error in deleting item from cart: ", error);
    }    
}



export async function removeFromCart(itemsInCart, setItemsInCart, product, setTotalPrice, token, projectId) {

    const baseUrl= "https://academics.newtonschool.co/api/v1/ecommerce/cart/"

    try{
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("projectID", `${projectId}`);

        var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
        };

        const response= await fetch(baseUrl + `${product.productId}`, requestOptions);
        const data= await response.json();

        // console.log("removed: ", data.data);

        if(response.ok) {
            const newList= itemsInCart.filter(item => item.productId !== product.productId);

            setItemsInCart(newList);
            setTotalPrice(data?.data?.totalPrice);
        }
    } catch(error) {
        console.log("error in deleting item from cart: ", error);
    }
    
}

