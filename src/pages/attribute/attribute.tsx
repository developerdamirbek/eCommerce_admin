import { Button, Spin, Table } from "antd"
import { useGetAttribute } from "./service/query/useGetAttribute"
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const Attribute = () => {
    const { data, isLoading } = useGetAttribute();

    const dataSource = data?.results.map((item) => ({
        key: item.id,
        id: item.id,
        title: item.title,
        category_title: item.category_title.length > 0 ? item.category_title[0].title : ''
    }));

    const navigate = useNavigate();

    const handleEdit = (id: number) => {
        navigate(`/app/attributes/edit/${id}`);
    };
    const handleCreate = () => {
        navigate(`/app/attributes/create`);
    };



    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Parent Title',
            dataIndex: 'category_title',
            key: 'category_title',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (record: {id: number}) => (
                <span className='btn_group'>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record.id)}>Edit</Button>
                </span>
            ),
        },
    ];

    return (
        <div>

            <Button onClick={handleCreate} className='button' type="primary" icon={<PlusCircleOutlined />} >
                Create
            </Button>
            <Spin spinning={isLoading} >
                <Table className='table' dataSource={dataSource} columns={columns} />
            </Spin>
        </div>
    );
};


