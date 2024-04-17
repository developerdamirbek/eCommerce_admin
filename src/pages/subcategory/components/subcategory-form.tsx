import { Button, Form, Image, Input, Select, Upload, UploadFile, UploadProps } from "antd"
import { useGetCategory } from "../../category/service/query/useGetCategory"
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";

interface SubcategoryDataType {
    id: number;
    title: string;
    image: {
        file: File,
        fileList: FileList
    };
    parent: number;
}

interface SubcategoryProps {
    submit: (data: SubcategoryDataType) => void,
    loading: boolean,
    initialValue?: {
        id: number;
        title: string;
        image: {
            file: File,
            fileList: FileList
        };
        parent: string;
    }
}

export const SubcategoryForm: React.FC<SubcategoryProps> = ({ submit, loading, initialValue }) => {
    const { data } = useGetCategory()

    const [fileList, setFileList] = useState<UploadFile[]>([])

    const onchange: UploadProps["onChange"] = ({ fileList }) => {
        setFileList(fileList)
    }
    return (
        <div>
            <Form
                style={{ width: 600 }}
                onFinish={submit}
                layout="vertical"
                initialValues={initialValue}
            >
                <Form.Item
                    name="parent"
                    label="Parent Category"
                    hidden={initialValue ? true : false}
                    rules={[{ required: true, message: 'Please select a parent category' }]}
                >
                    <Select
                        placeholder="Parent Category"
                        options={data?.map((item: any) => ({
                            value: item.id,
                            label: item.title
                        }))}
                    >

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
                    label="Upload"
                    name="image"
                    rules={[{ required: true, message: 'Please upload image!' }]}
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
                <Form.Item>
                    <Button style={{marginTop: 20}} type="primary" loading={loading} htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
