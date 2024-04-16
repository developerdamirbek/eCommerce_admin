import { Typography,  message } from "antd";
import { usePostBrand } from "./service/mutation/usePostBrand";
import { useNavigate } from "react-router-dom";
import { BrandForm } from "./components/brand-form";

const { Title } = Typography;

interface BannerType {
    id: number,
    title: string;
    image?: {
      file: File,
      fileList: FileList
    };
}

export const CreateBrand = () => {
    const { mutate, isPending } = usePostBrand();
    const navigate = useNavigate()


    const submit = (data: BannerType) => {
        const formData = new FormData();
        formData.append('title', data.title);
        if (data.image) {
            formData.append("image", data.image.file);
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
            <BrandForm loading={isPending} submit={submit}/>
        </div>
    );
};
