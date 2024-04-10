import { Typography, UploadFile, message } from "antd";
import { CreateForm } from "../../components/form/form";
import { usePostBrand } from "./service/mutation/usePostBrand";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

interface FormValues {
    title: string;
    image: {
        fileList: UploadFile[];
    };
}

export const CreateBrand = () => {
    const { mutate, isPending } = usePostBrand();
    const navigate = useNavigate()

    const initialValues: FormValues = { title: '', image: { fileList: [] } };

    const submit = (values: FormValues) => {
        const formData = new FormData();
        formData.append('title', values.title);
        if (values.image && values.image.fileList.length > 0) {
            formData.append('image', values.image.fileList[0].originFileObj as File);
        }

        mutate(formData, {
            onSuccess: () => {
                navigate("/app/brands")
                message.success('Brand created successfully!');
            },
        });
    };

    return (
        <div>
            <Typography>
                <Title level={4} style={{ marginTop: 0, marginBottom: 10 }}>
                    Create Brand
                </Title>
            </Typography>
            <CreateForm initialValues={initialValues} onFinish={submit} isLoading={isPending} />
        </div>
    );
};
