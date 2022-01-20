import React from 'react'

class Product extends React.Component {

    /*     async componentDidMount() {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ title: 'my newly added text' })
            };
     
            const response = await fetch('/api/user/:id', requestOptions);
            const data = await response.json()
            this.setState({ cart: data })
            return
        } */



    render() {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'grey',
                margin: '10px',
                padding: '10px',
            }}>
                <h2>{this.props.name}</h2>
                <p>{this.props.desc}</p>
                <h4>{this.props.price}</h4>
                <button className='btn btn-primary'>Lägg till</button>
            </div>
        )
    }
}

export default Product;