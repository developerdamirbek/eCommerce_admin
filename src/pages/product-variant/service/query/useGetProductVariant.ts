import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";


export interface ProductVariantType {
    count: number;
    next: number | null;
    previous: null | number;
    results: {
      id: number;
      is_available: boolean;
      other_detail: string;
      price: string;
      price_with_discount: null;
      product: number;
      quantity: number;
      title: string;
      attribute_value: [];
      images: [];
    }[];
  }

export const useGetProductVariant = () => {
    return useQuery({
      queryKey: ["product-variant"],
      queryFn: () =>
        request
          .get<ProductVariantType>("/product_variant/")
          .then((res) => res.data),
    });
  };
