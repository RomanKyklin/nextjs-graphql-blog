import React, {useState} from "react";
import Alert from "./alert";
import {useMutation} from '@apollo/react-hooks';
import {gql} from "apollo-server-core";


export const CREATE_USER = gql`
    mutation createUser($login: String, $password: String) {
        createUser(login: $login, password: $password) {
            id
            login
            password
        }
    }
`;

export default function LoginForm() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [createUser, {data}] = useMutation(CREATE_USER);

    const onCreateUser = () => {
        if (login && password) {
            createUser({variables: {login, password}});
        }
    };

    return (
        <>
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
