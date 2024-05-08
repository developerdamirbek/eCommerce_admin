import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";
import { ProductVariantType } from "./useGetProductVariant";
export const useGetProducts = () => {
  return useQuery({
    queryKey: ["get-product-full"],
    queryFn: () =>
      request.get<ProductVariantType>("/product/").then((res) => res.data),
  });
};