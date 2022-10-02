import './Header.scss'
import { NavLink } from 'react-router-dom';
import React, { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { ThemeContext } from '../App';


const Header = () => {
  const Theme = useContext(ThemeContext);
  const clientId = "1038695984787-1p4udh37usv0poigeh96bh31l3t0uasr.apps.googleusercontent.com";
  // logout function 
  const logout = () => {
    Theme.setUser(null);
    localStorage.removeItem('user');
  }
  return (
    <header>
      <NavLink to={'/'} className="logo">
        Shop
      </NavLink>
      <div className="menu">
        <nav>
          <div className="sing">
            {
              Theme.user != null ?
                <div className="useer">
                  <div className="avatar">
                    <img src={Theme.user.imageUrl || '/user1.png'} alt="avatar" />
                  </div>
                  <div className="dropmenu">
                    <p> last Login: {
                      Theme.user.lastLogin ? new Date(Theme.user.lastLogin).toLocaleString() : new Date(Theme.user.createdAt).toLocaleString() || 'No login'
                      }</p>
                    <span>{Theme.user.name}</span>
                    {
                      Theme.user.googleId != null ?
                        <GoogleLogout clientId={clientId} buttonText="Logout" onLogoutSuccess={logout} ></GoogleLogout>
                        :
                        <button onClick={logout}> logout</button>
                    }
                  </div>
                </div>
                :
                <div className="singup" >
                  <NavLink to={'/Singup'} className='' >singup </NavLink>
                  <NavLink to={'/Singin'}> singin</NavLink>
                </div>

            }
          </div>
          <div className="fext">
            {
              // if user is admin show admin menu
              Theme.user != null && Theme.user.isAdmin === true ?
                <div className="admin">
                  <NavLink to={'/admin/category'}><span>&#9999;</span> <p>category</p></NavLink>
                  <NavLink to={'/admin/project'}><span>&#9999;</span> <p>project</p></NavLink>
                </div>
                : null
            }
            <NavLink to={'/cart'}> <img src="/cart.png" alt="" /> <span className='cartN'>{Theme.cart.reduce((total, item) => total + item.quantity, 0)}</span></NavLink>
          </div></nav>
      </div>

    </header>
  )
}

export default Header