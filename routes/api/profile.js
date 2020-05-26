const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');;
const User = require('../../models/User');

// @route GET api/profile/me
// @desc  Get current user profile
// @access Private

router.get('/me', auth, async (req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @route POST api/profile
// @desc  Create or update profile
// @access Private

router.post('/', [auth, [
    check('status', 'Status is required')
        .not()
        .isEmpty(),
    check('skills', 'Skills are required')
        .not()
        .isEmpty()
]
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // pull all values out from request body
        // all the open dojo relative info here
        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills
        } = req.body;

        // Build profile object - follow this format
        //init object
        const profileFields = {};
        // user id got from token
        profileFields.user = req.user.id;
        //everything else added like this for basic single string
        if (company) profileFields.company = company;
        if (status) profileFields.status = status;
        //like this for array of strings
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }
        console.log(profileFields.skills);



        try {
            let profile = await Profile.findOne({ user: req.user.id });

            if (profile) {
                //update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );

                return res.json(profile);
            }

            // Create
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    }
);

// @route GET api/profile
// @desc  Get all profiles
// @access Public
// note - I think this should be locked down to dojo admins and associated students. 

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api/profile/user/:user_id
// @desc  Get profile by user ID
// @access Public
// note - I think this should be locked down to dojo admins and associated students. 

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name']);

        if (!profile) return res.status(400).json({ msg: 'Profile not found' });

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});



module.exports = router;

