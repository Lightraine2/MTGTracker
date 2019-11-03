// maybe we'll do a JWT auth at some point

const express = require('express');
const router = express.Router();

// @ route GET api/auth
// @ desc Test route (jwt authentication)
// @ Access - public
router.get('/', (req, res) => res.send('Auth route'));

module.exports = router;