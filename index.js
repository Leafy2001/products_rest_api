const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    if(req.method === "OPTIONS"){
        res.header("Access=Control-Allow-Methods", 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }

    return next();
});

app.use('/api', require('./routes/index.js'));

app.get('*', function(req, res){
    return res.status(500).json({
        message: "Wrong Path"
    });
});

app.listen(port, function(err){
    if (err){ 
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
