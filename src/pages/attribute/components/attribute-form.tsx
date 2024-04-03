import React from 'react';
import { Button, Form, Input, Card, Select } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

interface AttributeFormProps {
    data: any[]; 
    selectedCategories: number[]; 
    selectOnChange: (values: number[]) => void;
    initialValues?: any;
    onFinish: (values: any) => void;
}

export const AttributeForm: React.FC<AttributeFormProps> = ({ data, selectedCategories, selectOnChange, initialValues = {}, onFinish }) => {
    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            layout='vertical'
            name="dynamic_form_complex"
            autoComplete="off"
            onFinish={onFinish}
            initialValues={{ ...initialValues, parentCategory: selectedCategories }}
        >
            <Form.Item
                name="parentCategory"
                label="Parent Category"
                rules={[{ required: true, message: 'Please select parent category' }]}
            >
                <Select
                    placeholder="Select parent category"
                    mode="multiple"
                    value={selectedCategories}
                    onChange={(values: any) => selectOnChange(values)} // Update onChange handler
                >
                    {data?.map((item) => (
                        <Option key={item.id} value={item.id}>
                            {item.title}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.List name="items">
                {(fields, { add, remove }) => (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {fields.map((field, index) => (
                            <Card
                                size="small"
                                title={`Item ${index + 1}`}
                                key={field.key}
                                extra={
                                    <MinusCircleOutlined
                                        onClick={() => {
                                            remove(field.name);
                                        }}
                                    />
                                }
                                style={{ marginBottom: '16px' }}
                            >
                                <Form.Item label="Name" name={[field.name, 'name']} style={{ marginBottom: '10px' }}>
                                    <Input />
                                </Form.Item>

                                <Form.Item label="Values" style={{ marginBottom: '0' }}>
                                    <Form.List name={[field.name, 'subItems']}>
                                        {(subFields, subOpt) => (
                                            <div style={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
                                                {subFields.map((subField) => (
                                                    <div key={subField.key} style={{ display: 'flex', alignItems: 'center' }}>
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
                                                <Button type="dashed" onClick={() => subOpt.add()} block>
                                                    + Add Sub-item
                                                </Button>
                                            </div>
                                        )}
                                    </Form.List>
                                </Form.Item>
                            </Card>
                        ))}
                        <Button style={{ marginBottom: 20 }} type="dashed" onClick={() => add()} block>
                            + Add Item
                        </Button>
                    </div>
                )}
            </Form.List>
            <Button type='primary' htmlType='submit'>
                Submit
            </Button>
        </Form>
    );
};
