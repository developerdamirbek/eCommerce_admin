import { useNavigate, useParams } from 'react-router-dom';
import { Spin, message } from 'antd';
import { BannerForm } from './components/banner-form';
import { useGetBannertById } from './service/query/useGetBannerById';
import { useEditBanner } from './service/mutation/useEditBanner';

interface BannerType {
    id: number,
    image?: {
        file: File,
        fileList: FileList
    },
    title: string,
    description: string
}

export const EditBanner = () => {
  const { id } = useParams();
  const {data, isLoading} = useGetBannertById(id)
  const {mutate, isPending} = useEditBanner(id)
  const navigate = useNavigate()
  

  const submit = (data: BannerType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if(data.image && (data.image.file instanceof File)){
        formData.append("image", data.image.file);
      }
    
    formData.append("description", data.description)
    mutate(formData, {
      onSuccess: () => {
        navigate("/app/banner")
        message.success("Banner updated successfully!")
      }
    })
  }








  return isLoading ? <Spin/> : (
    
    <BannerForm submit={submit} loading={isPending} initialValue={data} />
  );
};
