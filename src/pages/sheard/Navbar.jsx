import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";


const Navbar = () => {
    const {user,signOutUser}=useContext(AuthContext);
    const links =<>
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/taskBoard'>Task Board</NavLink></li>
    </>
    const handelLogOut = ()=>{
        signOutUser()
        .then(res=>{
            alert('user log out')
            console.log(res.user)
        })
        .catch(err=>{
            console.error(err.message)
        })
    }
    return (
        <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Task Management</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end">
    {
        user? <>
        <p>{user.displayName}</p>
        <button className="btn bg-red-400" onClick={handelLogOut}>Log Out</button>
        </>:
        <Link to='/login'><button className="btn bg-gray-600 text-white">Log in</button></Link>
    }
  </div>
</div>
    );
};

export default Navbar;