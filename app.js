import express from 'express';
import path from 'path';
import rotuers from './routers/index.js';
import mariadb from './db/db.js';
import dotenv from 'dotenv';




const app = express();
const __dirname = path.resolve();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended : true}));

dotenv.config();

app.use('/',rotuers);

app.use(express.static(__dirname + '/public'));


mariadb.connect();


app.listen(process.env.serverPort, () => {
    console.log('서버 연결중 ')
})