import React from 'react';
import { useParams } from 'react-router-dom';

const DeleteCard = ({/* cardId */}) => {
    const { cardId } = useParams();
    const handleDeleteCard = async () => {
        try {
            const response = await fetch(`/delete_card/${cardId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                // Handle success (e.g., show a success message)
                console.log('Card deleted successfully');
            } else {
                // Handle error (e.g., show an error message)
                console.error('Error deleting card');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <button onClick={handleDeleteCard}>Delete Card</button>
        </div>
    );
};

export default DeleteCard;
