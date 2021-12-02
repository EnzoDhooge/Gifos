require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();



router.get('/', async(req, res) => {

    const instance = axios.create({
        baseURL: `https://api.giphy.com/v1/gifs/trending`,
        params: {
            'api_key': process.env.GIPHY_KEY,
            'limit': 40,
            'rating': 'pg-13'
        }
    });

    const resp = instance.get();
    const gif = await resp.then(val => (val.data.data.map(elem => ({
        url: elem.images.original.url,
        id: elem.id
    }))));
    
    res.render('home', {gif});
});



router.get('/category/:categoria', async(req, res) => {

    const { categoria } = req.params;

    const instance = axios.create({
        baseURL: `https://api.giphy.com/v1/gifs/search`,
        params: {
            'api_key': process.env.GIPHY_KEY,
            'q': `${categoria}`,
            'limit': 40,
            'offset': 0,
            'rating': 'pg-13',
            'lang': 'en'
        }
    });

    const resp = instance.get();
    const gif = await resp.then(val => (val.data.data.map(elem => ({
        url: elem.images.original.url,
        id: elem.id
    }))));
    
    res.render('gif/list-all', {
        categoria,
        gif
    });

});



router.post('/buscar', async(req, res) => {

    const { search } = req.body;

    const instance = axios.create({
        baseURL: `https://api.giphy.com/v1/gifs/search`,
        params: {
            'api_key': process.env.GIPHY_KEY,
            'q': `${search}`,
            'limit': 40,
            'offset': 0,
            'rating': 'pg-13',
            'lang': 'en'
        }
    });

    const resp = instance.get();
    const gif = await resp.then(val => (val.data.data.map(elem => ({
        url: elem.images.original.url,
        id: elem.id
    }))));

    res.render('gif/list-all', {
        categoria: search,
        gif
    });

});



router.get('/more/:id', async(req, res) => {

    const { id } = req.params;

    const instance = axios.create({
        baseURL: `https://api.giphy.com/v1/gifs/${id}`,
        params: {
            'api_key': process.env.GIPHY_KEY
        }
    });

    const resp = instance.get();
    const info = await resp.then(val => ({
        url: val.data.data.url
    }));

    res.redirect(info.url);

});



module.exports = router;