import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { NavLink } from 'react-router-dom'
import Logo from '../images/credit-card1.png'
import styled from 'styled-components'
import { userContext } from '../App'

const Navbar = () => {

    const myStyle = {
        
        backgroundColor: '#102C57',
      };

    const {state , dispatch} = useContext(userContext);

    const RenderMenu = () =>{
        if(state){
            return(
                <>
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/contact">Contact</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/logout">Logout</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/creditcard">Add Card</NavLink>
                    </li>
                </>
            )
            
        }
        else{
            return(
            <>
                <li className="nav-item active">
                    <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/about">About</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/contact">Contact</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">Signup</NavLink>
                </li>
                
            </>)
        }
    }


   

  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={myStyle}>
            <NavLink className="navbar-brand" to="/">
                <NavLogo>
                    <Img src= {Logo} alt = ""/>
                    <h3>CardEase</h3>
                </NavLogo>
                
            </NavLink>
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
                
                <RenderMenu/>
            
            </ul>
            
        </div>
        </nav>
    </>
  )
}

export default Navbar

/*<li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </NavLink>
                    /*<div className="dropdown-menu">
                        <NavLink className="dropdown-item" to="#">Action</NavLink>
                        <NavLink className="dropdown-item" to="#">Another action</NavLink>
                        <div className="dropdown-divider"></div>
                        <NavLink className="dropdown-item" to="#">Something else here</NavLink>
                    </div>
                </li>*/

const Img = styled.img`
    width : 40px;
    height : auto;
`;

const NavLogo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

