import Link from "next/link";
import {useQuery} from "@apollo/react-hooks";
import {CURRENT_USER} from "./post-form";
import Alert from "./alert";
import Router from "next/router";
import {useState} from "react";

export default function Navigation() {
    const {loading, userError, data} = useQuery(CURRENT_USER);
    const [, setUser] = useState(null);

    const logout = () => {
        localStorage.clear();
        setUser(null);
        Router.push('/login');
    };

    if (!loading && !userError) {
        const {currentUser} = data ? data : {currentUser: null};
        return (
            <div className="row">
                <div className="col-md-12 text-left">
                    <nav className="navbar navbar-dark bg-dark justify-content-start">
                        <Link href="/">
                            <a className="navbar-brand">Home</a>
                        </Link>
                        <ul className="navbar-nav mr-3">
                            <li className="nav-item">
                                <Link href="/posts">
                                    <a className="nav-link">Posts</a>
                                </Link>
                            </li>
                        </ul>
                        {currentUser ? (
                                <>
                                    <ul className="navbar-nav mr-3">
                                        <li className="nav-item">
                                            <Link href="#">
                                                <a className="nav-link" onClick={logout}>Logout</a>
                                            </Link>
                                        </li>
                                    </ul>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <Link href="#">
                                                <a className="nav-link">{currentUser.login}</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </>
                            ) :
                            (
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link href="/login">
                                            <a className="nav-link">Login</a>
                                        </Link>
                                    </li>
                                </ul>
                            )}
                    </nav>
                </div>
            </div>
        )
    }
    return userError ? <Alert message={userError.message}/> : <b>Loading....</b>
}
