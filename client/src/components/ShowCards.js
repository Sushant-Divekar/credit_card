import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'


const ShowCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  //const [showDetails, setShowDetails] = useState(false);
  //const userId = localStorage.getItem('userId');
  

  useEffect(() => {
    // Fetch user's cards from your API
    const fetchCards = async () => {
      try {
        
        
        const response = await fetch(`/getcards`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            
          },
        });

        //console.log(await response.text()); // Log the response content

        if (response.ok) {
          //throw new Error('Error fetching user cards');
          const data = await response.json();
          console.log("hello");
          setCards(data); // Set the user's cards in the state
          console.log(data);
          setLoading(false); // Update loading state
          
          
          
        } 
        else {
          // Handle error
          console.error('Error fetching user cards');
          setLoading(false);
        }
        
      } catch (error) {
        // Handle network or other errors
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  return (
    <div>
      <h2>Your Credit Cards</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {cards.map((card) => (
            <li key={card._id} >
                {/*<p>Card Owner: {card.cardOwnerName}</p>*/}
                
                <Container>
                  <p>Card Number: {card.cardNumber}</p>
                </Container>
                {
                  /*<Container>
                  <p>Timestamp : {card.time}</p>
                </Container>*/
                }
                  

                <NavLink to={`/updateamount/${card._id}`}>
                  <button>Pay</button>
                </NavLink>
                <NavLink to={`/carddetails/${card._id}`}>
                  <button>Details</button>
                </NavLink>
                <NavLink to={`/deletecard/${card._id}`}>
                  <button>Delete Card</button>
                </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowCards;
/*'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the user's token*/

const Container  = styled.div`

`;