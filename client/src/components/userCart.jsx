import React from 'react'

class Usercart extends React.Component {
    state = {
        cart: []
    }
    render() {
        return (

            <div>
                <h2>{this.props.name}</h2>
                <p>{this.props.desc}</p>
            </div>
        )
    }
}

export default Usercart;