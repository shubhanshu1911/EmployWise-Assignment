import React from "react";
import HighlightIcon from '@mui/icons-material/Highlight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login');
  }
  return (
      <header className="navbar" style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        backgroundColor: "#f5ba13",
        padding: "10px 20px",
        gap: "30px"
      }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 style={{ margin: 0 }}>
          <HighlightIcon />
          EmployWise
        </h1>
      </Link>
      <Link to="/users" style={{ textDecoration: 'none', color : 'white' , fontSize : "20px"}}>
        <p style={{ margin: 0 }}>
          users
        </p>
      </Link>

      <Link to="/editUsers" style={{ textDecoration: 'none', color: 'white', fontSize: "20px" }}>
        <p style={{ margin: 0 }}>
          Edit Users
        </p>
      </Link>
      {/* <AccountCircleIcon className="mx-2"/> */}
      {!localStorage.getItem('token') ? (<div className="d-flex">
        <Link to="/login" style={{ textDecoration: 'none' }} className="login btn btn-light text-dark">Login</Link>
        <Link to="/signup" style={{ textDecoration: 'none' }} className=" signup mx-2 btn btn-light text-dark">Sign Up</Link>
      </div>) : (<button onClick={handleLogout} className=" mx-5 btn btn-light text-dark">Logout</button>)}
    </header>
  );
}

export default Header;
