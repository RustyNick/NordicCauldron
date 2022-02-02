import React from 'react'
import Logo from '../NordicCauldron-greyLogo.png'
import Nav from './Nav'
import { Link } from "react-router-dom";

/* #282c34 */

function Header({ cart, user }) {

    return (



        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#282c34', flexWrap: 'wrap', marginBottom: '10px', }}>

            <div style={{ maxWidth: '200px', height: '100%', padding: '0px 0px', margin: '10px 0px' }}>
                <Link to='/'>
                    <img style={{ width: '100%', height: '100%' }} src={Logo} alt="Logo" />
                </Link>
            </div>


            <Nav cart={cart.length} />


        </div>






    )

}

export default Header;