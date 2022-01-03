const express = require('express');
const app = express();

const port = process.env.PORT || 8000;

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
