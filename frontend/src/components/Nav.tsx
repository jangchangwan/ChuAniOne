import { NavLink } from "react-router-dom";

import "./Nav.css";

function Nav() {
  return (
    <nav className="navbar-container">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/intro">Intro</NavLink>
      <NavLink to="/pwd">PasswordFind</NavLink>
      <NavLink to="/search">Search</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Signup</NavLink>
      <NavLink to="/openchat">OpenChat</NavLink>
      <NavLink to="/bigvoca">BigVoca</NavLink>
      <NavLink to="/mypage">Mypage</NavLink>
    </nav>
  );
}
export default Nav;
