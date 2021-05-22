import express from 'express';
import usersCredentialcontroller from '../controllers/UsersCredentialController';

const router = express.Router();

router.post('/users', usersCredentialcontroller.store);

export { router as UsersRoute };
