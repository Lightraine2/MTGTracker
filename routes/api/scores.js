const express = require('express');
const router = express.Router();

// @ route GET api/profile
// @ desc Test route (get player profile)
// @ Access - actually we wont have token based auth yet. Just basic auth
router.get('/', (req, res) => res.send('scores route'));

module.exports = router;