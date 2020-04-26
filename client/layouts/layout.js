import Head from 'next/head'
import Navigation from "../components/navigation";
import PropTypes from 'prop-types';

const Layout = ({children}) => {
    return (
        <div className="container-fluid m-0 p-0">
            <Head>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                      crossOrigin="anonymous"/>
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
            </Head>
            <Navigation/>
            {children}
        </div>
    )
};

Layout.propTypes = {
    children: PropTypes.any
};

export default Layout;
