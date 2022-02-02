import React from 'react'
import './productList.css'
import { Link } from 'react-router-dom';

const ItemProduct = ({ item }) => (

    <div>

        <div
            style={{ width: '100%', height: '100px', backgroundColor: 'purple', }}
        >Image</div>
        <div
            style={{
                padding: '10px',
            }}>


            <Link to='./ProductPage' item={item}>
                <h4>{item.name}</h4>
            </Link>

            <div>
                {item.desc}
            </div>
            <div>
                {item.price}kr
            </div>

        </div>
    </div>



);


export default ItemProduct;