import React from 'react';
import { Button, Card, Form, Input, message } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { usePostAttribute } from "../service/mutation/usePostAttrribute";
import { useNavigate } from 'react-router-dom';

interface CreateAttributeProps {
    subcategoryID: number | null;
}

export interface Attribute {
    title: string;
    category: number[];
    values: string[];
}

interface Payload {
    attr_list: Attribute[];
}

export const CreateAttribute: React.FC<CreateAttributeProps> = ({ subcategoryID }) => {
    const [form] = Form.useForm();
    const { mutate: postAttribute } = usePostAttribute();

    const navigate = useNavigate()

    const onFinish = (values: any) => {
        const payload: Payload = {
            attr_list: values.items.map((item: any) => ({
                title: item.name,
                category: [subcategoryID || undefined],
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
        <div style={{ maxHeight: 460, overflowY: 'auto' }}>
            <Form
                layout='vertical'
                form={form}
                name="dynamic_form_complex"
                style={{ maxWidth: 600 }}
                autoComplete="off"
                onFinish={onFinish}
                initialValues={{ items: [{ name: '', subItems: [{ value: '' }] }] }}
            >
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
        </div>
    );
};
