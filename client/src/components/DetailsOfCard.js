import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

const DetailsOfCard = ({/* cards*/ }) => {

    const { id } = useParams();
  const [card, setCard] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch card details by ID from your API
    fetch(`/cards/${id}`)
      .then(response => response.json())
      .then(data => {
        setCard(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [id]);


    /*const { cardId } = useParams(); // Get cardId from route parameter

    // Find the card with the matching cardId
    console.log(`card id : ${cardId}`)

    if (!cards || cards.length === 0) {
        return <div>No cards found.</div>;
    }

    const card = cards.find((card) => card._id === cardId);

    if (!card) {
        return <div>Card not found.</div>;
    }*/
    return (
    <>
        <div>
      <h2>Card Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Card Owner: {card.cardOwnerName}</p>
          <p>Card Number: {card.cardNumber}</p>
          <p>Expiry Month: {card.expiryMonth}</p>
          <p>Expiry Year: {card.expiryYear}</p>
          <p>CVV: {card.cvv}</p>
          <p>Amount : {card.amount}</p>
        </>
      )}
    </div>
    </>
  )
}

export default DetailsOfCard
