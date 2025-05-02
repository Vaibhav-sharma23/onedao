import * as ProductRepo from '../repository/product.repository.js';
import ResponseHandler from "../../../../../utils/response/ResponseHandler.js";
import ResponseStatus from "../../../../../utils/response/ResponseStatus.js";

export const create = async (req, res) => {
    try {
        const product = await ProductRepo.createProduct(req.body);
        return ResponseHandler.success(res, product, 'Product created', ResponseStatus.SUCCESS.CREATED);
    } catch (err) {
        return ResponseHandler.error(res, err.message);
    }
};

export const list = async (_req, res) => {
    try {
        const products = await ProductRepo.getAllProducts();
        return ResponseHandler.success(res, products);
    } catch (err) {
        return ResponseHandler.error(res, err.message);
    }
};

export const detail = async (req, res) => {
    try {
        const product = await ProductRepo.getProductById(req.params.id);
        if (!product) return ResponseHandler.error(res, 'Not found', 404);
        return ResponseHandler.success(res, product);
    } catch (err) {
        return ResponseHandler.error(res, err.message);
    }
};

export const update = async (req, res) => {
    try {
        const product = await ProductRepo.updateProduct(req.params.id, req.body);
        return ResponseHandler.success(res, product, 'Product updated');
    } catch (err) {
        return ResponseHandler.error(res, err.message);
    }
};

export const remove = async (req, res) => {
    try {
        const deleted = await ProductRepo.deleteProduct(req.params.id);
        if (!deleted) return ResponseHandler.error(res, 'Not found', 404);
        return ResponseHandler.success(res, null, 'Product deleted');
    } catch (err) {
        return ResponseHandler.error(res, err.message);
    }
};
