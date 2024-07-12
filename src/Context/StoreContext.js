import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../components/Utils/baseUrl";

export const StoreContext = createContext(0);

export default function StoreContextProvider({ children }) {
    const [caId, setCaId] = useState('');
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [count, setCount] = useState(0);

    async function getCart() {
        let token = localStorage.getItem('token');
        let response = await getUserCart(token);
        if (response?.data?.status === 'success') {
            setNumOfCartItems(response.data.numOfCartItems);
            setCaId(response.data.data._id);
            console.log(caId);
        }
        console.log(response);
    }

    useEffect(() => {
        getCart();
    }, []);

    function addToCart(token, productId) {
        return axios.post(`${baseUrl}/cart`, { productId }, {
            headers: { token }
        })
        .then(data => data)
        .catch(error => {
            console.error("Add to cart error:", error);
            return error;
        });
    }

    function getUserCart(token) {
        return axios.get(`${baseUrl}/cart`, {
            headers: { token }
        })
        .then(data => data)
        .catch(error => {
            console.error("Get user cart error:", error);
            return error;
        });
    }

    function removeCartItem(token, productId) {
        return axios.delete(`${baseUrl}/cart/${productId}`, {
            headers: { token }
        })
        .then(data => data)
        .catch(error => {
            console.error("Remove cart item error:", error);
            return error;
        });
    }

    function updateQty(token, productId, count) {
        return axios.put(`${baseUrl}/cart/${productId}`, { count }, {
            headers: { token }
        })
        .then(data => data)
        .catch(error => {
            console.error("Update quantity error:", error);
            return error;
        });
    }

    function getCartCount() {
        let token = localStorage.getItem('token');
        return axios.get(`${baseUrl}/cart`, {
            headers: { token }
        })
        .then(data => {
            setCount(data.data.numOfCartItems);
        })
        .catch(error => {
            console.error("Get cart count error:", error);
        });
    }

    useEffect(() => {
        getCartCount();
    }, []);

    function onlinePayment(cartId, shippingAddress) {
        let token = localStorage.getItem('token');
        return axios.post(`${baseUrl}/orders/checkout-session/${cartId}?url=http://localhost:3001`, { shippingAddress }, { headers: { token } })
        .then((data) => data)
        .catch((error) => {
            console.error("Online payment error:", error);
            return error;
        });
    }

    return (
        <StoreContext.Provider value={{ caId, numOfCartItems, onlinePayment, addToCart, getCartCount, getUserCart, removeCartItem, updateQty, count }}>
            {children}
        </StoreContext.Provider>
    );
}
