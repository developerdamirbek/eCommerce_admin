import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";
interface AttributeType {
  count: number;
  previous: null | number;
  results: {
    id: number;
    title: string;
    category: number[];
    category_title: {
      title: string;
    }[];
  }[];
}
export const useGetAtribute = () => {
  return useQuery({
    queryKey: ["attribute-get"],
    queryFn: () => request.get<AttributeType>("/attribute/").then((res) => res.data),
  });
};