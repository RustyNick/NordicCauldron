import React from 'react'
import { Link } from "react-router-dom";

function Nav() {
    return (
        <nav>
            <Link className='nav-links' to='/'>Start </Link>
            <Link className='nav-links' to='/profile'>Profile </Link>
            <Link className='nav-links' to='/cart'>Cart </Link>

        </nav>
    );
}

export default Nav;