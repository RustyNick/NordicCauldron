import React from 'react'
import Logo from '../NordicCauldron-greyLogo.png'
import Nav from './nav'





/* #282c34 */



class Header extends React.Component {
    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#282c34', }}>
                <img style={{ width: '33%', minWidth: '150px', margin: '10px', }} src={Logo} alt="Logo" />
                <Nav />
            </div>





        )
    }
}

export default Header;