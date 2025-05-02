import express from 'express';
import * as ProductController from '../controller/product.controller.js';
import { authenticate } from '../../../../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',authenticate, ProductController.create);
router.get('/',authenticate, ProductController.list);
router.get('/:id',authenticate, ProductController.detail);
router.put('/:id',authenticate, ProductController.update);
router.delete('/:id',authenticate, ProductController.remove);

export default router;
