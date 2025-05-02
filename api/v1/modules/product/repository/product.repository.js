import { db } from "../../../../../database/models/index.js";

const { Product } = db;

export const createProduct = async (data) => {
  const { name, price } = data;
  if (!name || price === undefined) {
    throw new Error("Product name and price are required.");
  }
  if (isNaN(price)) {
    throw new Error("Price must be a valid number.");
  }

  return await Product.create(data);
};

export const getAllProducts = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  const { rows, count } = await Product.findAndCountAll({
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });

  return {
    products: rows,
    pagination: {
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    },
  };
};

export const getProductById = async (id) => {
  if (!id) throw new Error("Product ID is required.");
  const product = await Product.findByPk(id);
  if (!product) throw new Error("Product not found.");
  return product;
};

export const updateProduct = async (id, data) => {
  const product = await Product.findByPk(id);
  if (!product) throw new Error("Product not found.");

  await product.update(data);
  return product;
};

export const deleteProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) throw new Error("Product not found.");
  
  await product.destroy();
  return true;
};
