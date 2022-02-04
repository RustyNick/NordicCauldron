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
import SuccessPage from './pages/SuccessPage';
import KopVillkorPage from './pages/KopVillkorPage';
import OmCookies from './pages/OmCookies'

//css & design
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { loadStripe } from '@stripe/stripe-js'
import { useEffect } from 'react';
import { WindowDock } from 'react-bootstrap-icons';

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

    const stripeCustomerID = async () => {
        const response = await fetch('http://localhost:3001/api/v1/customers', {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: ""
        })
        let result = await response.json()
        return result
    }

    const createAccount = async (newAcc) => {
        let customerID = await stripeCustomerID()

        let response = await fetch("http://localhost:3001/api/newUser", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                id: genreateRandomId(),
                customerId: customerID,
                username: newAcc.username,
                password: newAcc.password,
                email: newAcc.email,
                adress: "Adress",
                zip: "Zip",
                city: "Stad",
                country: "Land"

            })
        })
        if (response === 200) {
            return true
        } else {
            return false
        }

    }


    /*    const userCheck = async (user) => {
           const getID = JSON.parse(localStorage.getItem("ID"))
           if (!getID) {
               console.log("inget ID")
           } else {
               const body = { getID }
               const response = await makeRequest('http://localhost:3001/api/userCheck', "POST", body)
               return response
           }
       }
       useEffect(async () => {
           const check = await userCheck()
       }) */



    const LoginTest = async (details) => {

        const body = {
            email: details.email,
            password: details.password
        }

        let response = await makeRequest("http://localhost:3001/api/login", "POST", body)


        if (response === false) {
            setError('Details do not match')
            return
        } else if (response === "already logged in") {
            return
        } else {


            setUser({
                name: response[0].username,
                email: response[0].email
            })

        }
        const customerID = response.map(item => {
            return item.id
        })
        localStorage.setItem("ID", JSON.stringify(customerID))
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
        const customerCart = localStorage.setItem("cart", JSON.stringify(cart))

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
        }).catch(e => {
            console.error(e.error)
        })

    }

    const verify = async () => {
        try {
            const theIdSession = sessionID
            if (!theIdSession) {
                throw new error("no session id to verify")

            }

            const response = await fetch('http://localhost:3001/api/verify', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ theIdSession: theIdSession })
            });
            const { paid } = await response.json()
            return paid

        } catch (err) {
            console.error(err);
            return false
        }

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

                <Route path="/SuccessPage" element={<SuccessPage user={user} sessionID={sessionID} setSessionID={setSessionID} />} />

                <Route path='/Productpage' element={<Productpage />} />

                <Route path='/KopVillkorPage' element={<KopVillkorPage />}></Route>
                <Route path='/OmCookies' element={<OmCookies />}></Route>

                <Route path='*' element={<ErrorPage />} />

            </Routes>
            <Footer />
        </Router >

    );
}
export default ViewPage;
