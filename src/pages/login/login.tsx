import React from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { usePostUser } from './service/mutation/usePostUser';
import Cookies from 'js-cookie'

type FieldType = {
  phone_number: string;
  password: string;
};

export const Login: React.FC = () => {


  const navigate = useNavigate();
  const { mutate } = usePostUser();

  React.useEffect(() => {
    if (Cookies.get("token")){
      navigate('/app', {replace: true})
    }
  },[])

  const onFinish = (values: FieldType) => {
    mutate(values, {
      onSuccess: (res) => {
        message.success("Login successfuly!")
        navigate("/app", {replace: true});
        Cookies.set("token", res.token, {expires: 7})
      },
      onError: (error: any) => {
        console.error(error);
      }
    });
  };

  return (
    <Row justify="center" align="middle" className="login-page">
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ 
            phone_number: "+998977109944",
            password: "87654321"
           }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item
            name="phone_number"
            className='input'
            rules={[{ required: true, message: 'Please input your Phone Number!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Phone Number" />
          </Form.Item>
          <Form.Item
            className='input'
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
