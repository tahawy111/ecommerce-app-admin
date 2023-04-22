// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { mongooseConnect } from '@/lib/mongoose';
import Product from '@/models/Product';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getError } from './../../lib/getError';
import { isAdminRequest } from './auth/[...nextauth]';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  mongooseConnect();
  await isAdminRequest(req, res);
  switch (req.method) {
    case "POST":
      await createProduct(req, res);
      break;
    case "GET":
      await getProducts(req, res);
      break;
    case "PUT":
      await updateProduct(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
      break;
  }
};

const createProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, description, price, images, category, properties } = req.body;
  try {
    const product = await Product.create({ title, description, price: parseInt(price), images, category, properties });
    res.json(product);
  } catch (error) {
    res.json({ err: getError(error) });
  }
};
const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.query?.id) {
      const product = await Product.findById(req.query?.id);
      res.json({ product });
    } else {
      const products = await Product.find();
      res.json({ products });
    }
  } catch (error) {
    res.json({ err: getError(error) });
  }
};
const updateProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await Product.findByIdAndUpdate(req.body._id, req.body, { new: true });
    res.json(true);
  } catch (error) {
    res.json({ err: getError(error) });
  }
};
const deleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await Product.findByIdAndDelete(req.query._id);
    res.json(true);
  } catch (error) {
    res.json({ err: getError(error) });
  }
};