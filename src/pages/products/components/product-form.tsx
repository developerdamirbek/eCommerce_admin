import React from 'react';
import { Button, Form, Input, Select, Space, Switch, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useGetSubcategories } from '../../subcategory/service/query/useGetSubcategory';
import { usePostProduct } from '../service/mutation/usePostProduct';

const { Option } = Select;

interface Category {
    id: number;
    title: string;
}

interface ProductFormData {
    category: number[];
    is_available: boolean;
    is_new: boolean;
    title: string;
    price: string;
    image?: {
        file: File;
    };
}



export const ProductForm: React.FC = () => {
    const { data } = useGetSubcategories();
    const {mutate} = usePostProduct();

    const [form] = Form.useForm();

    const onFinish = async (values: ProductFormData) => {
        try {
            const formData = new FormData();
            formData.append('category', String(values.category));
            formData.append('is_available', String(values.is_available));
            formData.append('is_new', String(values.is_new));
            formData.append('title', values.title);
            formData.append('price', values.price);
            
            // Check if image field is present and is a file
            if (values.image && values.image.file instanceof File) {
                const file = values.image.file;
                formData.append('image', file);
            }
    
            await mutate(formData);
            message.success('Product created successfully');
            form.resetFields();
        } catch (error) {
            message.error('Failed to create product');
        }
    };
    
    

    return (
        <Form
            style={{ width: 600 }}
            layout='vertical'
            name="productForm"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
            encType="multipart/form-data" 
        >
            {data && (
                <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Please select category!' }]}
                >
                    <Select
                        placeholder="Parent Category"
                    >
                        {data.map((category: Category) => (
                            <Option key={category.id} value={category.id}>
                                {category.title}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            )}
            <Space>
                <Form.Item
                    name="is_available"
                    label="Is Available"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
                <Form.Item
                    name="is_new"
                    label="Is New"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
            </Space>
            <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please input title!' }]}
            >
                <Input placeholder='Title' />
            </Form.Item>
            <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: 'Please input price!' }]}
            >
                <Input type="number" placeholder="Price" />
            </Form.Item>
            <Form.Item
                label="Upload"
                name="image"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                        return e;
                    }
                    return e && e.fileList;
                }}
                rules={[{ required: true, message: 'Please upload image!' }]}
            >
                <Upload.Dragger name="files" multiple={false}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Upload.Dragger>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

// Custom hook for post product mutation
