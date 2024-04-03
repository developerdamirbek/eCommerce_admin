import React from 'react';
import { Button, Card, Form, Input, Select } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

export const AttributeEdit: React.FC = ({ }) => {
    const navigate = useNavigate();

    return (
        <div style={{ maxHeight: 460, overflowY: 'auto' }}>
            <Form
                layout='vertical'
                name="dynamic_form_complex"
                style={{ maxWidth: 600 }}
                autoComplete="off"
                initialValues={{ items: [{ name: '', subItems: [{ value: '' }] }] }}
            >
                <Form.List name="items">
                    {(fields, { }) => (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {fields.map((field) => (
                                <Card
                                    size="small"
                                    key={field.key}
                                    style={{ marginBottom: '16px' }}
                                >
                                    <Form.Item label="Select" name={[field.name, 'select']} style={{ marginBottom: '10px' }}>
                                        <Select mode="multiple" placeholder="Select">
                                            <Option value="option1">Option 1</Option>
                                            <Option value="option2">Option 2</Option>
                                        </Select>
                                    </Form.Item>

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
                        </div>
                    )}
                </Form.List>
                <Button type='primary' htmlType='submit'>
                    Update
                </Button>
            </Form>
        </div>
    );
};
