import { Button, Card, Checkbox, Form, Input, Space, Typography } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SocialLogin from './components/SocialLogin'
import handleAPI from '../../apis/handleAPI'

const {Title, Paragraph, Text} = Typography

const Login = () => {

  const [form] = Form.useForm();

  const [isRemember, setIsRemember] = useState(false)

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async  (values : {email : string; password : string}) => {
    setIsLoading(true)
    console.log(values)
    try {
      const res = await handleAPI('auth/register', values, 'post');
      console.log(res);
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <>
      <Card style={{width : '50%'}}>
        <div className='text-center'>
          <img
            className='mb-3'
            src={'https://firebasestorage.googleapis.com/v0/b/kanban-2fee4.appspot.com/o/kanbanlogo.png?alt=media&token=8bf7e583-b672-4511-b657-07126e4ad0aa'}
            style={{width:48, height :48}}
          />
          <Title level={2}>Log in to account</Title>
          <Paragraph type='secondary'>
            Welcome back! Please enter your details.
          </Paragraph>
        </div>
        <Form 
          layout='vertical' 
          form={form} 
          onFinish={handleLogin} 
          disabled={isLoading}
          size='large'
        >
          <Form.Item
            name={'email'} 
            label='Email'
            rules={[
              {
                required : true,
                message : 'Vui lòng nhập địa chỉ email ! '
              }
            ]}
          >
            <Input placeholder='Hãy nhập email' allowClear maxLength={100} type='email' />
          </Form.Item>
          <Form.Item 
            name={'password'} 
            label='Password'
            rules={[
              {
                required : true,
                message : 'Vui lòng nhập mật khẩu ! '
              }
            ]}
          >
            <Input.Password placeholder='Nhập mật khẩu' maxLength={100} type='password' />
          </Form.Item>
        </Form>
        <div className="row">
          <div className="col">
            <Checkbox value={isRemember} onChange={(val) => setIsRemember(val.target.checked)}>Ghi nhớ mật khẩu</Checkbox>
          </div>
          <div className="col text-right">
            <Link to={'/'} >Quên mật khẩu ?</Link>
          </div>
        </div>
        <div className='mt-4 mb-4'>
          <Button
            onClick={() => form.submit()}
            type='primary' 
            style={{
              width : '100%'
            }} 
            size='large'
          >
            ĐĂNG NHẬP
          </Button>
        </div>
          <SocialLogin/>
        <div className='mt-4 text-center'>
          <Space>
            <Text type='secondary'>Bạn không có tài khoản ?</Text>
            <Link to={'/sign-up'}>Tạo tài khoản</Link>
          </Space>
        </div>
      </Card>
    </>
  )
}

export default Login