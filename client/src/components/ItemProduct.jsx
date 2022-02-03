import React from 'react'
import './productList.css'
import { Link } from 'react-router-dom';

const source = "/images/"

const ItemProduct = ({ item }) => (
    < div style={{ minHeight: '300px', maxWidth: "300px", overflow: 'hidden', }}>
        {
            console.log(item)
        }

        <div
            style={{ width: '100%', height: '100%', minHeight: '260px', minWidth: '300px', backgroundColor: '#FFF', display: 'flex', justifyContent: 'center', objectFit: 'contain', }}>
            <img style={{ objectFit: 'fill', width: '100%', height: '100%', }} src={source + item.img} alt={item.img} />
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