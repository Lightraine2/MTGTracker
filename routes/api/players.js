const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
// @ route POST api/players
// @ desc Test route (get player data to render into table)
// @ Access - actually we wont have token based auth yet. Just basic auth
router.post('/', 
[
    check('name', 'Name is required')
    .not()
    .isEmpty(),
    check('wins', 'Scores are required')
    .not()
    .isEmpty(),
    check('losses', 'Scores are required')
    .not()
    .isEmpty(),
    check('draws', 'Scores are required')
    .not()
    .isEmpty()

], 
(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    } else

    res.send('Players Submitted!');
});

module.exports = router;