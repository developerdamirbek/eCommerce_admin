import React, { useState } from 'react';
import { Button, Form, Image, Input, InputNumber, Select, Space, Switch, Upload, UploadFile, UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useGetSubcategories } from '../../subcategory/service/query/useGetSubcategory';

interface ProductFormData {
    category: string;
    id: number,
    is_available: boolean;
    is_new: boolean;
    title: string;
    price: string;
    image?: {
        file: File;
        fileList: FileList
    };
}

interface ProductProps {
    submit: (data: ProductFormData) => void,
    loading: boolean,
    initailValue?: {
        id: number;
        title: string;
        image: {
            file: File;
            fileList: FileList
        };
        price: string;
        is_available: boolean;
        category: string;
        is_new: boolean;
    }
}

export const ProductForm: React.FC<ProductProps> = ({ submit, loading, initailValue }) => {

    const { data } = useGetSubcategories()
    const [fileList, setFileList] = useState<UploadFile[]>([])

    const onchange: UploadProps["onChange"] = ({ fileList }) => {
        setFileList(fileList)
    }

    return (
        <Form
            style={{ width: 600 }}
            layout='vertical'
            name="productForm"
            initialValues={initailValue}
            onFinish={submit}
            autoComplete="off"
            encType="multipart/form-data"
        >
            <Form.Item
                label="Category"
                name="category"
                hidden={initailValue ? true : false}
                rules={[{ required: true, message: 'Please select category!' }]}
            >
                <Select
                    placeholder="Parent Category"
                    options={data?.map((item: any) => ({
                        value: item.id,
                        label: item.title
                    }))}
                >
                </Select>
            </Form.Item>
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
                <InputNumber<number>
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                    style={{ width: '100%' }}
                />
            </Form.Item>
            <Form.Item
                label="Upload"
                name="image"
                rules={[{ required: true, message: 'Please upload image!' }]}
            >
                <Upload.Dragger listType='picture-card'
                    name="image"
                    action="/upload"
                    fileList={fileList}
                    beforeUpload={() => false}
                    className='upload'
                    onChange={onchange}
                    multiple={false}
                    maxCount={1}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Upload.Dragger>

            </Form.Item>
            {initailValue && !fileList.length && (
                <Image width={100} src={typeof initailValue.image == "string" ? initailValue.image : ''} />
            )}
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" loading={loading} htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};