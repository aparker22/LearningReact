const express = require('express');
const app = express();
let path = require('path');

const blogs = [
    {id: '1', title: 'Learning React is Easy!', author: 'Ashley Parker', date: '4-11-18', body: `We've learned what React is NOT.  Now learn what it IS.`, image: 'https://images.readwrite.com/wp-content/uploads/2018/03/React-components.png'},
    {id: '2', title: 'Yeah, but can you use vim?', author: 'Nick Wilson', date: '4-11-18', body: `I like to create complicated files that no one can access.`, image: './pokemon.jpg'},
    {id: '3', title: 'How to write blog posts', author: 'Jonathan Martin', date: '4-11-18', body: `Mountains are nice.  I like to take pictures of them.`, image: 'https://www.worldatlas.com/r/w728-h425-c728x425/upload/b8/98/20/640px-primo-piano-del-monte-bianco-al-lago-di-pietra-rossa.jpg'},
    {id: '4', title: 'Headshots for Free', author: 'Tigbemileke Ojo', date: '4-11-18', body: `Hold this light.  Hold this board.  Voila!  A picture!`, image: 'http://proppms.com/wp-content/uploads/2013/10/Prop-PMS-Photo.jpg'},
]

app.use(express.static('static'));
 
app.get('/blogs', function(req, res) {
    res.send(blogs);
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + 'static/index.html'));
});

app.listen(3000);

