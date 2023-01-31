import React from 'react';
import './Header.css';
import logo from '../../images/Logo.svg'
import { Link } from 'react-router-dom';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Header = () => {
    const [user, loading, error] = useAuthState(auth);

    const[signOut] = useSignOut(auth);
    function handleSignOut(){
        signOut();
    }

    return (
        <div className="header-div">
            <div className="left-div">
                <img src={logo} alt=""/>
            </div>
            <div className="right-div">
                <Link to="/home">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact Us</Link>
                <Link to='/secret'>Secret Page</Link>
                <Link to="/orders">Orders</Link>
                {
                    user ?
                    <a href="#" onClick={handleSignOut}>Log Out</a>
                    :
                    <Link to="/login">Log In</Link>
                }
                
            </div>
        </div>
    );
};

export default Header;