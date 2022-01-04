import React from 'react'
import Logo from '../NordicCauldron-greyLogo.png'
import { Link } from "react-router-dom";




/* #282c34 */



class Header extends React.Component {
    render() {


        return (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#282c34', }}>
                <img style={{ width: '33%', minWidth: '150px', margin: '10px', }} src={Logo} alt="Logo" />

                <nav>
                    <Link className='nav-links' to='/'>Home </Link>
                    <Link className='nav-links' to='/cart'>Cart </Link>
                </nav>
            </div>





        )
    }
}

export default Header;