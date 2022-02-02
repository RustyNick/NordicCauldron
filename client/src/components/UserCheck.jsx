import React, { Component } from 'react';

export default class UserCheck extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: ""
        }

    }

    componentDidMount = () => {
        fetch('/api/product')
            .then(res => res.json())
            .then(user => this.setState({ user }))
    }


    render() {

        return (
            <div>
                {user}
                UserCheck
            </div>

        )
    }
}
