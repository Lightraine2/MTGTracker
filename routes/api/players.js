const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

//Bring in player model
const Player = require('../../models/Player');

// @ route POST api/players
// @ desc       Register user (on second thought, maybe i dont want decklist here) 
// @ Access - public - i guess? I mean, we probably need to provide a registration key to lock it down to only users we want
// 
//  function takes a username, password and decklist  
// 

router.post('/', 
[
    check('name', 'Username is required')
    .not()
    .isEmpty(),
    check('password', 'Password is required')
    .not()
    .isEmpty(),
    check('email', 'email address is required')
    .isEmail()
], 
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    } 

    const {name, email, password} = req.body;


    try {

    // need to check if user is unique

    let player = await Player.findOne({ name });
    
    if (player) {
        res.status(400).json({errors: [{ msg: 'Player exists '}]});
    }

    // Create user

    player = new Player({
        name,
        email,
        password
       
    });

    // encrypt password

    const salt = await bcrypt.genSalt(10);

    player.password = await bcrypt.hash(password, salt);

    await player.save();

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

// @ route GET /api/players
// @desc    Login User / Returning JWT Token
// @access  Public

router.get('/', (req, res) => {
    res.send('This is the players route')
});

// router.post('/login', (req, res) => {
//     const { errors, isValid } = validateLoginInput(req.body);
  
//     // Check Validation
//     if (!isValid) {
//       return res.status(400).json(errors);
//     }
  
//     const email = req.body.email;
//     const password = req.body.password;
  
//     // Find user by email
//     User.findOne({ email }).then(user => {
//       // Check for user
//       if (!user) {
//         errors.email = 'User not found';
//         return res.status(404).json(errors);
//       }
  
//       // Check Password
//       bcrypt.compare(password, user.password).then(isMatch => {
//         if (isMatch) {
//           // User Matched
//           const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload
  
//           // Sign Token
//           jwt.sign(
//             payload,
//             keys.secretOrKey,
//             { expiresIn: 3600 },
//             (err, token) => {
//               res.json({
//                 success: true,
//                 token: 'Bearer ' + token
//               });
//             }
//           );
//         } else {
//           errors.password = 'Password incorrect';
//           return res.status(400).json(errors);
//         }
//       });
//     });
//   });
  

module.exports = router;