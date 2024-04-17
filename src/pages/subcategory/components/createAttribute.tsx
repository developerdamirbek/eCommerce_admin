import React from 'react';
import { message } from "antd";
import { usePostAttribute } from "../service/mutation/usePostAttrribute";
import { useNavigate } from 'react-router-dom';
import { AttributeForm } from './attribute-form';



interface CreateAttributeProps {
    subcategoryID: number | null;
}



interface Attribute {
    items: {
        title: string,
        values: {value: string}[]
    }[]
}

export const CreateAttribute: React.FC<CreateAttributeProps> = ({ subcategoryID }) => {
    const { mutate: postAttribute, isPending } = usePostAttribute();
    const navigate = useNavigate();

    const onFinish = (values: Attribute) => {
        const attributes = values.items?.map((item) => {
            return {
                attribute_id: null,
                title:item.title,
                values: item?.values?.map((innerItem) => {
                    return {
                        value: innerItem.value, value_id: null
                    }
                })
            }
        })
        const itemValue = { attributes, category_id: subcategoryID}

        postAttribute(itemValue, {
            onSuccess: () => {
                navigate('/app/subcategory');
                message.success("Attribute created!");
            }
        });
    };

    return (
        <div style={{ maxHeight: 460, overflowY: 'auto' }}>
            <AttributeForm loading={isPending} submit={onFinish} />
        </div>
    );
};
