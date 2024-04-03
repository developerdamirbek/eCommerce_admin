import { Button, Form, Input, Card, Select, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useGetSubcategories } from '../../subcategory/service/query/useGetSubcategory';
import { useState } from 'react';
import { usePostAttribute } from '../../subcategory/service/mutation/usePostAttrribute';

const { Option } = Select;

export interface Attribute {
    title: string;
    category: number[];
    values: string[];
}

interface Payload {
    attr_list: Attribute[];
}

export const AttributeCreate = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const { data } = useGetSubcategories();
    const { mutate: postAttribute } = usePostAttribute();

    const [selectedCategories, setSelectedCategories] = useState<number[] >([]);

    const handleCategoryChange = (selectedValues) => {
        setSelectedCategories(selectedValues);
        console.log(selectedValues);
        
    };

    const onFinish = (values: any) => {
        const payload: Payload = {
            attr_list: values.items.map((item: any) => ({
                title: item.name,
                category: selectedCategories,
                values: item.subItems.map((subItem: any) => subItem.value)
            }))
        };

        postAttribute(payload, {
            onSuccess: () => {
                form.resetFields();
                navigate('/app/attributes');
                message.success("Attribute created!");
            }
        })
    };

    return (
        <div>
            <Form
                layout='vertical'
                form={form}
                name="dynamic_form_complex"
                style={{ maxWidth: 600 }}
                autoComplete="off"
                onFinish={onFinish}
                initialValues={{ items: [{ name: '', subItems: [{ value: '' }] }] }}
            >
                <Form.Item
                    name="parentCategory"
                    label="Parent Category"
                    rules={[{ required: true, message: 'Please select parent category' }]}
                >
                    <Select
                        value={selectedCategories}
                        placeholder="Select parent category"
                        onChange={handleCategoryChange}
                        mode="multiple"
                    >
                        {data?.map((item) => (
                            <Option key={item.id} value={item.id}>
                                {item.title}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.List name="items">
                    {(fields) => (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {fields.map((field) => (
                                <Card
                                    size="small"
                                    title={`Item`}
                                    key={field.key}
                                    style={{ marginBottom: '16px' }}
                                >
                                    <Form.Item label="Name" name={[field.name, 'name']} style={{ marginBottom: '10px', width: 300 }}>
                                        <Input />
                                    </Form.Item>

                                    <Form.List name={[field.name, 'subItems']}>
                                        {(subFields, subOpt) => (
                                            <div style={{display: "flex",width: 300, flexDirection: "column", gap: 20}}>
                                                {subFields.map((subField) => (
                                                    <div key={subField.key} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                                                        <Form.Item name={[subField.name, 'value']} style={{ marginBottom: '0', flex: 1 }}>
                                                            <Input placeholder="Value" />
                                                        </Form.Item>
                                                        <MinusCircleOutlined
                                                            onClick={() => {
                                                                subOpt.remove(subField.name);
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                                <Button
                                                    type="dashed"
                                                    onClick={() => subOpt.add()}
                                                    icon={<PlusOutlined />}
                                                    block
                                                >
                                                    Add Sub-item
                                                </Button>
                                            </div>
                                        )}
                                    </Form.List>
                                </Card>
                            ))}
                        </div>
                    )}
                </Form.List>
                <Button type='primary' htmlType='submit'>
                    Submit
                </Button>
            </Form>
        </div>
    );
};
