import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd"
import { useNavigate } from "react-router-dom";
import { useGetProductVariant } from "./service/query/useGetProductVariant";

export const ProductVariant = () => {
    const navigate = useNavigate();
    const {data, isLoading} = useGetProductVariant()
    console.log(data, isLoading);
    

    const handleCreate = () => {
        navigate('/app/product/variant/create');
    };

    return (
        <div>
            <Button style={{ marginBottom: 0 }} onClick={handleCreate} className='button' type="primary" icon={<PlusCircleOutlined />} >
                Create
            </Button>

        </div>
    )
}
