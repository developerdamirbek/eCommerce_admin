import { useParams } from 'react-router-dom';
import { Spin, message } from 'antd';
import { ProductForm } from './components/product-form';
import { useGetProductById } from './service/query/useGetProductById';
import { useEditProduct } from './service/mutation/useEditProduct';

export const EditProduct = () => {
  const { id } = useParams();
  const {data, isLoading} = useGetProductById(id)
  const {mutate, isPending} = useEditProduct(id)
  console.log(id);
  

  const submit = (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if(data.image && (data.image.file instanceof File)){
      formData.append("image", data.image.file);
    }
    if(data.is_available === undefined){
      formData.append("is_available", 'false')
    }else {
      formData.append("is_available", data.is_available.toString())
    }
    if(data.is_new === undefined){
      formData.append("is_new", 'false')
    }else {
      formData.append("is_new", data.is_new.toString())
    }
    formData.append("price", data.price)
    mutate(formData, {
      onSuccess: () => {
        message.success("product update")
      }
    })
  }








  return isLoading ? <Spin/> : (
    
    <ProductForm submit={submit} loading={isPending} initailValue={data} />
  );
};
