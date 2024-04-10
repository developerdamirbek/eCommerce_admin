import React from 'react';
import { Button, Form, type FormProps, Input, Select } from 'antd';
import { useGetSubcategories } from '../../subcategory/service/query/useGetSubcategory';

type FieldType = {
    category?: string;
    password?: string;
    remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log('Success:', values);
};

export const ProductForm: React.FC = () => {

    const {data} = useGetSubcategories()
    

    return (
        <Form
            style={{ width: 600 }}
            layout='vertical'
            name="productForm"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Category"
                name="category"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Select
                    placeholder="Parent Category"
                    options={data}
                />
            </Form.Item>

            <Form.Item<FieldType>
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >

            </Form.Item>

            <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
            >

            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
