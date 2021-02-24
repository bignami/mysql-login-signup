import express from 'express';
import path from 'path';
import rotuers from './routers/index.js';
import mariadb from './db/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';


const app = express();
const __dirname = path.resolve();
dotenv.config();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(session({
    key: 'sid',
    secret: process.env.sessionSecret,
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:24000*60*60
    }
}));


app.use('/',rotuers);

app.use(express.static(__dirname + '/public'));


mariadb.connect();


app.listen(process.env.serverPort, () => {
    console.log('서버 연결중 ')
})