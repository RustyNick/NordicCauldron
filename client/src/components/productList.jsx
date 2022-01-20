import React, { Component } from 'react'
import Product from './product';



export class ProductList extends Component {

    state = {
        products: [],
    }

    componentDidMount() {
        fetch('/api/product')
            .then(res => res.json())
            .then(products => this.setState({ products }, () => console.log('product fetched...', products)));
    }

    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'left',

                }}>
                {this.state.products.map(product =>
                    <Product
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        desc={product.desc}
                        item={product}
                        price={product.price} />
                )}
            </div>
        )
    }
}

export default ProductList
