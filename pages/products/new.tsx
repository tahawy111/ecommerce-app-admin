import Input from '@/components/Input';
import Layout from '@/components/Layout';
import ProductForm from '@/components/ProductForm';
import { IFormEvent, InputChange } from '@/types/typescript';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

interface newProps {

}

const NewProduct: FC<newProps> = ({ }) => {
    const head = <Head>
        <title>EcommerceAdmin - New Product</title>
    </Head>;
    const [goToProducts, setGoToProducts] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        _id: "",
        title: "",
        price: 0,
        description: "",
        images: [],
        category: "",
        properties: undefined
    });
    const handleInputChange = ({ target }: InputChange) => {
        setFormData((v: any) => ({ ...formData, [target.name]: target.validity.valid ? target.value : v[target.name] }));
    };
    const router = useRouter();
    const descId = Date.now().toString();
    if (goToProducts) router.push('/products');


    return <Layout head={head}>
        <h1>New Product</h1>
        <ProductForm productInfo={formData} />
    </Layout>;
};

export default NewProduct;