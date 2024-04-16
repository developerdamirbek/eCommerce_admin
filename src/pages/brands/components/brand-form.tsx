import { InboxOutlined } from "@ant-design/icons"
import { Button, Form, Image, Input, Upload, UploadFile, UploadProps } from "antd"
import { useState } from "react";

interface BrandDataType {
    id: number,
    title: string,
    image?: {
        file: File,
        fileList: FileList
    }
}

interface BrandProps {
    submit: (data: BrandDataType) => void;
    loading: boolean;
    initialValue?: {
        id: number,
        title: string,
        image?: {
            file: File,
            fileList: FileList
        }
    };
}

export const BrandForm: React.FC<BrandProps> = ({ submit, initialValue, loading }) => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const onchange: UploadProps["onChange"] = ({ fileList }) => {
        setFileList(fileList)
    }

    return (
        <div>
            <Form
                name="create-category"
                onFinish={submit}
                autoComplete="off"
                layout="vertical"
                className='form'
                initialValues={initialValue }
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input the title!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="image"
                    label="Image Upload"
                    rules={[{ required: true, message: "Please upload an image!" }]}
                >
                    <Upload.Dragger
                        name="image"
                        listType="picture-card"
                        action="/upload"
                        fileList={fileList}
                        beforeUpload={() => false}
                        className='upload'
                        onChange={onchange}
                        multiple={false}
                        maxCount={1}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    </Upload.Dragger>
                </Form.Item>
                {initialValue && !fileList.length && (
                    <Image width={100} src={typeof initialValue.image == "string" ? initialValue.image : ''} />
                )}
                <Form.Item>
                    <Button type="primary" loading={loading} htmlType="submit">
                        {initialValue ? 'Update' : 'Submit'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
