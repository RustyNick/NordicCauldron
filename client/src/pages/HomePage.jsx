import React from 'react'
import ProductList from '../components/ProductList'

const Home = ({ product, onGetProduct, onAddToCart }) => {

    return (

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>

            <ProductList onGetProduct={onGetProduct} product={product} onAddToCart={onAddToCart} />

        </div>

    );
}

export default Home;
