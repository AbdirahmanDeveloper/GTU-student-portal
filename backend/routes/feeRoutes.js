import express from 'express';
import { getFees} from '../controllers/feeController.js';

const router = express.Router();

router.get('/fees/:reg_number', getFees);

export default router;