import e from 'express';
import express from 'express';
import mariadb from '../../db/db.js'
import crypto from 'crypto';

const router = express.Router();

router.get('/', (req,res) => {
    res.render('./signup/signUp')
});

router.post('/',  async (req,res) => {
    console.log(req.body);

    const email = req.body.email;
    const userName = req.body.userName;
    const userPassword = req.body.userPassword;
    
    

    mariadb.query('select * from user where email= ?',[email], async(err, data)=> {
        const buf = await crypto.randomBytes(64);
        const ddpassword = await crypto.pbkdf2Sync(userPassword, buf.toString('base64'), 10000, 64, 'sha512').toString('base64');
        console.log(email, userName, userPassword,buf.to);
        console.log(data);

        if(data.length === 0)
        {
            mariadb.query('INSERT INTO user (email,userName,userKey,userPassword) VALUES(?,?,?,?)',[email,userName,buf.toString('base64'),ddpassword], (err, data) => {
                console.log(data + "데이터입니다.");
                console.log('회원 데이터 삽입 성공');
            })
        } else if (err){
            console.log(err);
        }
        else {
            res.send("이미 중복된 이메일 입니다.");
        }
        
    })
   
});

export default router;