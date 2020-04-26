import Link from "next/link";

export default function Navigation() {
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
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link href="/login">
                                <a className="nav-link">Login</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
