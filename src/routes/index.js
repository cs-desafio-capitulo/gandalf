import express from 'express';
const router = express.Router();
// user Routes
 router.post('/users',(req,res)=>res.send([
     {
        _id: "56cb91bdc3464f14678934ca",
        name: req.name,
        email:req.email,
        password:req.password, 
        permission:req.permission,
        criate_date:req.criate_date,
        update_date: req.update_date,
        last_login:req.last_login,
        token:'1234567'
     }
     
 ]));
  
export default router;