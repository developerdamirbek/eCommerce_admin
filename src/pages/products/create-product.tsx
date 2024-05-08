import { message } from "antd";
import { ProductForm } from "./components/product-form"
import { usePostProduct } from "./service/mutation/usePostProduct"
import { useNavigate } from "react-router-dom";

interface ProductFormData {
  category: string;
  id: number,
  is_available: boolean;
  is_new: boolean;
  title: string;
  price: string;
  image?: {
      file: File;
      fileList: FileList
  };
}
export const CreateProduct = () => {
  const { mutate, isPending } = usePostProduct();
  const navigate = useNavigate()

  const submit = (data: ProductFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image) {
      formData.append("image", data.image.file);
    }
    formData.append("category", data.category)
    if (data.is_available === undefined) {
      formData.append("is_available", 'false')
    } else {
      formData.append("is_available", data.is_available.toString())
    }
    if (data.is_new === undefined) {
      formData.append("is_new", 'false')
    } else {
      formData.append("is_new", data.is_new.toString())
    }
    formData.append("price", data.price)
    mutate(formData, {
      onSuccess: () => {
        message.success("product create")
        navigate("/app/product")
      }
    })
  }

  return (
    <div>
      <ProductForm submit={submit} loading={isPending} />
    </div>
  )
}
