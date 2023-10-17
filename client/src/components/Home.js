import React, { useEffect, useState }  from 'react'
import styled from 'styled-components'
import Contact from './Contact';
//import './Homecss.css'
import addcard from '../images/addcard.png';
import addcard1 from '../images/addcard.png';
import compensation from '../images/compensation.png';
import higher from '../images/higher.png';
import cyber_security from '../images/cyber-security.png'
import cardbg from '../images/cardbg2.jpg'

const Home = () => {
  const [userName , setUserName] = useState("");
  const [show , setShow] = useState(false)

  const userHomePage = async () => {
    try{
      const res = await fetch('/getdata' , {
        method : "GET",
        headers : {
          "Content-Type" : "application/json"
        },
      });

      const data = await res.json();
      console.log(data);
      setUserName(data.name);
      setShow(true);

    }catch(err){
      //console.log(err)
    }
  }

  useEffect(() =>{
    userHomePage();
  }, []);
  
  return (
    <>
      <Container className="half-and-half-container">
      <Container1 className="split-div"></Container1>
      <Container2 className="overlapping-text">
        <Header1>Welcome</Header1>
        <Header2>{userName}</Header2>
        <Header3>{show ? `Managing Credit Cards with Ease` : 'If you are new then please Register otherwise Login'}</Header3>
        <Box>
          <Box1>
            <Img src = {cyber_security}></Img>
            <Text>Secure Way To Handle</Text>
          </Box1>
          <Box2>
            <Img src = {compensation}></Img>
            <Text>Efficient Way To Manage </Text>
          </Box2>
          <Box3>
            <Img src = {addcard1}></Img>
            <Text>Simply Add Credit Card</Text>
          </Box3>
        </Box>
      </Container2>
    </Container>
    </>
  )
}

export default Home

const Container = styled.div`
  /* background-image: url(${cardbg}); */
  position: relative;
  display: flex;
  height: 100vh;
  max-height: 91.1vh; 
  overflow: hidden;
  box-sizing: border-box;

`;

const Container1 = styled.div`
    flex: 1;
    /* background: linear-gradient(to right, #ADC4CE 50%, #EEE0C9 50%); */
    background-image: url(${cardbg});
    background-size: cover; 
    background-repeat: no-repeat;
    background-position: center center;
    opacity: 0.7;
    z-index: 1;
    box-sizing: border-box;
    padding: 0; 
    margin: 0;
`;

const Container2 = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  z-index: 2;
  box-sizing: border-box;
  padding: 20px; /* Add padding to avoid text being too close to edges */
  max-width: 80%;
`;

const Header1 = styled.p`
  padding-bottom : 10px;
  color : #1450A3;
  font-family: 'Arial Black';
  font-weight: bold;
  font-size: 20px;
  
`;

const Header2 = styled.h1`
  padding-bottom : 10px;
  color : black;
`;

const Header3 = styled.h4`
color : black;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  /* background-color: blue; */
  width : 140%;
  margin-left: -20%;
  margin-top: 25%;
  
`;

const Box1 = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 50px;
  
  
`;
const Box2 = styled.div`
  padding-left: 50px;
  padding-right:50px;
`;
const Box3 = styled.div`
  padding-left: 50px;
`;

const Text = styled.p`
  margin-top: 10%;
  color:white;
  font-weight:bold;
  font-size: large;
`;

const Img = styled.img`
  width : 70px;
  height: auto;
`;
