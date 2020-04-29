import React, {useEffect, useState} from "react";
import {useMutation} from '@apollo/react-hooks';
import {gql} from "apollo-server-core";
import Alert from "./alert";
import Router from "next/router";


export const CREATE_USER = gql`
    mutation createUser($login: String, $password: String) {
        createUser(login: $login, password: $password) {
            token
        }
    }
`;

export const LOGIN = gql`
    mutation login($login:String, $password:String) {
        login(login: $login, password: $password) {
            token
        }
    }
`;

export default function LoginForm() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [createUser, {data}] = useMutation(CREATE_USER);
    const [loginUser, {loginData}] = useMutation(LOGIN);

    useEffect(() => {
        if (isSubmitted) {
            Router.push('/posts')
        }
    }, [isSubmitted]);

    const onCreateUser = () => {
        if (login && password) {
            createUser({variables: {login, password}})
                .then(saveTokenFn)
                .catch(setErrorFn);
        }
    };

    const onLogin = () => {
        if (login && password) {
            loginUser({variables: {login, password}})
                .then(saveTokenFn)
                .catch(setErrorFn);
        }
    };

    const saveTokenFn = val => {
        const {token} = val.data.login ? val.data.login : val.data.createUser;
        localStorage.setItem('token', token);
        setIsSubmitted(true);
    };

    const setErrorFn = error => {
        console.error(error);
        setError(error);
    };

    return (
        <>
            {error ? <Alert message={error?.message}/> : ''}
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
                            <button type='button' className='btn btn-lg btn-success mr-2' onClick={onLogin}>
                                Login
                            </button>
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
