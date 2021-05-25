import express from 'express';
import usersCredentialcontroller from '../controllers/Users.controller';

const router = express.Router();

router.post('/users', usersCredentialcontroller.store);

export { router as UsersRoute };
