import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const NavBar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const logoutHandler = event => {
        auth.logout();
        history.push('/');
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1" >
                <NavLink to="/" className="brand-logo right">Short links</NavLink>
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li><NavLink to={'/create'}>Create</NavLink></li>
                    <li><NavLink to={'/links'}>Links</NavLink></li>
                    <li><NavLink to='/' onClick={logoutHandler}>Sign out</NavLink></li>

                </ul>
            </div>
        </nav>
    )
}
