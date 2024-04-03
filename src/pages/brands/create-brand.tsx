import { Typography, UploadFile, message } from "antd";
import { CreateForm } from "../../components/form/form";
import { usePostBrand } from "./service/mutation/usePostBrand";

const { Title } = Typography;

export const CreateBrand = () => {
    const { mutate, isPending } = usePostBrand();

    const initialValues : {
        title: string | undefined,
        image: {
            fileList: string[] | undefined
        }
    } = { title: '', image: { fileList: [] } }; 

    const submit = (values: {
        image: {
            file: File,
            fileList: UploadFile
        },
        title: string
    }) => {
        const formData = new FormData();
        formData.append('title', values.title);
        if (values.image) {
            formData.append('image', values.image.file);
        }

        mutate(formData, {
            onSuccess: () => {
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
