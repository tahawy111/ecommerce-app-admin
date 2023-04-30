"use client";
import { FC, useEffect, useState } from 'react';
import Input from './Input';
import { IFormEvent, InputChange } from '@/types/typescript';
import axios from 'axios';
import { useRouter } from 'next/router';
import { IProduct, ImgType } from '@/models/Product';
import { UilEditAlt, UilTrashAlt, UilUpload } from '@iconscout/react-unicons';
import Image from 'next/image';
import { handleDeleteImage, imageUpload } from '@/lib/imageUpload';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { startLoading, stopLoading } from '@/redux/features/global';
import { ItemInterface, ReactSortable } from 'react-sortablejs';
import AlertConfirm from 'react-alert-confirm';
import { ICategory } from '@/models/Category';
import { IProperty } from '@/pages/categories';

interface ProductFormProps {
    productInfo: IProduct;
}

const ProductForm: FC<ProductFormProps> = ({ productInfo: { title, description, price, _id, images, category, properties,inStock } }) => {
    const [categories, setCategories] = useState<ICategory[]>();
    // Properties section

    const propertiesToFill: any = [];
    function changeCatProps(newCat: string) {
        console.log({ newCat, formCat: category });

        if (categories && formData.category) {
            console.log("newCat");

            let catInfo: any = categories.find(({ _id }: ICategory) => _id === newCat);
            console.log(catInfo);
            propertiesToFill.push(...catInfo?.properties);
            while (catInfo?.parent?._id) {
                const parentCat: any = categories.find(({ _id }: ICategory) => _id === catInfo.parent._id);
                propertiesToFill.push(...parentCat?.properties);
                catInfo = parentCat;
            }
        }

    }
    const [formData, setFormData] = useState({
        _id,
        title,
        price,
        description,
        images,
        category,
        properties: properties || {},
        inStock,
    });
    console.log(formData);


    const router = useRouter();
    const [goToProducts, setGoToProducts] = useState<boolean>(false);

    const descId = Date.now().toString();
    const inputFileId = Date.now().toString();
    const propInputId = Date.now().toString();
    const inputCategoryId = Date.now().toString();
    const dispatch: AppDispatch = useDispatch();
    const handleInputChange = ({ target }: InputChange) => {
        if (target.name === "category") {
            changeCatProps(target.value);
        }
        setFormData((v: any) => ({ ...formData, [target.name]: target.validity.valid ? target.value : v[target.name] }));
    };
    useEffect(() => {
        axios.get("/api/categories").then((res) => setCategories(res.data.categories));
    }, []);
    async function saveProduct(e: IFormEvent) {
        e.preventDefault();
        dispatch(startLoading());
        let imgsObj = (formData as IProduct).images.filter((ele: ImgType) => typeof ele.url === "string");
        for (let i = 0; i < formData.images.length; i++) {
            if (typeof formData.images[i] !== "string" && !imgsObj.includes(formData.images[i])) {
                const imgUrl = (await imageUpload(formData.images[i].file));
                imgsObj.push(imgUrl);
            }
        }
        if (formData._id) {
            await axios.put('/api/products', { ...formData, images: imgsObj });
        }
        else {
            await axios.post('/api/products', { ...formData, images: imgsObj });
        }
        dispatch(stopLoading());
        setGoToProducts(true);
    }


    async function uploadImage(e: any) {
        setFormData({
            ...formData, [e.target.name]: [...formData.images, {
                preview: URL.createObjectURL(e.target?.files[0]),
                file: e.target?.files[0],
            }]
        });
    }

    const updateImagesOrder = (images: ItemInterface[]) => {
        setFormData({ ...formData, images: images });
    };


    const handlePropertiesChange = (propName: string, value: string) => {
        let prevProps = formData.properties;
        if (prevProps === undefined) {
            prevProps = [{ name: propName, value }];
            setFormData({ ...formData, properties: prevProps });
            return;
        };

        let indexOfProp = -1;
        for (let i = 0; i < prevProps.length; i++) {
            if (propName === prevProps[i].name) {
                indexOfProp = i;
                break;
            }
        }

        if (indexOfProp !== -1) {
            prevProps[indexOfProp].value = value;
            setFormData({ ...formData, properties: prevProps });
            return;
        }

        prevProps.push({ name: propName, value });
        setFormData({ ...formData, properties: prevProps });
    };

    if (goToProducts) router.push('/products');

    return <form onSubmit={saveProduct}>
        {changeCatProps(formData.category as string)}
        <Input placeholder='Product name' name='title' value={formData.title} onChange={handleInputChange} />
        <label>Category</label>
        <select onChange={handleInputChange} value={formData.category as string} className='' name="category">
            <option value="">Uncategorized</option>

            {categories && categories.length > 0 && categories.map((category: ICategory) => (
                <option key={category._id} value={category._id}>{category.name}</option>
            ))}

        </select>

        {propertiesToFill.length > 0 && propertiesToFill.map((p: IProperty, index: number) => (
            <div key={index} className=''>
                <label className='capitalize'>{p.name}</label>
                <select value={formData.properties[index]?.value} onChange={(e) => handlePropertiesChange(p.name, e.target.value)}>
                    {p.values.map((value: string, index: number) => (<option key={index} value={value}>{value}</option>))}
                </select>
            </div>
        ))}

        <label>Photos</label>
        <div className='mb-3 flex items-center flex-wrap-reverse'>
            <a href="http://" target="_blank" rel="noopener noreferrer"></a>
            <div className='flex'>
                <ReactSortable className='py-3 flex gap-3 px-1 flex-wrap' list={formData.images} setList={updateImagesOrder}>
                    {formData.images.map((image: any, index: number) => {

                        return (
                            <div key={index} className='relative group'>
                                <div className="hidden justify-center items-center bg-blue-200/50 w-full h-full rounded-lg absolute group-hover:flex">
                                    <span onClick={async () => {
                                        const [isOk] = await AlertConfirm("Are You Sure To Delete?");
                                        if (isOk) {
                                            const newImgs = formData.images.filter((img: any) => img.url !== image.url || img.preview !== image.preview);
                                            setFormData({ ...formData, images: newImgs });
                                            if (image.public_id) {
                                                handleDeleteImage(image.public_id);
                                                await axios.put('/api/products', { ...formData, images: newImgs });
                                            }
                                            console.log(newImgs);

                                        }
                                    }} className=''><UilTrashAlt size="26" className='text-red-500' /></span>
                                    <a href={image.url || image.preview} target="_blank" rel="noopener noreferrer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-slate-800 font-extrabold">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                        </svg>

                                    </a>
                                </div>
                                <Image className='rounded-lg object-contain border-gray-200 border-4 h-24 bg-white p-1 w-24' src={image.url || image.preview} alt={`images`} width={70} height={70} />
                            </div>
                        );
                    })}
                </ReactSortable>
            </div>
            <label className='cursor-pointer w-24 h-24 border text-center flex flex-col items-center justify-center text-sm gap-1 text-gray-500 rounded-lg hover:bg-gray-200 shadow-md mx-1'><UilUpload />
                <div className="">
                    Upload
                </div>
                <input onChange={uploadImage} type="file" name="images" className='hidden' id={inputFileId} />
            </label>
        </div>


        <label htmlFor={descId}>Description</label>
        <textarea name="description" placeholder='Description' id={descId} defaultValue={formData.description} onChange={handleInputChange}></textarea>
        <Input placeholder={`Price (in ${process.env.CURRENCY})`} name='price' value={formData.price}
            onChange={handleInputChange} pattern='\d+' />
        <Input placeholder='In Stock' name='inStock' value={formData.inStock}
            onChange={handleInputChange} pattern='\d+' />
        <button className='btn-primary mx-1' type='submit'>Save</button>
    </form>;
};

export default ProductForm;
