// import { MinusCircleOutlined } from "@ant-design/icons";
// import { Button, Card, Form, Input } from "antd";
// import React from "react";

// interface SubItemType {
//     value: string;
// }

// interface ItemType {
//     name: string;
//     subItems: SubItemType[];
// }

// interface AttributeFormProps {
//     initialValues?: ItemType[];
//     onSubmit: (values: ItemType[]) => void;
// }

// export const AttributeForm: React.FC<AttributeFormProps> = ({ initialValues = [], onSubmit }) => {
//     return (
//         <div>
//             <Form
//                 layout='vertical'
//                 name="dynamic_form_complex"
//                 style={{ maxWidth: 600 }}
//                 autoComplete="off"
//                 onFinish={onSubmit} 
//                 initialValues={{ items: initialValues }}
//             >
//                 <Form.List name="items">
//                     {(fields, { add, remove }) => (
//                         <div style={{ display: 'flex', flexDirection: 'column' }}>
//                             {fields.map((field, index) => (
//                                 <Card
//                                     size="small"
//                                     title={`Item ${index + 1}`}
//                                     key={field.key}
//                                     extra={
//                                         <MinusCircleOutlined
//                                             onClick={() => {
//                                                 remove(field.name);
//                                             }}
//                                         />
//                                     }
//                                     style={{ marginBottom: '16px' }}
//                                 >
//                                     <Form.Item label="Name" name={[field.name, 'name']} style={{ marginBottom: '10px' }}>
//                                         <Input />
//                                     </Form.Item>

//                                     <Form.Item label="Values" style={{ marginBottom: '0' }}>
//                                         <Form.List name={[field.name, 'subItems']}>
//                                             {(subFields, subOpt) => (
//                                                 <div style={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
//                                                     {subFields.map((subField) => (
//                                                         <div key={subField.key} style={{ display: 'flex', alignItems: 'center' }}>
//                                                             <Form.Item name={[subField.name, 'value']} style={{ marginBottom: '0', flex: 1 }}>
//                                                                 <Input placeholder="Value" />
//                                                             </Form.Item>
//                                                             <MinusCircleOutlined
//                                                                 onClick={() => {
//                                                                     subOpt.remove(subField.name);
//                                                                 }}
//                                                             />
//                                                         </div>
//                                                     ))}
//                                                     <Button type="dashed" onClick={() => subOpt.add()} block>
//                                                         + Add Sub-item
//                                                     </Button>
//                                                 </div>
//                                             )}
//                                         </Form.List>
//                                     </Form.Item>
//                                 </Card>
//                             ))}
//                             <Button style={{ marginBottom: 20 }} type="dashed" onClick={() => add()} block>
//                                 + Add Item
//                             </Button>
//                         </div>
//                     )}
//                 </Form.List>
//                 <Button type='primary' htmlType='submit'>
//                     Submit
//                 </Button>
//             </Form>
//         </div>
//     )
// }
