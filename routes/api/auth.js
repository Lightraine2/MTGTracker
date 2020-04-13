// maybe we'll do a JWT auth at some point

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Player = require('../../models/Player')

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

module.exports = router;