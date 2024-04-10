import { PlusCircleOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useNavigate } from "react-router-dom"

export const Products = () => {

    const navigate = useNavigate();
    const handleCreate = () => {
        navigate('/app/products/create')
    }

    return (
        <div>
            <Button onClick={handleCreate} className='button' type="primary" icon={<PlusCircleOutlined />} >
                Create
            </Button>
        </div>
    )
}
