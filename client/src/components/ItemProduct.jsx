import React from 'react'
import './productList.css'
import { Link } from 'react-router-dom';

const source = "/images/"

const ItemProduct = ({ item }) => (
    < div className="product-box">

        <div className='product-inner-content'>
            <img className='img-container' src={source + item.img} alt={item.img} />
        </div>
        <div
            style={{
                padding: '10px',
            }}>


            <Link to='./ProductPage' item={item}>
                <h4>{item.name}</h4>
            </Link>

            <div style={{ minHeight: '100px', maxHeight: '100px', overflow: 'hidden', }}>
                {item.desc}
            </div>
            <div>
                {item.storeprice}kr
            </div>

        </div>
    </div >



);


export default ItemProduct;