import react, { Component } from 'react';

class Login extends react.Component {

    /*     constructor(props) {
            super(props);
            this.state = {
                users: []
            }
        } */



    componentDidMount = (props) => {
        fetch('/api/user')
            .then(res => res.json())
            .then(users => this.setState({ users }, () => {
                console.log('Users fetched...', users)
                console.log("this props =>", this.props)
            }

            ));


    }

    render() {
        /*  console.log(
             "Details =>", this.props.details,
         )
         console.log(
             "users =>", this.state.users
 
         ) */
        /* if (this.props.details.email === this.state.users.email && this.props.details.password === this.state.users.password) {
            console.log('logged in', this.props.details)
        } else {
            console.log("details do not match")
        } */

        return (
            console.log('hello')
        ) /* <div>

            <h2>login test</h2>
            { {this.state.users.map(user =>
                <div key={user.id}>{user.name}</div>
            )}}
        </div>; */

    }
}

export default Login;
