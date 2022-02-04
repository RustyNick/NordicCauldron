import React from 'react';
import '../index.css'
import { Link } from "react-router-dom";

function Footer() {
    return (

        <div className='footer-box'>

            <div className='footer-inner-box'>
                <Link to="/KopVillkorPage" > Köpvillkor </Link>
            </div>
            <div className='footer-inner-box'>
                <Link to="/OmCookies" >Om cookies</Link></div>
            <div className='footer-inner-box'></div>
        </div>
    )
}

export default Footer;
