import { useState } from 'react';
import { Form, Select, Upload, Button, message, Tabs, Input } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { usePostCategory } from '../category/service/mutation/usePostCategory';
import { useGetCategory } from '../category/service/query/useGetCategory';
import './style.scss';
import { CreateAttribute } from './components/createAttribute';

const { Option } = Select;
const { TabPane } = Tabs;

export const CreateSubcategory = () => {
    const [form] = Form.useForm();
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [subcategoryID, setSubcategoryID] = useState<number | null>(null); 
    const [activeTab, setActiveTab] = useState("subcategory");
    const postCategoryMutation = usePostCategory();
    const { mutate: postSubcategory, isPending: isCategoryPending } = postCategoryMutation;
    const { data: categoryOptions, isError: isCategoryError } = useGetCategory();

    const handleCategoryChange = (value: number) => {
        setSelectedCategory(value);
    };

    const handleFormSubmit = (values: any) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('image', values.image[0].originFileObj);
        formData.append('parent', selectedCategory!.toString());
    
        postSubcategory(formData, {
            onSuccess: (data) => { 
                message.success('Subcategory created successfully!');
                form.resetFields();
                setActiveTab("attribute");
                setSubcategoryID(data.data?.id);
                console.log(data);
                
            },
            onError: (error) => {
                console.error('Error creating subcategory:', error);
                message.error('Failed to create subcategory');
            }
        });
    };

    if (isCategoryError) 
     message.error("Something went wrong!");

     
    return (
        <div>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
                <TabPane tab="Subcategory" key="subcategory">
                    <Form form={form} onFinish={handleFormSubmit} layout="vertical">
                        <Form.Item
                            name="category"
                            label="Parent Category"
                            rules={[{ required: true, message: 'Please select a parent category' }]}
                        >
                            <Select onChange={handleCategoryChange}>
                                {categoryOptions?.map((category: any) => (
                                    <Option key={category.id} value={category.id}>
                                        {category.title}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="title"
                            label="Title"
                            rules={[{ required: true, message: 'Please input the title' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="image"
                            label="Image"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => e.fileList}
                            rules={[{ required: true, message: 'Please upload an image' }]}
                        >
                            <Upload.Dragger
                                name="file"
                                multiple={false}
                                beforeUpload={() => false}
                                accept="image/*"
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            </Upload.Dragger>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" loading={isCategoryPending} htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab="Attribute" key="attribute" disabled={!subcategoryID}>
                    <CreateAttribute subcategoryID={subcategoryID}/> 
                </TabPane>
            </Tabs>
        </div>
    );
};

