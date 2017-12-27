var express = require('express');

var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.get('/users', (req, res) => res.send({text:"Hello World!"}));
app.post('/user',(req,res)=>res.send(
    {
       name: 'Default user',
       email:'user@user.com',
       password:'123', 
       permission:'user',
       criate_date:1513958972398,
       update_date:1513958972398,
       last_login:1513958972398,
       token:'1234567'
    }
));
export default app;