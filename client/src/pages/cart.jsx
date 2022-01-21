import React from 'react'
import Usercart from '../components/userCart';



class Cart extends React.Component {

    state = {
        userCart: []
    }

    render() {
        return (
            <div>
                <h2>
                    This is the cart
                </h2>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'left',

                    }}>
                    {this.state.userCart.map(product =>
                        <Usercart key={product.id} id={product.id} name={product.name} desc={product.desc} price={product.price} />
                    )}
                </div>
            </div>



        )
    }
}

export default Cart;



