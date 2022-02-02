import React from 'react'
import ItemProduct from './ItemProduct';
import './productList.css'

class ProductList extends React.Component {
    //function ProductList({ onGetProduct, product, cart, onAddToCart }) {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }

    }

    componentDidMount = () => {
        fetch('/api/product')
            .then(res => res.json())
            .then(list => this.setState({ list }))

    }

    render() {

        return (

            <div className='list-main' >
                <ul className='list-ul'>

                    {this.state.list.map((item) =>
                        <li className='list-li'
                            key={item.id} >
                            <div className='list-li-inner'>
                                <ItemProduct item={item} />
                                <button className='list-button btn-primary'
                                    onClick={() => this.props.onAddToCart(item)}
                                >
                                    Add to cart
                                </button>

                            </div>
                        </li>
                    )}
                </ul>


            </div >

        );

    }

};

export default ProductList;


