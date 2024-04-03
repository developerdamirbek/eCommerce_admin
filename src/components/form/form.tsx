import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, UploadProps, Image } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './style.scss';

interface CreateFormProps {
    onFinish: (values: any) => void;
    isLoading?: boolean;
    initialValues?: {
        title?: string;
        image?: string | undefined;
    };
}

export const CreateForm: React.FC<CreateFormProps> = ({ onFinish, initialValues, isLoading }) => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                title: initialValues.title,
                image: initialValues.image
            });
            setImageUrl(initialValues.image as string);
        }
    }, [initialValues, form]);

    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'done') {
            setImageUrl(info.file.response.url);
        }
    };

    return (
        <Form
            form={form}
            name="create-category"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            className='form'
            initialValues={
                {
                    title: initialValues?.title,
                }
            }
        >
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please input the title!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Image"
                name="image"
                rules={[{ required: true, message: 'Please upload an image!' }]}
            >
                <Upload.Dragger
                    listType='picture-card'
                    name="image"
                    action="/upload"
                    beforeUpload={() => false}
                    onChange={handleChange}
                    className='upload'
                    multiple={false}
                    maxCount={1}
                >
                  
                        <>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        </>
                   
                </Upload.Dragger>
                {initialValues?.image ? (
                //@ts-ignore
                <Image src={imageUrl?.url} alt="Uploaded" style={{ width: '100px' }} />

                ) : null}
            </Form.Item>
            <Form.Item>
                <Button type="primary" loading={isLoading} htmlType="submit">
                    {initialValues ? 'Update' : 'Submit'}
                </Button>
            </Form.Item>
        </Form>
    );
};
