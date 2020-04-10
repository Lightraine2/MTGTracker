const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

// @ route POST api/players
// @ desc Test route (get player data to render into table)
// @ Access - actually we wont have token based auth yet. Just basic auth
// For this post, we want to update scores, decks, avatar, idk. 

router.put('/', 
[
    check('name', 'Name is required')
    .not()
    .isEmpty(),
    check('decklist', 'MTG Goldfish Tournament decklist is required')
    .not()
    .isEmpty()
], 
(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    } else
    
    res.send('Player Added!');
});

router.get('/',
(req, res) => {
    res.send('Players Route');
});


module.exports = router;