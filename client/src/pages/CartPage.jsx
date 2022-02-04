import React from 'react'
import ItemProduct from '../components/ItemProduct';
import { PlusSquare, DashSquare } from 'react-bootstrap-icons';
import './cartpage.css'
import { useState } from 'react';
//Stripe


const Cart = ({ checkout, cart, onAddToCart, onRemoveItem, onEmptyCart }) => {
    const [deliverinfo, setDeliverinfo] = useState({ adress: "", stad: "", postnummer: "", land: "" })

    const summary = (cart) => {
        const itemprice = cart.map(item => {
            let price = item.storeprice * item.count
            return price
        });
        let summary = itemprice.reduce((a, b) => a + b, 0)

        if (summary === 0) {
            return ""
        } else {
            return "Totall belopp: " + summary + "kr"
        }


    }

    const submitHandler = e => {
        console.log(deliverinfo)
    }

    return (
        <div className='cart-background'>
            <div className='cart-base'>
                {(cart.length >= 1) ? (

                    <ul className='cart-ul'>
                        {cart.map(item =>
                            <li className='cart-li'
                                key={item.id} >
                                <ItemProduct item={item} />
                                <div className='cart-product-box'>
                                    <div className='cart-product-inner-box'>
                                        <button
                                            className='btn'
                                            style={{ margin: '0px 10px', outline: 'none', }}
                                            onClick={() => onRemoveItem(item)}
                                        >
                                            <DashSquare size={30} />
                                        </button>

                                        <span style={{ fontSize: '2em', margin: '0px 5px', }}>{item.count}</span>

                                        <button className='btn'
                                            style={{ margin: '0px 10px', outline: 'none', }}
                                            onClick={() => onAddToCart(item)}
                                        >
                                            <PlusSquare size={30} />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>

                ) : "Kundvagnen är tom"}

                <form onSubmit={submitHandler} >
                    <div className='account-form'>
                        <div>
                            <label htmlFor="adress">Adress</label>
                            <input type="text" name="adress" id="adress" onChange={e => setDeliverinfo({ ...deliverinfo, adress: e.target.value })} value={deliverinfo.adress} />
                        </div>
                        <div>
                            <label htmlFor="Stad">Stad</label>
                            <input type="text" name="Stad" id="Stad" onChange={e => setDeliverinfo({ ...deliverinfo, Stad: e.target.value })} value={deliverinfo.Stad} />
                        </div>
                        <div>
                            <label htmlFor="name">Postnummer</label>
                            <input type="text" name="postnummer" id="postnummer" onChange={e => setDeliverinfo({ ...deliverinfo, postnummer: e.target.value })} value={deliverinfo.postnummer} />
                        </div>
                        <div>
                            <label htmlFor="name">Land</label>
                            <input type="text" name="land" id="land" />
                        </div>
                    </div>
                </form>

                <span> {summary(cart)} </span>
                <div className='buy-cart'>


                    <button className='cart-button' onClick={() => onEmptyCart(cart)}>
                        Töm Kundvagn
                    </button>

                    {(cart.length !== 0) ? (

                        <div>
                            {/* adddera checkout function senare */}
                            <button className='cart-button' onClick={() => checkout(cart)}>Köp</button>
                        </div>
                    ) : (<div>

                        <button disabled className="cart-button">Köp</button>

                    </div>



                    )}
                    <span>

                    </span>
                </div>

            </div>

        </div >


    )

}

export default Cart;



