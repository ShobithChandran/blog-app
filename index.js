const express = require('express');
// const cors = require('cors');
const ArticleInfo = require('./src/model/BlogDB');



// Object initialization
const app = express();
// app.use(cors());
// For Post Method
//instead of body parser, use this to read data from body for post method
//body means in the site, white space like comments we write
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const path = require('path')
app.use(express.static('./build/'));

// Basic Article Fetch Route (Back-end Routing)
app.get('/api/article/:name', (req, res) => {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    try {
        const articleName = req.params.name;
        ArticleInfo.findOne({ name: articleName })
            .then(function (article) {
                res.status(200).json(article);
            })
    }
    catch (error) {
        res.status(500).json({ message: 'Error', eroor });
    }
});





// Upvotes Routing
app.post('/api/article/:name/upvotes', (req, res) => {
    const articleName = req.params.name;
    const filter = { name: articleName };
    const update = { $inc: { upvotes: 1 } };
    ArticleInfo.findOneAndUpdate(filter, update, { new: true })
        .then(function (article) {
            res.json(article);
        })
})


// Comments Routing
app.post('/api/article/:name/comments', (req, res) => {
    const articleName = req.params.name;
    const { username, text } = req.body;
    const filter = { name: articleName };
    const update = { $push: { comments: { username, text } } };
    ArticleInfo.findOneAndUpdate(filter, update, { new: true })
        .then(function (article) {
            res.json(article);
        })
})



app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'))
   });


// Port number
app.listen(5001, () => {
    console.log("Listening on port 5001");
})