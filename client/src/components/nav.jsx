import React from 'react'
import { Link } from "react-router-dom";
import { CartFill, PersonBadgeFill, HouseFill } from 'react-bootstrap-icons';

function Nav({ cart }) {
    return (

        <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0px 10px', }}>
            <Link className='nav-links' to='/'><HouseFill /> </Link>
            <Link className='nav-links' to='/ProfilePage'><PersonBadgeFill /> </Link>
            <Link className='nav-links' to='/CartPage'><CartFill />
                {cart > 0 &&
                    <span className="nav-counter">
                        {cart}
                    </span>
                }
            </Link>


        </nav>


    );
}

export default Nav;