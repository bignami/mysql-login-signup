import express from 'express';
import mariadb from '../../db/db.js'
import crypto from 'crypto';
const router = express.Router();

router.get('/',(req, res) => {
    res.render('./login/login')
})

router.post('/', async(req, res) => {
    console.log(req.body);
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;
    console.log(userEmail)

    mariadb.query('select userName,userKey,userPassword from user where email=?', [userEmail], async(err, data) => {
0
       
        
      
        if(data.length > 0) {

            const ddPassword = await crypto.pbkdf2Sync(userPassword, data[0].userKey, 10000, 64, 'sha512').toString('base64');
            if(data[0].userPassword === ddPassword) {
                res.send(data[0].userName +"님 어서오세요");
            }
            else {
                res.send("님 이메일이랑 비번 틀렸어요");
            }
        }
        
        
    })

})

export default router;