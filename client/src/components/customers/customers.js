import React, { Component } from 'react';
import './customers.css';
import command from 'nodemon/lib/config/command';

class Customers extends Component {
    constructor() {
        super();
        this.state = {
            customers: []
        }
    }

    componentDidMount() {
        fetch('/api/customers')
            .then(res => res.json())
            .then(customers => this.setState({ customers }, () => console.log('customers fetched...', customers)));
    }

    render() {
        return (
            <div>
                <h2>Customers</h2>
                <ul>
                    {this.state.customers.map(customers =>
                        <li key={customers.id}>{customers.firstname} {customers.lastname}</li>
                    )}
                </ul>
            </div>
        )
    }
}

export default Customers;
