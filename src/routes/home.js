const express = require('express');
const axios = require('axios');
const router = express.Router();


router.get('/', async(req, res) => {

    const instance = axios.create({
        baseURL: process.env.GIPHY_KEY,
        params: {
            'api_key': 'OhxK9YcK6TM8nwR0FDLlpfyFKp0cUc6r',
            'limit': 40,
            'rating': 'pg-13'
        }
    });

    const resp = instance.get();
    const tend = await resp.then(val => (val.data.data.map(elem => (elem.images.original.url))));

    res.render('home', {tend});
});

router.get('/:categoria', (req, res) => {

    const { categoria } = req.params;



});


module.exports = router;