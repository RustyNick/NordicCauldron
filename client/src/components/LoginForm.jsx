import React, { useState } from 'react';
import '../index.css'
function LoginForm({ LoginTest, error, createAccount }) {
    const [details, setDetails] = useState({ name: "", email: "", password: "" });
    const [newAcc, setNewAcc] = useState({ username: "", email: "", password: "", })


    const submitHandler = e => {
        e.preventDefault();
        LoginTest(details)
    }


    const submitAccountCreation = e => {
        e.preventDefault();
        createAccount(newAcc)

    }

    return (
        <div>

            <form onSubmit={submitHandler}>
                <div className='account-form'>
                    <h2>Login</h2>
                    {(error !== "") ? (<div>{error}</div>) : ""}
                    {/* <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" onChange={e => setDetails({ ...details, name: e.target.value })} value={details.name} />
                </div> */}
                    <div>
                        <label htmlFor="name">Email:</label>
                        <input type="email" name="email" id="email" onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                    </div>
                    <div>
                        <label htmlFor="name">Password:</label>
                        <input type="password" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                    </div>
                    <input className="logInAndOut-button" type="submit" value={"LOGIN"} />
                </div>
            </form>

            <form onSubmit={submitAccountCreation}>
                <div className='account-form'>
                    <h2>Skapa konto</h2>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" id="username" onChange={e => setNewAcc({ ...newAcc, username: e.target.value })} value={newAcc.username} />
                    </div>
                    <div>
                        <label htmlFor="newEmail">email:</label>
                        <input type="email" name="newEmail" id="newEmail" onChange={e => setNewAcc({ ...newAcc, email: e.target.value })} value={newAcc.email} />
                    </div>
                    <div>
                        <label htmlFor="newPassword">password:</label>
                        <input type="password" name="newPassword" id="newPassword" onChange={e => setNewAcc({ ...newAcc, password: e.target.value })} value={newAcc.password} />
                    </div>
                    <input className='logInAndOut-button' type="submit" value={"SKAPA KONTO"} />


                </div>
            </form>
        </div>
    );
}

export default LoginForm;
