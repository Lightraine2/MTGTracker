const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const Player = require('../../models/Player')
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');


// @ route GET api/auth
// @ desc Test route (jwt authentication)
// @ Access - public

router.get('/', auth, async (req, res) => {
  try {
    const player = await Player.findById(req.player.id).select('-password');
    res.json(player);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  } 
  
});


// @ route POST api/auth
// @ desc    Authenticate user & get token
// @ Access - public 
// 


router.post('/', 
[
    check('name', 'Name is required')
    .not()
    .isEmpty(),
    check('password', 'Password is required')
    .not()
    .isEmpty()
], 

async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    } 

    const {name, password} = req.body;


    try {

    // need to check if user is unique

    let player = await Player.findOne({ name });
    
    if (!player) {
        res.status(400).json({errors: [{ msg: 'Authentication Failed'}]});
    }

    // Check creds

    const isMatch = await bcrypt.compare(password, player.password);

    if(!isMatch) {
      res.status(400).json({errors: [{ msg: 'Authentication Failed'}]});
    }

    // return jwt

    const payload = {
        player: {
            id: player.id
        }
    };

    jwt.sign(
        payload, 
        config.get('jwtSecret'),
        // this should be 3600 for an hour
        { expiresIn: 360000 },
        (err, token) => {
            if(err) throw err;
            res.json({ token });
        });        
    
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');   
    }
    


});


module.exports = router;