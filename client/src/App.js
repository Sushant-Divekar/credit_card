import React, { createContext, useReducer } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import CreditCards from './components/CreditCards';
import ShowCards from './components/ShowCards';
import DetailsOfCard from './components/DetailsOfCard';
import UpdateAmount from './components/UpdateAmount';
import DeleteCard from './components/DeleteCard';
import {initialState , reducer} from '../src/reducer/UseReducer'

//import ErrorPage from './components/ErrorPage'

//1)contextAPI
export const userContext = createContext();

const Routing = () =>{
  return(
    
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/creditcard" element={<CreditCards />} />
      <Route path="/showcards" element={<ShowCards />} />
      {<Route path="/carddetails/:id" element={<DetailsOfCard />} />}
      {<Route path="/updateamount/:cardId" element={<UpdateAmount/>} />}
      {<Route path="/deletecard/:cardId" element={<DeleteCard/>} />}

    </Routes>
  
  );
  
};

const App = () => {

  const [state , dispatch ] = useReducer(reducer , initialState)
  
  return (
    
      <>
        <userContext.Provider value={{state , dispatch}}>
      
          <Navbar />
          <Routing/>
          
        </userContext.Provider>
      </>
      
    
  );
}

export default App;
/*<Route  element={<ErrorPage />} />*/
