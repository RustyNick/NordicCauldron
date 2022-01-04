import React from 'react'

class Product extends React.Component {
    constructor() {
        super();
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        fetch('/api/product')
            .then(res => res.json())
            .then(products => this.setState({ products }, () => console.log('product fetched...', products)));
    }

    render() {
        return (
            <div style={{ width: '60%', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center', margin: 'auto', }}>
                <ul style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'left', padding: '0', }}>
                    {this.state.products.map(item =>
                        <li key={item.id} style={{ height: '100%', Width: '100%', maxWidth: '250px', flexGrow: '2', display: 'flex', flexDirection: 'column', listStyle: 'none', backgroundColor: '#282c34', margin: '10px', padding: '10px', color: 'whitesmoke', alignItems: 'center', }}>

                            <h4>
                                {item.name}
                            </h4>
                            <p>
                                {item.desc}
                            </p>
                            price: {item.price} kr
                            <button type='button' className='btn btn-success' style={{ width: '70%', margin: '10px 0px', }}>Lägg till i varukorg</button>
                        </li>
                    )}
                </ul>
            </div >
        )
    }
}

export default Product;