import React, { useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { usePostBanner } from './service/mutation/usePostBanner';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface BannerPostType {
    title: string,
    image?: File,
    description: string
}

export const CreateBanner: React.FC = () => {
    const [form] = Form.useForm();
    const { mutate } = usePostBanner();
    const [description, setDescription] = useState<string>('');

    const onFinish = async (values: BannerPostType) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', description);
        if (values.image) {
            formData.append('image', values.image);
        }

        mutate(formData, {
            onSuccess: () => {
                form.resetFields();
                setDescription(''); // Reset description state
                message.success('Banner created successfully');
            },
            onError: (error) => {
                message.error(error.message);
            },
        });
    };

    return (
        <Form form={form} layout='vertical' name="createBannerForm" onFinish={onFinish}>
            <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please input the title!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="image"
                label="Image"
                valuePropName="fileList"
                rules={[{ required: true, message: 'Please upload an image!' }]}
            >
                <Upload.Dragger
                    name="image"
                    multiple={false}
                    beforeUpload={() => false}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Upload.Dragger>
            </Form.Item>
            <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please input the description!' }]}
            >
                <ReactQuill
                style={{height: 200, marginBottom: 20}}
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Create Banner
                </Button>
            </Form.Item>
        </Form>
    );
};
