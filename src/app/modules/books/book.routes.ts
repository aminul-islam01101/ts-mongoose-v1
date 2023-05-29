import express from 'express';
import { getAllBooksByGenre } from './book.controllers';

const router = express.Router();

router.get('/:genre', getAllBooksByGenre);

export default router;
