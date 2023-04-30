import { mongooseConnect } from '@/lib/mongoose';
import Product from '@/models/Product';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getError } from './../../lib/getError';
import Order from '@/models/Order';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    mongooseConnect();
    switch (req.method) {
        case "POST":
            //   await createProduct(req, res);
            break;
        case "GET":
            await getOrders(req, res);
            break;
        case "PUT":
            //   await updateProduct(req, res);
            break;
        case "DELETE":
            //   await deleteProduct(req, res);
            break;
    }
};

const getOrders = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders)
    } catch (error) {
        res.json({ err: getError(error) });
    }
};
