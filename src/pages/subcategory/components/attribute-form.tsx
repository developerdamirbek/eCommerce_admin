import { Button, Card, Form, Input } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

export interface Attribute {
    title: string;
    category: number[];
    values: string[];
}

interface Payload {
    items: {
        title: string,
        values: { value: string }[]
    }[]
}

interface AttributeProps {
    submit: (data: Payload) => void,
    initialValue?: {
        attributes: {
            id: string | null,
            title: string,
            values: {
                Value_id: string,
                value: string
            }[]
        }[]
    },
    loading: boolean
}

export const AttributeForm: React.FC<AttributeProps> = ({ submit, loading, initialValue }) => {
    return (
        <div style={{ maxHeight: 460, overflowY: 'auto' }}>
            <Form
                layout='vertical'
                name="dynamic_form_complex"
                style={{ maxWidth: 600 }}
                autoComplete="off"
                onFinish={submit}
            >
                <Form.List name="items" initialValue={initialValue?.attributes}>
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
                                    <Form.Item label="Name" name={[field.name, 'title']} style={{ marginBottom: '10px' }}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Values" style={{ marginBottom: '0' }}>
                                        <Form.List name={[field.name, 'values']}>
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
                <Button loading={loading} type='primary' htmlType='submit'>
                    Submit
                </Button>
            </Form>
        </div>
    )
}
