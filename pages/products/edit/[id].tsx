import Layout from '@/components/Layout';
import ProductForm from '@/components/ProductForm';
import { IProduct } from '@/models/Product';
import { Tooltip } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { UilAngleLeftB } from '@iconscout/react-unicons';
import Link from 'next/link';

interface EditProductProps {

}

const EditProduct: FC<EditProductProps> = ({ }) => {
  const router = useRouter();
  const { id } = router.query;
  const [productInfo, setProductInfo] = useState<IProduct>({
    _id: "",
    title: "",
    price: 0,
    description: "",
    images: [],
    category: "",
    properties: {}
  });

  /* 
  useEffect(() => {

    async function fetchData() {
      const { data } = await axios.get(`/api/products?id=${id}`);
      console.log(data);

    }
    if (id !== undefined) {
      fetchData();
    }
  }, [id]);

*/

  useEffect(() => {
    if (id !== undefined) {
      axios.get(`/api/products?id=${id}`).then((res) => setProductInfo(res.data.product));
    }
  }, [id]);
  return <Layout>
    <>
      <Tooltip title="Back To Products" arrow>
        <Link className='btn-primary inline-block py-3 m-1' href={'/products'}><UilAngleLeftB className='w-10 h-10 text-white rounded-lg text-center' /></Link>
      </Tooltip>
      <h1>Edit Product</h1>
      {productInfo && productInfo._id !== "" && <ProductForm productInfo={productInfo} />}
    </>
  </Layout>;
};

export default EditProduct;