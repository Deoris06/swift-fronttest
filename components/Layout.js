import React from 'react'
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, logout } from '../helpers/auth';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Script from 'next/script';

// import Script from 'next/script';
Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Layout = ({ children }) => {
    const head = () => (
        <React.Fragment>
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
             <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" 
             rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" 
             crossOrigin="anonymous" />
            <link rel="stylesheet" href="/static/css/styles.css" />
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossOrigin="anonymous"/>
            <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap" rel="stylesheet"/>
            <Script src="https://kit.fontawesome.com/168a7e912d.js" crossOrigin="anonymous"/>
        </React.Fragment>
    );

    const nav = () => (
        <ul className="nav nav-tabs bg-white">
            <li className="nav-item">
                <Link href="/" legacyBehavior>
                    <a className="nav-link text-dark">Home</a>
                </Link>
            </li>

            <li className="nav-item">
                <Link href="/user/link/create" legacyBehavior>
                    <a className="nav-link text-dark btn btn-success" style={{ borderRadius: '0px' }}>
                        Get Link
                    </a>
                </Link>
            </li>

            {!isAuth() && (
                <React.Fragment>
                    <li className="nav-item">
                        <Link href="/login" legacyBehavior>
                            <a className="nav-link text-dark">Login</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/register" legacyBehavior>
                            <a className="nav-link text-dark">Register</a>
                        </Link>
                    </li>
                </React.Fragment>
            )}

            {isAuth() && isAuth().role === 'admin' && (
                <li className="nav-item ml-auto">
                    <Link href="/admin" legacyBehavior>
                        <a className="nav-link text-dark">{isAuth().name}</a>
                    </Link>
                </li>
            )}

            {isAuth() && isAuth().role === 'subscriber' && (
                <li className="nav-item ml-auto">
                    <Link href="/user" legacyBehavior>
                        <a className="nav-link text-dark">{isAuth().name}</a>
                    </Link>
                </li>
            )}

            {isAuth() && (
                <li className="nav-item">
                    <a onClick={logout} className="nav-link btn btn-danger">
                        Logout
                    </a>
                </li>
            )}

        </ul>
    );

    return (
        <React.Fragment>
            {head()} {nav()} <div className="">{children} 
           
            </div>
        </React.Fragment>
    );
};

export default Layout;
