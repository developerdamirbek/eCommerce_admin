import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Image, Popconfirm, Table } from "antd";
import { useNavigate } from "react-router-dom";

export const Banner = () => {
    const navigate = useNavigate();

    const handleCreate = () => {
        navigate('/app/banner/create');
    };


    

    return (
        <div>
            <Button onClick={handleCreate} className='button' type="primary" icon={<PlusCircleOutlined />} >
                Create
            </Button>
            <Table className="table" />
        </div>
    );
};
