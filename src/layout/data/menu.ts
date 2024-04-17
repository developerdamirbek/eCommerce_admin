import { AppstoreAddOutlined, ProductOutlined, ApartmentOutlined, ContainerOutlined, PieChartOutlined } from "@ant-design/icons";
import { nanoid } from "@reduxjs/toolkit";

export const menu = [
    {
        id: nanoid(),
        name: "Dashboard",
        path: '/app',
        icon: PieChartOutlined
    },
    {
        id: nanoid(),
        name: "Category List",
        path: '/app/category',
        icon: ApartmentOutlined 
    },
    {
        id: nanoid(),
        name: "Subcategory List",
        path: '/app/subcategory',
        icon: AppstoreAddOutlined
    },
    {
        id: nanoid(),
        name: "Brands List",
        path: '/app/brands',
        icon: ContainerOutlined
    },
    // {
    //     id: nanoid(),
    //     name: "Attribute List",
    //     path: '/app/attributes',
    //     icon: ContainerOutlined
    // },
    {
        id: nanoid(),
        name: "Product List",
        path: '/app/product',
        icon: ProductOutlined
    },
    {
        id: nanoid(),
        name: "Banner List",
        path: '/app/banner',
        icon: ProductOutlined
    }
]