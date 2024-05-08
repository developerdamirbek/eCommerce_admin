import { Form, Input, Select, Spin, InputNumber } from "antd";
import type { SelectProps } from "antd";
import { useGetAtribute } from "./service/query/useGetAttribute";
import { useGetProducts } from "./service/query/useGetProducts";

export const CreateProductVariant = () => {
  const { data, isLoading } = useGetProducts();
  const { data: AtributeData, isLoading: atributeLoading } =
    useGetAtribute();
  const item: any = [];
  data?.results?.map((product: any) =>
    item.push({
      key: product.id,
      label: product.title,
      value: product.id,
    })
  );

  const options: SelectProps["options"] = [];
  {
    AtributeData?.results.map((item) =>
      options.push({
        value: item.id,
        label: item.title,
        key: item.id,
      })
    );
  }
  const submit = (value: string) => {
    console.log(value);
    
  };

  if (isLoading || atributeLoading) {
    return <Spin fullscreen />;
  }
  return (
    <div>
      <Form style={{ maxWidth: "600px" }} onFinish={submit} layout="vertical">
        <Form.Item label="Product" name={"product"}>
          <Select options={item} defaultValue={item[0]?.label} />
        </Form.Item>
        <Form.Item label="Atribute" name={"attribute_value"}>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="select attribute"
            options={options}
          />
        </Form.Item>
        <Form.Item name={"title"} label="Product variant name">
          <Input />
        </Form.Item>
        <Form.Item name={"price"} label="Price">
          <InputNumber<number>
            style={{ width: "100%" }}
            controls={false}
            defaultValue={1000}
            formatter={(value) =>
              ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) =>
              value?.replace(/\$\s?|(,*)/g, "") as unknown as number
            }
          />
        </Form.Item>
        <Form.Item name={"quantity"} label="quantity">
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
};