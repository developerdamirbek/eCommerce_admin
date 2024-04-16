import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Upload, UploadFile, UploadProps } from "antd";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface BannerDataType {
    id: number,
    image?: {
        file: File,
        fileList: FileList
    },
    title: string,
    description: string
}

interface BannerProps {
    submit: (data: BannerDataType) => void;
    loading: boolean;
    initialValue?: {
        id: number,
        image: {
            file: File,
            fileList: FileList
        },
        title: string,
        description: string
    };
}

export const BannerForm: React.FC<BannerProps> = ({ submit, initialValue, loading }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const onchange: UploadProps["onChange"] = ({ fileList }) => {
        setFileList(fileList)
    }

    return (
        <div>
            <Form
                layout="vertical"
                name="createBannerForm"
                onFinish={submit}
                initialValues={initialValue}
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: "Please input the title!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="image"
                    label="Image Upload"
                    rules={[{ required: true, message: "Please upload an image!" }]}
                >
                    <Upload.Dragger listType='picture-card'
                        name="image"
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
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: "Please input the description!" }]}
                >
                    <ReactQuill style={{ height: 200 }} theme="snow" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Create Banner
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
