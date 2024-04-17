import React from 'react';
import { Form, Upload, Button, Input, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { usePostCategory } from '../service/mutation/usePostCategory';

interface SubcategoryFormProps {
    parentCategoryId: number | null;
}



export const SubcategoryForm: React.FC<SubcategoryFormProps> = ({ parentCategoryId }) => {

    const navigate = useNavigate()
    const { mutate } = usePostCategory()

    const handleFormSubmit = (values: {
        id: number,
        title: string,
        parent: number,
        image: {
            file: File,
            fileList: FileList
        }
    }
    ) => {


        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('parent', String(parentCategoryId) || '');
        if (values.image && (values.image.file instanceof File)) {
            formData.append("image", values.image.file);
        }

        mutate(formData, {
            onSuccess: () => {
                message.success("Subcategory created successfully!");
                navigate("/app/category")
            }
        })

    };

    return (
        <Form
            name="subcategory-form"
            onFinish={handleFormSubmit}
            autoComplete="off"
            layout="vertical"
            className='subcategory_form'
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
                valuePropName="fileList"
                getValueFromEvent={(e) => e.fileList}
            >
                <Upload.Dragger
                    listType='picture-card'
                    name="image"
                    action="/upload"
                    beforeUpload={() => false}
                    className='upload'
                    multiple={false}
                    maxCount={1}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Upload.Dragger>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
