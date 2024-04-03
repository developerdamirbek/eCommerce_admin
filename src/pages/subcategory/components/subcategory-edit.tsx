import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateSubcategory } from "../service/mutation/useEditSubcategory";

export const SubcategoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate: updateSubcategory } = useUpdateSubcategory();

  const onFinish = async (values) => {
    try {
      await updateSubcategory({ id, subcategoryData: values });
      navigate("/app/subcategories");
      message.success("Subcategory updated successfully!");
    } catch (error) {
      console.error("Error updating subcategory:", error);
      message.error("Failed to update subcategory");
    }
  };
  return (
    <div>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="category"
          label="Parent Category"
          rules={[{ required: true, message: "Please select a parent category" }]}
        >
          <Select>
            {/* Add options for parent categories */}
          </Select>
        </Form.Item>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload.Dragger
            name="file"
            listType="picture-card"
            multiple={false}
            beforeUpload={() => false}
            accept="image/*"
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};


