import express from 'express';
import mariadb from '../../db/db.js'

const router = express.Router();

router.get('/', (req,res) => {
    mariadb.query('select * from test', (err, rows, fields) => {
        if(!err) {
            console.log(rows);
            res.render('index', {rows})
        } else {
            console.log(err);
            res.send(err);
        }
    });
});

export default router;