import { useNavigate, useParams } from "react-router-dom"
import { CreateForm } from "../../components/form/form"
import { useEditBrand } from "./service/mutation/useEditBrand";
import { useGetBrandByID } from "./service/query/useGetBrandById";
import { message } from "antd";



export const EditBrand = () => {

  const { id } = useParams<{ id: string }>();
  const { mutate } = useEditBrand(id);
  const { data } = useGetBrandByID(id)
  const navigate = useNavigate()

  const handleSubmit = (formData) => {
    const formDataObject = new FormData();
    formDataObject.append('title', formData.title);
  
    if (formData.image?.file) {
      formDataObject.append('image', formData.image.file);
    }
  
    mutate(formDataObject, {
      onSuccess: () => {
        navigate('/app/brands')
        message.success('Category edited successfully!');
      },
      onError: (error) => {
        message.error(error.message);
      }
    });
  };
  

  return (
    <CreateForm initialValues={{
      title: data?.title ?? '',
      //@ts-ignore
      image: data?.image ? { file: null, url: data.image } : undefined
    }} onFinish={handleSubmit} />
  )
}
