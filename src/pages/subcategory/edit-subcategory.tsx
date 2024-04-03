import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { EditAttribute } from './components/edit-attribute';
import { SubcategoryEdit } from './components/subcategory-edit';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Subcategory',
    children: <SubcategoryEdit/>,
  },
  {
    key: '2',
    label: 'Attribute',
    children: <EditAttribute/>,
  }
];

export const EditSubcategory: React.FC = () => {

  return (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  );
}
