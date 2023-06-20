const express = require('express');
const app = express();
const router = require('./routes');
const log = require('./middlewares/logger');

app.use(log);
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(router);
app.use((req,res,next)=>{
    res.send({
        status:'Failed',
        massage: 'Resource ' + req.originalUrl + '  Not Found'
    });
});

app.listen(3000, () => console.log('Server is running on http://localhost:3000'));