import React from 'react';
import { Link } from "react-router-dom";
import { ArrowUpRightCircleFill } from "react-bootstrap-icons"
import { useState } from 'react';
import { useEffect } from 'react';



function SuccessPage(sessionID, user) {
    const [order, setOrder] = useState({ count: 0, date: "", cart: [], buyer: "" })


    const customerCart = localStorage.getItem(("cart"))


    const completeBuy = async () => {
        if (customerCart !== null) {
            let response = await fetch('http://localhost:3001/api/recet', {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    user: user,
                    sessionID: sessionID,
                    cart: customerCart,
                }),
            })
            const customerorder = await response.json()
            localStorage.removeItem('cart')
            if (order.count == 0) {
                setOrder({
                    count: +1, date: customerorder.date, cart: [customerorder.cart], buyer: customerorder.buyer
                })
                return order
            } else {
                return false
            }
        } else {
            return false
        }

    }
    useEffect(async () => { await completeBuy() })

    const correctPrice = (product) => {
        const productPrice = product.price / 100 * product.quantity
        return productPrice
    }
    const totalSum = (order) => {

        const itemprice = order.cart.map(item => {
            const price = item.map(item => {
                let productprice = item.price / 100 * item.quantity
                return productprice

            })
            return price
        });


        /*   console.log("itemprice=>", itemprice[0])
          if (itemprice.length >= 0 || itemprice !== undefined || itemprice !== null) {
              let summary = itemprice[0].reduce((a, b) => a + b, 0)
  
              if (summary === 0) {
                  return ""
              } else {
                  return summary + "kr"
              }
          } else if (itemprice == undefined) {
              console.log("itemprice is blä =>", itemprice)
              return
          } */
    }
    return (
        <div id="successbox" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', height: '100vh', }}>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '50px 0px', }}>


                <div>
                    <h2>Tack för ditt köp </h2>
                    <Link to="/">Forsätt handla <ArrowUpRightCircleFill /></Link>
                    <div>

                        {order.cart.map(item =>

                            item.map(product =>
                                <div key={product.name}>
                                    <ul>
                                        <li>
                                            {product.quantity}x {product.name}: {correctPrice(product)}kr

                                        </li>
                                    </ul>


                                </div>

                            ))
                        }
                        <h4>{totalSum(order)}</h4>
                    </div>
                </div>


            </div>
        </div >

    )
}

export default SuccessPage;
