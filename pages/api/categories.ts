import { getError } from '@/lib/getError';
import { mongooseConnect } from '@/lib/mongoose';
import Category from '@/models/Category';
import type { NextApiRequest, NextApiResponse } from 'next';
import { isAdminRequest } from './auth/[...nextauth]';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await isAdminRequest(req, res);
    mongooseConnect();
    switch (req.method) {
        case "POST":
            await createCategory(req, res);
            break;
        case "GET":
            await getCategories(req, res);
            break;
        case "PUT":
            await updateCategory(req, res);
            break;
        case "DELETE":
            await deleteCategory(req, res);
            break;
    }
}

async function createCategory(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { name, parentCategory, properties } = req.body;
        const dataToCreate: any = { name };
        if (parentCategory !== "0") dataToCreate.parent = parentCategory;
        if (properties.length > 0) dataToCreate.properties = properties;
        const category = await Category.create(dataToCreate);
        res.status(201).json({ category });
    } catch (error) {
        res.json({ err: getError(error) });
    }

}

async function getCategories(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.query?.id) {
            const category = await Category.findById(req.query?.id);
            res.json({ category });
        } else {
            const categories = await Category.find().populate("parent");
            res.json({ categories });
        }
    } catch (error) {
        res.json({ err: getError(error) });
    }
}

async function updateCategory(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { name, parentCategory, _id, properties } = req.body;
        console.log(properties);
        const dataToUpdate: any = { name };
        if (parentCategory !== "0") dataToUpdate.parent = parentCategory;
        if (properties.length > 0) dataToUpdate.properties = properties;
        console.log(dataToUpdate);



        const category = await Category.findByIdAndUpdate(_id, dataToUpdate, { new: true });

        console.log(category);


        res.status(201).json({ category });
    } catch (error) {
        res.json({ err: getError(error) });
    }
}

const deleteCategory = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await Category.findByIdAndDelete(req.query._id);
        res.json(true);
    } catch (error) {
        res.json({ err: getError(error) });
    }
};