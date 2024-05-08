import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

interface ProductVariantType {
  is_available: boolean;
  title: string;
  product: number;
  attribute_value: number[];
  price: string;
  quantity: number;
  other_detail?: string;
}

export const usePostProductVariant = () => {
  return useMutation({
    mutationFn: () => request.post<ProductVariantType>("/product_variant/"),
  });
};