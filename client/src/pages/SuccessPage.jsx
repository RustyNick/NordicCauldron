import React from 'react';
import { Link } from "react-router-dom";
import { ArrowUpRightCircleFill } from "react-bootstrap-icons"



function SuccessPage(sessionID, user) {

    const customerCart = localStorage.getItem(("cart"))
    console.log(JSON.parse(customerCart))
    const completeBuy = async () => {
        const response = await fetch('http://localhost:3001/api/recet', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: user,
                sessionID: sessionID,
                cart: customerCart
            }),
        })
        console.log(response)
    }
    completeBuy()
    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', height: '100vh', }}>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '50px 0px', }}>
                <h2>Tack för ditt köp </h2>
                <Link to="/">Forsätt handla <ArrowUpRightCircleFill /></Link>

            </div>
        </div>

    )
}

export default SuccessPage;
