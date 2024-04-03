import { UploadFile } from "antd";

export interface ImageObject {
    file: File;
    fileList: UploadFile;
}

export interface FormDataType {
    id?: number;
    title: string;
    image?: ImageObject;
    parent?: null;
}


export interface CategoryType {
    id: number;
    title: string;
    image: string;
}

export interface CategoryListType {
    count: number;
    next: number | null;
    previous: number | null;
    results: CategoryType[];
}
