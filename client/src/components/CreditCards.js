import React, { useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';


const CreditCards = () => {
    const {userId} = useParams();
    const token = localStorage.getItem('token');
    const history = useNavigate();
    

    const [user ,  setUser] = useState({
        cardOwnerName : "",
        cardNumber :"",
        expiryMonth :"",
        expiryYear: "",
        cvv : "",
        userID: userId,
       
    });

    let name;
    let value;

    const handleInputs = (e) =>{
        console.log(e);
        name = e.target.name;
        value = e.target.value

        setUser({...user , [name]:value})
    }

    const PostData = async (e) =>{
        e.preventDefault();

        const {cardOwnerName , cardNumber , expiryMonth , expiryYear , cvv , userID } = user;

        const res = await fetch(`/add_card` ,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                'Authorization': `Bearer ${token}`, 
            },
            body : JSON.stringify({
                cardOwnerName , cardNumber , expiryMonth , expiryYear , cvv , userID:userId
            })


        });

        const data = await res.json();

        if(data.status === 422 || !data){
            window.alert("Invalid");
            console.log("Invalid")
        }
        else{
            window.alert("valid");
            console.log("Valid")
            
        }


    }

  return (
    
    <>
    <Container>
    <Container1>
      <form id="card-register-form" method = "POST">
        <Data>
            <label htmlFor='cardOwnerName'style = {{fontWeight : "bold"}}>Card Holder</label>
            <Input type = "text" name = "cardOwnerName" autoComplete='off' id = "cardOwnerName" placeholder='Your Name'
                value = {user.cardOwnerName}
                    onChange = {handleInputs}
                />
        </Data>

        <Data>
        <label htmlFor='cardNumber' style = {{fontWeight : "bold"}}>Card Number</label>
            <Input type = "text" name = "cardNumber" autoComplete='off' id = "cardNumber" placeholder='000-000-000'
                value = {user.cardNumber}
                    onChange = {handleInputs}
                />
        </Data>

        <Data>
        <label htmlFor='expiryMonth'style = {{fontWeight : "bold"}}>Expiry Month</label>
            <Input type = "number" name = "expiryMonth" autoComplete='off' id = "expiryMonth" placeholder='00'
                value = {user.expiryMonth}
                    onChange = {handleInputs}
                />
        </Data>
        <Data>
        
        <label htmlFor='expiryYear'style = {{fontWeight : "bold"}}   >Expiry Year</label>
            <Input type = "number" name = "expiryYear" autoComplete='off' id = "expiryYear" placeholder='0000'
                value = {user.expiryYear}
                    onChange = {handleInputs}
                />
        </Data>

        <Data>
        <label htmlFor='cvv' style = {{fontWeight : "bold"}}>CVV</label>
            <Input type = "number" name = "cvv" autoComplete='off' id = "cvv" placeholder='CVV'
                value = {user.cvv}
                    onChange = {handleInputs}
                />
        </Data>
        

        <button type = "submit" name = "add_card" id = "add_card" value = "add_card"
                        onClick={PostData}
                        style = {{marginLeft : "29%"}}>Add Card</button>
      </form>
      </Container1>
      <NavLink to='/showcards'><button>Show Cards</button></NavLink>
      </Container>
    </>
  )
}




export default CreditCards;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 80%;
    width: 100vw;
    overflow: hidden;
    align-items: center;
    
`;

const Container1 = styled.div`
    display: flex;
    flex-direction: column;
    margin-top:1%;
    
    

`;

const Input = styled.input`

    border-color: black;
    border-width: 2px;
    margin-bottom: 4px;
    height: 50px;
`;

const Data = styled.div`
    display: flex;
    flex-direction: column;
`;

