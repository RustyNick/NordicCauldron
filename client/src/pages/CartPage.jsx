import React from 'react'
import ItemProduct from '../components/ItemProduct';
import { PlusSquare, DashSquare } from 'react-bootstrap-icons';
import './cartpage.css'
//Stripe


const Cart = ({ checkout, cart, onAddToCart, onRemoveItem, onEmptyCart }) => {

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
                <span> {summary(cart)} </span>
                <div className='buy-cart'>

                    <button className='cart-button' onClick={() => onEmptyCart(cart)}>
                        Töm Kundvagn
                    </button>

                    {(cart.length !== 0) ? (

                        <div>{console.log("fylld")}
                            {/* adddera checkout function senare */}
                            <button className='cart-button' onClick={() => checkout(cart)}>Köp</button>
                        </div>
                    ) : (<div>{console.log("tom")}

                        <button disabled className="cart-button">Köp</button>

                    </div>



                    )}
                    {/* <button className='cart-button'
                        onClick={() => { console.log('köp', cart, summary(cart)) }
                    }
                    >Köp
                </button> */}
                    <span>

                    </span>
                </div>

            </div>

        </div >


    )

}

export default Cart;



