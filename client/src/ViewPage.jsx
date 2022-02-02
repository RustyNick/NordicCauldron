//React
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer';
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage';
import ErrorPage from './pages/ErrorPage';
import ProfilePage from './pages/ProfilePage';
import Productpage from './pages/Productpage';
//css & design
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { loadStripe } from '@stripe/stripe-js'
import { useEffect } from 'react';

const stripePromis = loadStripe(
    "pk_test_51KNH2DAoww90mq16yCRYzFYxFIJZzg8QBC5KueOyRvIqrdvHAfkzgSMGgU7H8iELM27KMtEUxDl1OQz11liw5AjS00rWAEtlJN"
);


const summarizeCart = (cart) => {
    const groupItems = cart.reduce((summary, item) => {
        summary[item.id] = summary[item.id] || {
            ...item,
            count: 0
        }
        summary[item.id].count++;
        return summary;
    }, {});
    return Object.values(groupItems);
};

function ViewPage() {

    const state = {
        list: []
    }
    const [user, setUser] = useState({ name: "", email: "", cart: [], prevOrder: [] });
    const [error, setError] = useState("");
    const [product, setProduct] = useState(state.list)
    const [cart, setCart] = useState([])
    const [sessionID, setSessionID] = useLocalStorage("session", "id")



    function useLocalStorage(key, initialValue) {
        const [storedValue, setStoredValue] = useState(() => {
            try {
                const item = window.localStorage.getItem(key);
                return item ? JSON.parse(item) : initialValue;
            } catch (error) {
                console.log(error);
                return initialValue;
            }
        });
        const setValue = (value) => {
            try {
                const valueToStore =
                    value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                console.log(error);
            }
        };
        return [storedValue, setValue];
    }



    const getProducts = async () => {
        const response = await makeRequest("http://localhost:3001/api/product", "get")
        setProduct(response)
        return response

    }

    const genreateRandomId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    const createAccount = async (newAcc) => {
        const body = {
            id: genreateRandomId(),
            username: newAcc.username,
            password: newAcc.password,
            email: newAcc.email,
            adress: "Adress",
            zip: "Zip",
            city: "Stad",
            country: "Land",
        }

        let response = await makeRequest("http://localhost:3001/api/newUser", "POST", body)
        if (response === 200) {
            console.log("success")
        } else {
            console.log(response)
        }

    }
    const LoginTest = async (details) => {

        const body = {
            email: details.email,
            password: details.password
        }

        let response = await makeRequest("http://localhost:3001/api/login", "POST", body)
        console.log(response)

        if (response === false) {
            console.log("details do not match")
            setError('Details do not match')
        } else if (response === "already logged in") {
            console.log("you are logged in")
        } else {
            console.log('logged in')

            setUser({
                name: response[0].username,
                email: response[0].email
            })
        }
    }

    const emptyCart = async () => {
        setCart([])

    }

    const addToCart = async (item) => {

        setCart(prevCart => [...prevCart, item]);
    };

    const removeItem = (item) => {
        let index = cart.findIndex(i => i.id === item.id);
        if (index >= 0) {
            setCart(cart => {
                const newCart = [...cart];
                newCart.splice(index, 1)
                return newCart;
            })
        }
    }
    const logout = async () => {
        const response = await makeRequest('http://localhost:3001/api/delete', 'DELETE')
        console.log(response)
        setUser({ name: "", email: "" })
        window.location.reload(false);
    }

    const checkout = async (cart) => {
        const stripe = await stripePromis;
        const cartItem = cart.map(item => {
            let product = { id: item.id, quantity: item.count }
            return product
        })

        fetch('http://localhost:3001/create-checkout-session', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: cartItem
            })
        }).then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        }).then(({ id }) => {
            const idSession = JSON.stringify(id)
            setSessionID(idSession)
            stripe.redirectToCheckout({ sessionId: id })

            /* .then(({ url }) => {
                console.log(url)
                window.location = url */
        }).catch(e => {
            console.error(e.error)
        })

    }
    async function makeRequest(url, method, body) {
        try {
            const response = await fetch(url, {
                headers: { "Content-Type": "Application/json" },
                method,
                body: JSON.stringify(body)
            })
            const result = await response.json()
            return result

        } catch (error) {
            console.log(Error)
        }
    }




    return (
        <Router>

            <Header cart={cart} user={user} />
            <Routes>
                <Route path='/' element={<HomePage onGetProduct={getProducts} product={product} cart={cart} onAddToCart={addToCart} />} />

                <Route path='/ProfilePage' element={<ProfilePage logout={logout} createAccount={createAccount} user={user} error={error} LoginTest={LoginTest} />} />

                <Route path='/CartPage' element={<CartPage checkout={checkout} cart={summarizeCart(cart)} onAddToCart={addToCart} onRemoveItem={removeItem} onEmptyCart={emptyCart} />} />

                <Route path='/Productpage' element={<Productpage />} />

                <Route path='*' element={<ErrorPage />} />

            </Routes>
            <Footer />
        </Router >

    );
}
export default ViewPage;
