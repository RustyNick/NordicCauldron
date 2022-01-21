import React from 'react'

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount = () => {
        fetch('/api/user')
            .then(res => res.json())
            .then(users => this.setState({ users }, () => console.log('Users fetched...', users)));
    }
    render() {
        return (
            <div>
                <h2>Users</h2>
                {this.state.users.map(user =>
                    <div key={user.id}>
                        <h2>
                            {user.username}
                        </h2>
                    </div>
                )}
            </div>
        )
    }
}
export default Profile;

