const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


router.get('/:platform/:gamertag', async (req, res) => {
    try{
        const headers = {
            'TRN-Api-Key': process.env.TRACKER_API_KEY
        }
        const {platform, gamertag} = req.params;

        //using node-fetch to make the request
        const response = await fetch (`${process.env.TRACKER_API_URL}/profile/${platform}/${gamertag}`, {
            headers
        });

        //takes the response, turns it into json
        const data = await response.json();

        //check for error array and if present set status to 404 with custom message
        if(data.errors && data.errors.length > 0){
            return res.status(404).json({
                message: 'Profile Not Found'
            });
        }

        //display json if no error array was tetected
        res.json(data);

        }
    catch (err){
        console.error(err);
        res.status(500).json({
            message: "Server Error"
        });
    }
});

module.exports = router;