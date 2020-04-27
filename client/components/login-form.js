import React, {useState} from "react";
import axios from 'axios';
import Alert from "./alert";
import getConfig from "next/config";

const {
    publicRuntimeConfig: {API_URL}
} = getConfig();

export default function LoginForm() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const query = `
         query {
            createUser(login: "${login}", password: "${password}") {
                    id
                    login
                    password
             }
        }
    `;

    const onCreateUser = () => {
        if (login && password) {
            axios.post(API_URL, {query})
                .then(() => setIsSubmitted(true))
                .catch(setError);
        }
    };

    return (
        <>
            {error ? <Alert size='col-md-6' message='Please refresh page' type='alert-danger'/> : null}
            <div className='row justify-content-center'>
                <div className="col-md-12 text-center">
                    <h2>Login form</h2>
                </div>
                <div className="col-md-4">
                    <form>
                        <div className="form-group text-center">
                            <label htmlFor="login">Login</label>
                            <input type="text" className="form-control" id="login" required={true} value={login}
                                   onChange={event => setLogin(event.target.value.trim())}/>
                        </div>
                        <div className="form-group text-center">
                            <label htmlFor="login">Password</label>
                            <input type="password" className="form-control" id="password" required={true}
                                   value={password}
                                   onChange={event => setPassword(event.target.value.trim())}/>
                        </div>
                        <div className="form-group">
                            <button type='submit' className='btn btn-lg btn-success mr-2'>Login</button>
                            <button type='button' className='btn btn-lg btn-info mr-2'
                                    onClick={onCreateUser}>Registration
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
