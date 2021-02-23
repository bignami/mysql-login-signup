import express from 'express';
import main from './main/main.js';
import signUp from './signup/signUp.js';
import login from './login/login.js';

const router = express.Router();


router.use('/',main);
router.use('/signUp',signUp);
router.use('/login',login);

export default router;