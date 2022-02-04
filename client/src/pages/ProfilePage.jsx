import React from 'react'
import LoginForm from '../components/LoginForm';
import '../index.css'


class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
        };
        this.LoginTest = this.props.LoginTest

    }
    render() {
        return (
            <div className='profile-container'>
                {(this.props.user.name !== "") ? (
                    <div>
                        <h2>Welcome <span>{this.props.user.name}</span></h2>

                        <button className="logInAndOut-button" onClick={() => { this.props.logout() }}>Logout</button>
                    </div>
                ) : (
                    <LoginForm createAccount={this.props.createAccount} LoginTest={this.props.LoginTest} error={this.props.error} />
                )
                }


            </div>
        )
    }
}
export default ProfilePage;