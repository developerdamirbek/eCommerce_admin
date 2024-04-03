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
        path: "brands/create",
        component: CreateBrand
    }
]