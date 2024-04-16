import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Image, Popconfirm, Select, Space, Spin, Table, message } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetBanner } from "./service/query/useGetBanner";
import { useDeleteBanner } from "./service/mutation/useDeleteBanner";

const { Option } = Select;

export const Banner = () => {
    const navigate = useNavigate();
    const [ordering, setOrdering] = useState("id");
    const { data, refetch, isLoading } = useGetBanner(ordering);
    const { mutate } = useDeleteBanner()

    useEffect(() => {
        refetch();
    }, [ordering]);

    const handleCreate = () => {
        navigate('/app/banner/create');
    };

    const handleEdit = (record: { id: number }) => {
        navigate(`/app/banner/edit/${record.id}`);
    };

    const handleDelete = (bannerId: number) => {
        mutate(bannerId, {
            onSuccess: () => {
                refetch();
                message.info("Banner deleted successfully!")
            }
        })
    };

    const handleChange = (value: string) => {
        setOrdering(value);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => <Image src={image} width={100} />,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: string, record: { id: number }) => (
                <span style={{ display: 'flex', gap: 20 }}>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
                    <Popconfirm
                        title="Are you sure to delete this banner?"
                        icon={<ExclamationCircleOutlined />}
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button danger icon={<DeleteOutlined />}>Delete</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    const options = [
        { value: "id", label: "ID - Ascending" },
        { value: "-id", label: "ID - Descending" },
        { value: "created_at", label: "Created at - Ascending" },
        { value: "-created_at", label: "Created at - Descending" },
        { value: "updated_at", label: "Updated at - Ascending" },
        { value: "-updated_at", label: "Updated at - Descending" },
        { value: "image", label: "Image - Ascending" },
        { value: "-image", label: "Image - Descending" },
        { value: "title", label: "Title - Ascending" },
        { value: "-title", label: "Title - Descending" },
        { value: "description", label: "Description - Ascending" },
        { value: "-description", label: "Description - Descending" },
    ];

    return (
        <div>
            <Space style={{ alignItems: "center", justifyContent: "space-between", width: '100%' }}>
                <Button onClick={handleCreate} className='button' type="primary" icon={<PlusCircleOutlined />} >
                    Create
                </Button>
                <Select defaultValue={ordering} style={{ width: 200, marginBottom: 10 }} onChange={handleChange}>
                    {options.map(option => (
                        <Option key={option.value} value={option.value}>{option.label}</Option>
                    ))}
                </Select>
            </Space>
            <Spin spinning={isLoading}>
                <Table className="table" dataSource={data} columns={columns} />
            </Spin>
        </div>
    );
};
