import React from 'react';
import { logout } from './slices/authSlice';
import { useAppDispatch, useAppSelector } from './hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';

function Header () {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useAppSelector((state) => state.auth.user);

    const handleLogout = async () => {
        try {
          await dispatch(logout()).unwrap();
          navigate("/login");
        } catch (e) {
          console.error(e);
        }
    };

    function renderUserEmail() {
        if (user) {
            return (<span className="navbar-brand mb-0 h1">{user.email}</span>);
        }
    }

    function renderLogoutButton() {
        if (user) {
            return (<button className="btn btn-primary" type="submit" onClick={handleLogout}>Logout</button>);
        }
    }

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid d-flex">
                {renderUserEmail()}
                {renderLogoutButton()}
            </div>
        </nav>
    );
}

export default Header;