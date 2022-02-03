import React from 'react';
import '../index.css'
import { Link } from "react-router-dom";

function Footer() {
    return (

        <div className='footer-box'>

            <div className='footer-inner-box'>
                <Link to="/KopVillkorPage" > Köpvillkor </Link>
            </div>
            <div className='footer-inner-box'>box 2</div>
            <div className='footer-inner-box'>box 3</div>
        </div>
    )
}

export default Footer;
