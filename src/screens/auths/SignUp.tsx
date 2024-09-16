import { Alert, Button, Card, Checkbox, Form, Input, message, Space, Typography } from 'antd';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SocialLogin from './components/SocialLogin';
import handleAPI from '../../apis/handleAPI';
import { useDispatch } from 'react-redux';
import { addAuth } from '../../redux/reducers/authReducer';
import { localDataNames } from '../../constants/appInfors';

const {Title, Paragraph, Text} = Typography

const SignUp = () => {
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async (values: {email : string; password : string}) => {
    const api = `auth/register`;
    
    setIsLoading(true)
    try {
      const res : any = await handleAPI(api, values, 'post');

      if (res.data) {
        // localStorage.setItem(localDataNames.authData, JSON.stringify(res.data));
        message.success(res.message)
        dispatch(addAuth(res.data));
      }
    } catch (error : any) {
      message.error(error.message)
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
          <Title level={2}>Create an account</Title>
          <Paragraph type='secondary'>
            Start your 30-day free trial.
          </Paragraph>
        </div>
        <Form 
          layout='vertical' 
          form={form} 
          onFinish={handleLogin} 
          autoComplete='off'
          disabled={isLoading}
          size='large'
        >
          <Form.Item 
            name={'name'} 
            label='Họ và tên'
            rules={[
              {
                required : true,
                message : 'Hãy nhập tên của bạn ! '
              }
            ]}
          >
            <Input placeholder='Nhập tên' allowClear/>
          </Form.Item>
          <Form.Item 
            name={'email'} 
            label='Email'
            rules={[
              {
                required : true,
                message : 'Hãy nhập email của bạn ! '
              }
            ]}
          >
            <Input placeholder='Nhập email' allowClear maxLength={100} type='email' />
          </Form.Item>
          <Form.Item 
            name={'password'} 
            label='Mật khẩu'
            rules={[
              {
                required : true,
                message : 'Hãy nhập mật khẩu ! '
              },
              () => ({
                validator : (_, value) => {
                  if (value.length < 6) {
                    return Promise.reject(new Error('Mật khẩu phải chứa ít nhất 6 kí tự'))
                  }else{
                    return Promise.resolve();
                  }
                }
              })
            ]}
          >
            <Input.Password  placeholder='Nhập mật khẩu' maxLength={100} type='password' />
          </Form.Item>
          <Form.Item 
            name={'confirm'} 
            label='Xác nhận mật khẩu'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required : true,
                message : 'Hãy nhập mật khẩu ! '
              },
              ({getFieldValue}) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu không trùng khớp'))
                }
              })
            ]}
          >
            <Input.Password  placeholder='Nhập mật khẩu' maxLength={100} type='password' />
          </Form.Item>
        </Form>
        <div className='mt-5 mb-4'>
          <Button
            loading={isLoading}
            onClick={() => form.submit()}
            type='primary' 
            style={{
              width : '100%'
            }} 
            size='large'
          >
            BẮT ĐẦU
          </Button>
        </div>
          <SocialLogin/>
        <div className='mt-4 text-center'>
          <Space>
            <Text type='secondary'>Bạn đã có tài khoản ?</Text>
            <Link to={'/'}>Đăng nhập</Link>
          </Space>
        </div>
      </Card>
    </>
  )
}

export default SignUp