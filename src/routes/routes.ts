import { nanoid } from "@reduxjs/toolkit";
import { Brands } from "../pages/brands/brands";
import { Category } from "../pages/category/category";
import { Home } from "../pages/home/home";
import { Subcategory } from "../pages/subcategory/subcategory";
import { RoutesType } from "./types/types";
import { CreateCategory } from "../pages/category/create-category";
import { CreateSubcategory } from "../pages/subcategory/create-subcategory";
import { EditCategory } from "../pages/category/edit-category";
import { EditSubcategory } from "../pages/subcategory/edit-subcategory";
import { Attribute } from "../pages/attribute/attribute";
import { EditAttribute } from "../pages/attribute/edit-attribute";
import { CreateAttribute } from "../pages/attribute/create-attribute";
import { CreateBrand } from "../pages/brands/create-brand";
import { EditBrand } from "../pages/brands/edit-brand";
import { Products } from "../pages/products/products";
import { CreateProduct } from "../pages/products/create-product";
import { Banner } from "../pages/banner/banner";
import { CreateBanner } from "../pages/banner/create-banner";
import { EditProduct } from "../pages/products/edit-product";

export const routes: RoutesType[] = [
    {
        id: nanoid(),
        name: "Dashboard",
        component: Home
    },
    {
        id: nanoid(),
        name: "Category List",
        path: "category",
        component: Category
    },
    {
        id: nanoid(),
        name: "Subcategory List",
        path: "subcategory",
        component: Subcategory
    },
    {
        id: nanoid(),
        name: "Brands List",
        path: "brands",
        component: Brands
    },
    {
        id: nanoid(),
        name: "Create Caegory",
        path: "category/create",
        component: CreateCategory
    },
    {
        id: nanoid(),
        name: "Create Subcategory",
        path: "subcategory/create",
        component: CreateSubcategory
    },
    {
        id: nanoid(),
        name: "Edit Category",
        path: "category/edit/:id/",
        component: EditCategory
    },
    {
        id: nanoid(),
        name: "Edit Subategory",
        path: "subcategory/edit/:id/",
        component: EditSubcategory
    },
    {
        id: nanoid(),
        name: "Attribute",
        path: "attribute",
        component: EditSubcategory
    },
    {
        id: nanoid(),
        name: "Attribute",
        path: "attributes",
        component: Attribute
    },
    {
        id: nanoid(),
        name: "Attribute Edit",
        path: "attributes/edit/:id",
        component: EditAttribute
    },
    {
        id: nanoid(),
        name: "Attribute Create",
        path: "attributes/create",
        component: CreateAttribute
    },
    {
        id: nanoid(),
        name: "Brand Create",
        path: "brand/create",
        component: CreateBrand
    },
    {
        id: nanoid(),
        name: "Brand Edit",
        path: "brand/edit/:id",
        component: EditBrand
    },
    {
        id: nanoid(),
        name: "Products",
        path: "products",
        component: Products
    },
    {
        id: nanoid(),
        name: "Products Edit",
        path: "products/edit/:id",
        component: EditProduct
    },
    {
        id: nanoid(),
        name: "Create Product",
        path: "products/create",
        component: CreateProduct
    },
    {
        id: nanoid(),
        name: "Create Banner",
        path: "banner/create",
        component: CreateBanner
    },
    {
        id: nanoid(),
        name: "Banner List",
        path: "banner",
        component: Banner
    }
]