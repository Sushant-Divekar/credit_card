const express = require('express');
const router = express.Router();
require('../db/conn');
const Card = require("../model/CardSchema");
const verifyToken = require('../middleware/cardauth');
const now = new Date;
const timestamp = now.toUTCString();


router.post(`/add_card` ,verifyToken, async (req , res) =>{
    //const userId = req.params.userId;
    //const userId = req.body.userId;
    const userId = req.user._id;

    

    const {cardOwnerName , cardNumber , expiryMonth , expiryYear , cvv  } = req.body
    
    if(!cardOwnerName || !cardNumber || !expiryMonth || !expiryYear || !cvv ){
        return res.status(422).json({error:"plz filled the field properly"});
    }

    //res.send("card add ho gaya");
    //res.json({message: req.body});

    try{

        const cardExist = await Card.findOne({cardNumber:cardNumber});

        if(cardExist){
            return res.status(422).json({error : "Card already Exist"});
        }
        else{
            // const date = new Date();
            // const  timestamp = date.toUTCString();
            const card = new Card({cardOwnerName , cardNumber , expiryMonth , expiryYear , cvv , userID:userId , time:timestamp})

            //hash

            const cardRegister = await card.save(); 

            if(cardRegister){
                res.status(201).json({message: "card register successfully"})
            }
            else{
                res.status(500).json({error : "fail to register"})
            }
        }
        

        

    }catch(err){
        console.log(err);
    }
    
    
});



// Apply your authentication middleware
//router.use(verifyToken);
router.get('/getcards',verifyToken, async (req, res) => {
    //const userId = req.params.userId;
    console.log('Route accessed');

    try {
        //const userId = req.params.userId;
        const userId = req.user._id;
        console.log("hello");
        console.log(userId);
        const userCards = await Card.find({ userID : userId });

        console.log('User Cards:', userCards);

        console.log(JSON.stringify(userCards));
        res.status(200).json(userCards);
        //res.json({userCards});
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch cards' });
    }
});

router.get(`/cards/:id` ,verifyToken, async (req, res) => {
    try {
      const card = await Card.findById(req.params.id);
      
      if (!card) {
        return res.status(404).json({ error: 'Card not found' });
      }
      
      res.status(200).json(card);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });



  //Update Amount Route
  // Add a new PUT route for updating the amount of a card
router.put(`/update_amount/:cardId`, verifyToken, async (req, res) => {
    try {
        // Get the card ID from the route parameter
        const cardId = req.params.cardId;
        
        // Get the new amount value from the request body
        const { amount } = req.body;

        // Find the card by ID
        const card = await Card.findById(cardId);

        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }

        // Update the amount field
        card.amount = amount;

        // Save the updated card
        const updatedCard = await card.save();

        res.status(200).json(updatedCard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a card by ID
router.delete('/delete_card/:cardId', verifyToken, async (req, res) => {
    try {
        // Get the card ID from the route parameter
        const cardId = req.params.cardId;

        // Find and delete the card by ID
        const deletedCard = await Card.findByIdAndDelete(cardId);

        if (!deletedCard) {
            return res.status(404).json({ error: 'Card not found' });
        }

        res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});



module.exports = router;