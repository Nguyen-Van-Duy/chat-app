// import React, { useState } from 'react';
import './login.css'
import axios from 'axios'

const Login = () => {
    // const [valueRegister, setDataRegister] = useState([])
    const handleRegister = async (e) => {
        e.preventDefault();
        // console.log(e.target[0].value);
        const result = await axios.post('http://localhost:5000/account/user', {
            userName: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value
        })
        console.log(result);
    }
    return (
        <div className="body">
            <div className="main">  	
            <input type="checkbox" id="chk" aria-hidden="true" />

                <div className="signup">
                    <form onSubmit={handleRegister}>
                        <label htmlFor="chk" aria-hidden="true">Sign up</label>
                        <input type="text" name="txt" placeholder="User name" required="" />
                        <input type="email" name="email" placeholder="Email" required="" />
                        <input type="password" name="pswd" placeholder="Password" required="" />
                        <button type="submit">Sign up</button>
                    </form>
                </div>

                <div className="login">
                    <form>
                        <label htmlFor="chk" aria-hidden="true">Login</label>
                        <input type="email" name="email" placeholder="Email" required="" />
                        <input type="password" name="pswd" placeholder="Password" required=""/>
                        <button>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;