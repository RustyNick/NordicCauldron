import React from 'react'
import Hero from '../components/hero'
import Feature from '../components/feature'
import ProductList from '../components/productList'

function Home() {
    return (
        <div>
            <Hero />
            <Feature />
            <div style={{ display: 'flex', flexDirection: 'row', }}>
                <div style={{ width: '30%', }}>

                </div>

                <ProductList />
            </div>
        </div>
    );
}

export default Home;
