import React, { useEffect, useState, memo } from "react";
import Navbar from "./navbar/Navbar";
import { Link, useLocation } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import useAuth from '../hooks/useAuth';
const Header = () => {
    const [isSticky, setIsSticky] = useState(false);
    const location = useLocation();
    const isLogin = location?.state?.isLogin
    useEffect(() => {
        const handleIsSticky = () => {
            window.scrollY >= 50 ? setIsSticky(true) : setIsSticky(false);
        }
        window.addEventListener("scroll", handleIsSticky);
        return () => {
            window.removeEventListener("scroll", handleIsSticky);
        };
    }, [isSticky]);
    return (
        <>
            <header style={{ backgroundColor: '#148971'}} id="header" className="sticky">
                <div className="navb">
                    <a to="/" className="navbar-title">
                        <span>Thesis Management</span>
                    </a>
                    <nav className="nav_actions">
                        <Navbar role={JSON.parse(localStorage.getItem("userData"))?.role} />
                    </nav>
                    {isLogin || JSON.parse(localStorage.getItem("userData"))?.token ?
                        <UserDropdown /> :
                        <Link to="/login">
                            <div className="btn">Login</div>
                        </Link>
                    }
                </div>
            </header>
        </>
    );
};

export default memo(Header);
