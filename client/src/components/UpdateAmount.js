import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const UpdateAmount = () => {

    const { cardId } = useParams();
    const [currentAmount, setCurrentAmount] = useState(50000); // Initialize with 0 or fetch from server
    const [deductionAmount, setDeductionAmount] = useState('');
    const [newAmount, setNewAmount] = useState(currentAmount);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch current amount from your API based on cardId
        const fetchCurrentAmount = async () => {
            try {
                const response = await fetch(`/getcard/${cardId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });

                if (response.ok) {
                    const cardDetails = await response.json();
                    setCurrentAmount(cardDetails.amount); // Set the current amount from the server
                    setNewAmount(cardDetails.amount);
                    setLoading(false);
                } else {
                    console.error('Error fetching card amount');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };

        fetchCurrentAmount();
    }, [cardId]);

    const handleUpdateAmount = async () => {
        try {
            // Calculate the new amount by deducting the deduction amount
            const deduction = parseInt(deductionAmount, 10);

        // Check if deductionAmount is a valid number and not greater than the current amount
        if (!isNaN(deduction) && deduction >= 0 && deduction <= currentAmount) {
            // Calculate the new amount by deducting the deduction amount
            const updatedAmount = currentAmount - deduction;

            const response = await fetch(`/update_amount/${cardId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ amount: updatedAmount })
            });

            if (response.ok) {
                // Handle success (e.g., show a success message)
                console.log('Amount updated successfully');
                setNewAmount(updatedAmount); // Update the new amount in the state
                setDeductionAmount(''); // Clear the deduction input field
                setCurrentAmount(updatedAmount);
            } else {
                // Handle error (e.g., show an error message)
                console.error('Error updating amount');
            }
        }else{
            console.error('Invalid deduction amount');
        }
        } catch (error) {
            console.error('Error:', error);
        }
    };

  return (
    <>
      <div>
                <p>Current Amount: {currentAmount}</p>
                <input
                    type="number"
                    placeholder="Deduction Amount"
                    value={deductionAmount}
                    onChange={(e) => setDeductionAmount(e.target.value)}
                />
                <button onClick={handleUpdateAmount}>Update Amount</button>
                <p>New Amount: {newAmount}</p>
            </div>
    </>
  )
}

export default UpdateAmount

/*

import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const UpdateAmount = () => {

    const { cardId } = useParams();
    const [newAmount, setNewAmount] = useState('');

    const handleUpdateAmount = async () => {
        try {
            const response = await fetch(`/update_amount/${cardId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ amount: newAmount })
            });

            if (response.ok) {
                // Handle success (e.g., show a success message)
                console.log('Amount updated successfully');
            } else {
                // Handle error (e.g., show an error message)
                console.error('Error updating amount');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

  return (
    <>
      <div>
            <input
                type="number"
                placeholder="New Amount"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
            />
            <button onClick={handleUpdateAmount}>Update Amount</button>
        </div>
    </>
  )
}

export default UpdateAmount
*/