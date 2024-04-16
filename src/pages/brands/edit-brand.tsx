import { useNavigate, useParams } from "react-router-dom"
import { CreateForm } from "../../components/form/form"
import { useEditBrand } from "./service/mutation/useEditBrand";
import { useGetBrandByID } from "./service/query/useGetBrandById";
import { message } from "antd";
import { BrandForm } from "./components/brand-form";
import { isPending } from "@reduxjs/toolkit";

interface BannerType {
  id: number,
  title: string;
  image?: {
    file: File,
    fileList: FileList
  };
}

export const EditBrand = () => {

  const { id } = useParams<{ id: string }>();
  const { mutate, isPending } = useEditBrand(id);
  const { data } = useGetBrandByID(id)
  const navigate = useNavigate()

  const handleSubmit = (data: BannerType) => {
    const formDataObject = new FormData();
    formDataObject.append('title', data.title);
  
    if(data.image && (data.image.file instanceof File)){
      formDataObject.append("image", data.image.file);
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
    <BrandForm initialValue={data} loading={isPending} submit={handleSubmit}/>
  )
}
