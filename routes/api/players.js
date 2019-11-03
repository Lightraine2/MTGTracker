const express = require('express');
const router = express.Router();

// @ route GET api/players
// @ desc Test route (get player data to render into table)
// @ Access - actually we wont have token based auth yet. Just basic auth
router.get('/', (req, res) => res.send('Players route'));

module.exports = router;