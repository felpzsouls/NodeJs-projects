const express = require('express'),
    app = express();

app.set('view engine', 'pug'); //Set your favorite Hypertext Markup language.
app.set('views', __dirname + '/public'); //Set the folder where you will have the files with the hypertext markup language 
app.use(express.static(__dirname + '/public/static')); //Set the static folder

for(let x of ['router']) require('./handlers/router')(app);

app.listen(80, () => console.log('site online'))
