const express = require('express');
const router = express.Router();

// Index/Home Page
router.get('/', (req, res) => {
    return res.render('index', {
        title: 'Home Page'  // Render the homepage view
    });
});

module.exports = router;
