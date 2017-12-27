import express from 'express';
import controller from '../controllers';

const router = express.Router();
// user Routes
router.post('/signup', controller.create);
router.post('/signin', controller.signin);

export default router;
