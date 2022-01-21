import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import Logo from '../NordicCauldron-greyLogo.png'
import magicka from '../Magicka_logo.png'
class Feature extends React.Component {
    render() {
        return (

            <div style={{ width: '100%', backgroundColor: 'lightgreen' }}>
                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src={Logo} alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={magicka} alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={Logo} alt="Third slide" />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        )
    }
}

export default Feature;