import Layout from '@/components/Layout';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { IProduct } from '@/models/Product';
import { UilPlus, UilEdit, UilTrashAlt } from '@iconscout/react-unicons';
import { Tooltip } from '@mui/material';
import AlertConfirm from 'react-alert-confirm';
import { handleDeleteImage } from '@/lib/imageUpload';

interface productsProps {

}

const Products: FC<productsProps> = ({ }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    axios.get('/api/products').then((res) => setProducts(res.data.products));
  }, []);
  return <Layout>
    <Tooltip title='Add new product' arrow>
      <Link href={`/products/new`} className='btn-primary p-4 rounded-lg flex w-fit my-3'>
        <UilPlus color="white" size="30" />
      </Link>
    </Tooltip>

    <table className='basic'>
      <thead>
        <tr>
          <th>Product Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product: IProduct) => (
          <tr key={product._id}>
            <td>{product.title}</td>
            <td className="flex items-center">
              <Tooltip title="Edit This Product" arrow>
                <Link className="inline-block" href={`/products/edit/${product._id}`}><UilEdit className='text-yellow-500' /></Link>
              </Tooltip>
              <Tooltip title="Delete This Product" arrow>
                <button className="inline-block" onClick={async () => {
                  const [isOk] = await AlertConfirm("Are You Sure To Delete?");
                  if (isOk) {
                    product.images.forEach((img: any) => {
                      handleDeleteImage(img.public_id);
                    });
                    const res = await axios.delete(`/api/products?_id=${product._id}`);

                    setProducts((await axios.get("/api/products")).data.products);

                  }
                }}><UilTrashAlt size="26" className='text-red-500' /></button>
              </Tooltip>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

  </Layout>;
};

export default Products;