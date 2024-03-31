const express = require('express');

const PORT = process.env.PORT || 8080;

const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', {title: "hello", message: "world"});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});