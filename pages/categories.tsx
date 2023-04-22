import Input from '@/components/Input';
import Layout from '@/components/Layout';
import { ICategory } from '@/models/Category';
import { startLoading, stopLoading } from '@/redux/features/global';
import { AppDispatch } from '@/redux/store';
import { IFormEvent, InputChange } from '@/types/typescript';
import { UilEdit, UilTrashAlt } from '@iconscout/react-unicons';
import { Tooltip } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import AlertConfirm from 'react-alert-confirm';
import { useDispatch } from 'react-redux';

interface CategoriesProps {

}
export interface IProperty {
    name: string, values: any;
}
interface formDataProps {
    name: string;
    parentCategory: string;
    properties: IProperty[];
}

const Categories: FC<CategoriesProps> = ({ }) => {
    const defaultFormData = {
        name: "",
        parentCategory: "0",
        properties: []
    };
    const [formData, setFormData] = useState<formDataProps>(defaultFormData);
    console.log(formData);
    const [editedCategory, setEditedCategory] = useState<ICategory>();
    console.log({ editedCategory });

    const dispatch: AppDispatch = useDispatch();
    const [categories, setCategories] = useState<ICategory[]>([]);

    async function saveCategory(e: IFormEvent) {
        e.preventDefault();
        dispatch(startLoading());
        const data = { _id: editedCategory?._id, name: formData.name, parent: formData.parentCategory, properties: formData.properties.map(({ name, values }) => ({ name, values: values.split(',') })) };
        if (editedCategory) {
            await axios.put(`/api/categories`, data);
            setEditedCategory(undefined);
        } else {
            await axios.post(`/api/categories`, data);
        }
        dispatch(stopLoading());
        setFormData({ ...formData, ...defaultFormData });
        setCategories((await axios.get(`/api/categories`)).data.categories);
    };

    const handleInputChange = ({ target }: InputChange) => {
        setFormData((v: any) => ({ ...formData, [target.name]: target.validity.valid ? target.value : v[target.name] }));
    };

    useEffect(() => {
        // Fetch categories
        axios.get(`/api/categories`).then(res => setCategories(res.data.categories));
    }, []);

    function addProperty() {
        setFormData({ ...formData, properties: [...formData.properties, { name: '', values: '' }] });
    }
    function handlePropertyNameChange(index: any, property: any, newName: any) {
        const properties = [...formData.properties];
        properties[index].name = newName;
        setFormData({ ...formData, properties: properties });
    }
    function handlePropertyValuesChange(index: number, property: IProperty, newValues: any) {
        const properties = [...formData.properties];
        properties[index].values = newValues;
        setFormData({ ...formData, properties: properties });
    }
    function removeProperty(indexToRemove: number) {
        const properties = formData.properties.filter((_prop: IProperty, index: number) => indexToRemove !== index);

        setFormData({ ...formData, properties });
    }
    return <Layout>
        <div className="flex gap-1">
            <h1>Categories</h1>
        </div>
        <form onSubmit={saveCategory}>
            <div className="flex gap-1">
                <Input className='flex-nowrap m-0' name='name' value={formData.name} onChange={handleInputChange} placeholder={editedCategory ? `Edit Category (${editedCategory.name})` : "New Category Name"} />
                <select onChange={handleInputChange} value={formData.parentCategory} className='my-6' name="parentCategory">
                    <option value="0">No parent category</option>

                    {categories.length > 0 && categories.map((category: ICategory) => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}

                </select>
            </div>


            <div className="mb-2">
                <label className='block' htmlFor="">Properties</label>
                <button onClick={addProperty} type='button' className='btn-default text-sm'>Add New Property</button>
            </div>

            {formData.properties.length > 0 && formData.properties.map((property: IProperty, index: number) => (
                <div key={index} className='flex gap-1'>
                    <input type="text" onChange={(e) => handlePropertyNameChange(index, property, e.target.value)} value={property.name} placeholder='Property name (example: color)' />
                    <input type="text" onChange={(e) => handlePropertyValuesChange(index, property, e.target.value)} value={property.values} placeholder='Values, comma separated' />
                    <button onClick={() => removeProperty(index)} type='button' className='btn-red text-sm mb-2'>Remove</button>

                </div>
            ))}
            <div className="flex gap-1">
                <button type='button' onClick={() => {
                    setEditedCategory(undefined);
                    setFormData({ ...formData, ...defaultFormData });
                }} className={`btn-danger h-fit ${editedCategory ? "block" : "hidden"}`}>Cancel</button>
                <button className='btn-primary h-fit'>Save</button>
            </div>
        </form>

        <table className='basic mt-4'>
            <thead>
                <tr>
                    <th>Category Name</th>
                    <th>Parent Category</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {categories.length > 0 && categories.map((category: ICategory) => (
                    <tr key={category._id}>
                        <td>{category.name}</td>
                        <td>{(category.parent as ICategory)?.name}</td>
                        <td className="flex items-center">
                            <Tooltip title="Edit This Category" arrow>
                                <button className="inline-block" onClick={() => {
                                    setFormData({
                                        ...formData, properties: category.properties.map(({ name, values }: any) => ({
                                            name,
                                            values: values.join(`,`)
                                        })), name: category.name, parentCategory: category.parent ? (category.parent as ICategory)._id : "0"
                                    });
                                    setEditedCategory(category);
                                }}><UilEdit className='text-yellow-500' /></button>
                            </Tooltip>
                            <Tooltip title="Delete This Category" arrow>
                                <button className="inline-block" onClick={async () => {
                                    const [isOk] = await AlertConfirm("Are You Sure To Delete?");
                                    if (isOk) {
                                        await axios.delete(`/api/categories?_id=${category._id}`);
                                        setCategories((await axios.get("/api/categories")).data.products);
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

export default Categories;