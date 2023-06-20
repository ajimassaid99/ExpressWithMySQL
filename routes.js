const router = require('express').Router();

// array kosong untuk menyimpan produk dan artikel
let products = [];
let articles = [];

router.get('/', (req, res) => {
    res.send({
        status: 'Success',
        message: 'Welcome',
    });
});

router.get('/product', (req, res) => {
    res.send({
        products
    });
});

router.get('/product/:id', (req, res) => {
    const {id} = req.params;
    const product = products.find(p => p.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({message: 'Product not found'});
    }
});

router.post('/product', (req, res) => {
    const {name, price, description} = req.body;
    const id = products.length + 1;
    const product = {id, name, price, description};
    products.push(product);
    res.json(product);
});

router.get('/article', (req, res) => {
    res.send({
        articles
    });
});

router.get('/article/:id', (req, res) => {
    const {id} = req.params;
    const article = articles.find(a => a.id === id);
    if (article) {
        res.json(article);
    } else {
        res.status(404).json({message: 'Article not found'});
    }
});

router.post('/article', (req, res) => {
    const {title, content} = req.body;
    const id = articles.length + 1;
    const article = {id, title, content};
    articles.push(article);
    res.json(article);
});

router.get('/:category/:tag', (req, res) => {
    const {category, tag} = req.params;
    res.json({
        category,
        tag
    });
});

module.exports = router;