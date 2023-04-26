import { mongooseConnect } from "@/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    mongooseConnect();
    switch (req.method) {
        case "POST":
            await login(req, res);
            break;
        case "GET":
            // await getProducts(req, res);
            break;
        case "PUT":
            // await updateProduct(req, res);
            break;
        case "DELETE":
            // await deleteProduct(req, res);
            break;
    }
};


